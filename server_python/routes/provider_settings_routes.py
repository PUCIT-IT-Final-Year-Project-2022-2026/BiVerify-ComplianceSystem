"""
provider_settings_routes.py  –  Backend for OrganizationSettings.jsx (Provider side)

Endpoints
─────────
GET   /api/provider/settings/profile    Load org profile + localization settings
PATCH /api/provider/settings/profile    Save org profile (name, email, website, timezone, currency)

Collections used
────────────────
  organizations  →  name, adminEmail, website, settings.timezone, settings.currency
  users          →  email, fullName

Register in app.py:
    from routes.provider_settings_routes import bp as provider_settings_bp
    app.register_blueprint(provider_settings_bp)
"""

from datetime import datetime, timezone
from bson import ObjectId
from flask import Blueprint, g, jsonify, request

from auth import require_role
from db import get_db

bp = Blueprint("provider_settings", __name__, url_prefix="/api/provider/settings")


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


def _normalise_oid(raw):
    return ObjectId(raw) if not isinstance(raw, ObjectId) else raw


def _serialize_profile(org, user):
    settings = org.get("settings") or {}
    return {
        "orgName":    org.get("name", ""),
        "email":      org.get("adminEmail", "") or user.get("email", ""),
        "websiteUrl": org.get("website", ""),
        "address":    org.get("address", ""),
        "city":       org.get("city", ""),
        "country":    org.get("country", ""),
        "industry":   org.get("industry", ""),
        "timezone":   settings.get("timezone", "UTC (Universal Coordinated Time)"),
        "currency":   settings.get("currency", "USD ($)"),
        "fullName":   user.get("fullName", ""),
        "role":       user.get("role", ""),
        "orgType":    org.get("type", "provider"),
        "orgStatus":  org.get("status", ""),
    }


# ── GET /api/provider/settings/profile ───────────────────────────────────────

@bp.get("/profile")
@require_role("org_admin", "provider_staff")
def get_profile():
    db     = get_db()
    org_id = _normalise_oid(g.user["orgId"])

    org = db.organizations.find_one({"_id": org_id})
    if not org:
        return _err("NOT_FOUND", "Organisation not found", 404)

    return jsonify({"profile": _serialize_profile(org, g.user)})


# ── PATCH /api/provider/settings/profile ─────────────────────────────────────

@bp.patch("/profile")
@require_role("org_admin", "provider_staff")
def update_profile():
    data   = request.get_json(silent=True) or {}
    db     = get_db()
    org_id = _normalise_oid(g.user["orgId"])

    org = db.organizations.find_one({"_id": org_id})
    if not org:
        return _err("NOT_FOUND", "Organisation not found", 404)

    org_updates    = {}
    user_updates   = {}
    extra_settings = {}

    if "orgName" in data:
        val = (data["orgName"] or "").strip()
        if not val:
            return _err("BAD_REQUEST", "orgName cannot be empty", 400)
        org_updates["name"] = val

    if "email" in data:
        val = (data["email"] or "").strip().lower()
        if not val or "@" not in val:
            return _err("BAD_REQUEST", "A valid email is required", 400)
        org_updates["adminEmail"] = val
        user_updates["email"]     = val

    if "websiteUrl" in data:
        org_updates["website"] = (data["websiteUrl"] or "").strip()

    if "address" in data:
        org_updates["address"] = (data["address"] or "").strip()

    if "city" in data:
        org_updates["city"] = (data["city"] or "").strip()

    if "country" in data:
        org_updates["country"] = (data["country"] or "").strip()

    if "industry" in data:
        org_updates["industry"] = (data["industry"] or "").strip()

    if "timezone" in data:
        extra_settings["settings.timezone"] = (
            data["timezone"] or "UTC (Universal Coordinated Time)"
        ).strip()

    if "currency" in data:
        extra_settings["settings.currency"] = (
            data["currency"] or "USD ($)"
        ).strip()

    if not org_updates and not user_updates and not extra_settings:
        return _err("BAD_REQUEST", "No valid fields to update", 400)

    now = datetime.now(timezone.utc)

    if org_updates or extra_settings:
        combined = {**org_updates, **extra_settings, "updatedAt": now}
        db.organizations.update_one({"_id": org_id}, {"$set": combined})

    if user_updates:
        db.users.update_one({"_id": g.user["_id"]}, {"$set": user_updates})

    updated_org  = db.organizations.find_one({"_id": org_id})
    updated_user = db.users.find_one({"_id": g.user["_id"]})

    return jsonify({
        "message": "Settings saved successfully",
        "profile": _serialize_profile(updated_org, updated_user),
    })
