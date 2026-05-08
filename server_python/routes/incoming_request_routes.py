"""
incoming_request_routes.py  –  Backend for IncomingRequests.jsx (ProviderSide)

Endpoints
─────────
GET   /api/provider/requests              List all service requests for this provider
PATCH /api/provider/requests/<id>/accept  Accept a pending request
PATCH /api/provider/requests/<id>/reject  Reject a pending request
GET   /api/provider/requests/stats        4 KPI counts (total, pending, accepted, rejected)

Register in app.py:
    from routes.incoming_request_routes import bp as incoming_requests_bp
    app.register_blueprint(incoming_requests_bp)

Consistent with:
  - provider_dashboard_routes.py  (same org_id normalisation pattern)
  - service_request_routes.py     (same collections, same field names)
  - auth.py / db.py / audit.py    (same helpers)
"""

from datetime import datetime, timezone

from bson import ObjectId
from flask import Blueprint, g, jsonify, request

from audit import write_audit
from auth import require_role
from db import get_db

bp = Blueprint("incoming_requests", __name__, url_prefix="/api/provider/requests")


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


def _normalise_org_id(raw):
    """Always return ObjectId for org queries (mirrors provider_dashboard_routes pattern)."""
    try:
        return ObjectId(raw) if not isinstance(raw, ObjectId) else raw
    except Exception:
        return raw


def _format_date(dt):
    if not dt:
        return ""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.strftime("%-d %b %Y")          # e.g. "6 May 2026"


def _relative_time(dt):
    if not dt:
        return ""
    now = datetime.now(timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    secs = int((now - dt).total_seconds())
    if secs < 60:
        return "just now"
    if secs < 3600:
        return f"{secs // 60} min ago"
    if secs < 86400:
        h = secs // 3600
        return f"{h} hr{'s' if h > 1 else ''} ago"
    if secs < 172800:
        return "Yesterday"
    return f"{secs // 86400} days ago"


def _build_request_row(sr, db):
    """
    Converts a raw service_request document into the shape the frontend expects.

    Frontend shape (mirrors INITIAL_REQUESTS in IncomingRequests.jsx):
    {
      id:        string   "#<short_id>"
      requestId: string   full ObjectId string (used for accept/reject calls)
      company:   string   client org name
      service:   string   serviceType
      date:      string   formatted scheduledDate or createdAt
      priority:  string   "High" | "Medium" | "Low"   (capitalised)
      status:    string   "pending" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled"
      location:  string
      description: string
      createdAgo: string  relative time
    }
    """
    client_org = db.organizations.find_one({"_id": sr.get("clientOrgId")}, {"name": 1}) or {}

    raw_priority = (sr.get("priority") or "medium").lower()
    priority_map = {"high": "High", "medium": "Medium", "low": "Low"}
    priority = priority_map.get(raw_priority, "Medium")

    # Use scheduledDate if set, else fall back to createdAt
    display_date = _format_date(sr.get("scheduledDate") or sr.get("createdAt"))

    return {
        "id":          f"#{str(sr['_id'])[-6:].upper()}",   # short display ID e.g. "#025D41"
        "requestId":   str(sr["_id"]),
        "company":     client_org.get("name", "Unknown Client"),
        "service":     sr.get("serviceType", ""),
        "date":        display_date,
        "priority":    priority,
        "status":      sr.get("status", "pending"),
        "location":    sr.get("location", ""),
        "description": sr.get("description", ""),
        "createdAgo":  _relative_time(sr.get("createdAt")),
    }


# ── GET /api/provider/requests ────────────────────────────────────────────────

@bp.get("")
@require_role("org_admin")
def list_requests():
    """
    Returns all service_requests where providerOrgId == logged-in provider org.
    Supports optional query params:
      ?status=pending|accepted|rejected|in_progress|completed|cancelled
      ?search=<string>   matches against serviceType or client org name
    Sorted: pending first, then by createdAt desc.
    """
    db     = get_db()
    org_id = _normalise_org_id(g.user["orgId"])

    query = {"providerOrgId": {"$in": [org_id, str(org_id)]}}

    # Optional status filter
    status_param = request.args.get("status", "").strip().lower()
    if status_param and status_param != "all":
        query["status"] = status_param

    raw = list(
        db.service_requests.find(query).sort("createdAt", -1).limit(100)
    )

    rows = [_build_request_row(sr, db) for sr in raw]

    # Optional search filter (post-query, on formatted data)
    search = request.args.get("search", "").strip().lower()
    if search:
        rows = [
            r for r in rows
            if search in r["company"].lower()
            or search in r["service"].lower()
            or search in r["id"].lower()
        ]

    return jsonify(rows)


# ── GET /api/provider/requests/stats ─────────────────────────────────────────

@bp.get("/stats")
@require_role("org_admin")
def get_stats():
    """
    Returns the 4 KPI counts for the top stat cards.
    Consistent with provider_dashboard_routes /stats counts.

    {
      "total":      int,
      "pending":    int,
      "accepted":   int,
      "rejected":   int,
      "inProgress": int,
      "completed":  int,
    }
    """
    db     = get_db()
    org_id = _normalise_org_id(g.user["orgId"])
    base   = {"providerOrgId": {"$in": [org_id, str(org_id)]}}

    def count(extra):
        return db.service_requests.count_documents({**base, **extra})

    return jsonify({
        "total":      count({}),
        "pending":    count({"status": "pending"}),
        "accepted":   count({"status": "accepted"}),
        "rejected":   count({"status": "rejected"}),
        "inProgress": count({"status": "in_progress"}),
        "completed":  count({"status": "completed"}),
    })


# ── PATCH /api/provider/requests/<id>/accept ─────────────────────────────────

@bp.patch("/<request_id>/accept")
@require_role("org_admin")
def accept_request(request_id):
    """
    Provider org admin accepts a pending service request.
    Only allowed when current status is "pending".
    Updates status → "accepted" and writes audit log.
    """
    db     = get_db()
    org_id = _normalise_org_id(g.user["orgId"])

    try:
        sr_oid = ObjectId(request_id)
    except Exception:
        return _err("BAD_REQUEST", "Invalid request ID", 400)

    sr = db.service_requests.find_one({
        "_id":           sr_oid,
        "providerOrgId": {"$in": [org_id, str(org_id)]},
    })

    if not sr:
        return _err("NOT_FOUND", "Service request not found for your organisation", 404)

    if sr.get("status") != "pending":
        return _err("CONFLICT", f"Cannot accept a request with status '{sr.get('status')}'", 409)

    now = datetime.now(timezone.utc)
    db.service_requests.update_one(
        {"_id": sr_oid},
        {"$set": {"status": "accepted", "updatedAt": now}},
    )

    write_audit(
        org_id=org_id,
        user_id=g.user["_id"],
        action="accepted",
        entity="service_request",
        entity_id=sr_oid,
        description=f"Service request accepted — {sr.get('serviceType', '')}",
        metadata={"clientOrgId": str(sr.get("clientOrgId", ""))},
    )

    return jsonify({"ok": True, "requestId": request_id, "status": "accepted"})


# ── PATCH /api/provider/requests/<id>/reject ─────────────────────────────────

@bp.patch("/<request_id>/reject")
@require_role("org_admin")
def reject_request(request_id):
    """
    Provider org admin rejects a pending service request.
    Only allowed when current status is "pending".
    Updates status → "rejected" and writes audit log.
    Optionally accepts { "reason": "..." } in request body.
    """
    db     = get_db()
    org_id = _normalise_org_id(g.user["orgId"])

    try:
        sr_oid = ObjectId(request_id)
    except Exception:
        return _err("BAD_REQUEST", "Invalid request ID", 400)

    sr = db.service_requests.find_one({
        "_id":           sr_oid,
        "providerOrgId": {"$in": [org_id, str(org_id)]},
    })

    if not sr:
        return _err("NOT_FOUND", "Service request not found for your organisation", 404)

    if sr.get("status") != "pending":
        return _err("CONFLICT", f"Cannot reject a request with status '{sr.get('status')}'", 409)

    body   = request.get_json(silent=True) or {}
    reason = body.get("reason", "")

    now = datetime.now(timezone.utc)
    db.service_requests.update_one(
        {"_id": sr_oid},
        {"$set": {"status": "rejected", "rejectionReason": reason, "updatedAt": now}},
    )

    write_audit(
        org_id=org_id,
        user_id=g.user["_id"],
        action="rejected",
        entity="service_request",
        entity_id=sr_oid,
        description=f"Service request rejected — {sr.get('serviceType', '')}",
        metadata={"clientOrgId": str(sr.get("clientOrgId", "")), "reason": reason},
    )

    return jsonify({"ok": True, "requestId": request_id, "status": "rejected"})
