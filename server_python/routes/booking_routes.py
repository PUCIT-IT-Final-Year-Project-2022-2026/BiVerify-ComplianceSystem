import random
from datetime import datetime, timezone
from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, request, jsonify, g, Response
from db import get_db
from auth import require_role
from qr import generate_token, make_qr_png, make_qr_data_url
from audit import write_audit
from services.compliance import is_provider_blocked

bp = Blueprint("bookings", __name__, url_prefix="/api/bookings")


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


def _po_number():
    return f"PO-{random.randint(1_000_000_000, 9_999_999_999)}"


def _oid(val, field):
    try:
        return ObjectId(val)
    except (InvalidId, TypeError):
        raise ValueError(f"Invalid {field}")


@bp.post("")
@require_role("org_admin")
def create_booking():
    """
    Minimal booking creator: enough to mint a PO + booking QR for the dual-QR flow.
    Body: {providerOrgId, serviceType, description?, scheduledDate?, siteLocationId,
           assignedStaffId, amount, taxRate?}
    """
    data = request.get_json(silent=True) or {}
    required = ["providerOrgId", "serviceType", "siteLocationId", "assignedStaffId", "amount"]
    if any(data.get(k) in (None, "") for k in required):
        return _err("BAD_REQUEST", f"Required: {', '.join(required)}", 400)

    db = get_db()
    try:
        provider_id = _oid(data["providerOrgId"], "providerOrgId")
        site_id = _oid(data["siteLocationId"], "siteLocationId")
        staff_id = _oid(data["assignedStaffId"], "assignedStaffId")
    except ValueError as e:
        return _err("BAD_REQUEST", str(e), 400)

    client_org_id = g.user["orgId"]

    site = db.site_locations.find_one({"_id": site_id, "orgId": client_org_id})
    if not site:
        return _err("NOT_FOUND", "Site location not found for your org", 404)

    provider = db.organizations.find_one({"_id": provider_id, "type": "provider"})
    if not provider:
        return _err("NOT_FOUND", "Provider org not found", 404)

    staff = db.users.find_one({"_id": staff_id, "orgId": provider_id, "role": "provider_staff"})
    if not staff:
        return _err("NOT_FOUND", "Assigned staff not found in provider org", 404)

    blocked, reason = is_provider_blocked(provider_id)
    if blocked:
        return _err("COMPLIANCE_EXPIRED", reason or "Provider compliance invalid", 409)

    try:
        amount = float(data["amount"])
        tax_rate = float(data.get("taxRate", 0.0))
    except (TypeError, ValueError):
        return _err("BAD_REQUEST", "amount and taxRate must be numbers", 400)
    tax_amount = round(amount * tax_rate, 2)
    total = round(amount + tax_amount, 2)

    scheduled = data.get("scheduledDate")
    try:
        scheduled_dt = datetime.fromisoformat(scheduled.replace("Z", "+00:00")) if scheduled else None
    except Exception:
        return _err("BAD_REQUEST", "scheduledDate must be ISO 8601", 400)

    now = datetime.now(timezone.utc)
    sr_doc = {
        "clientOrgId": client_org_id,
        "providerOrgId": provider_id,
        "requestedBy": g.user["_id"],
        "assignedStaffId": staff_id,
        "siteLocationId": site_id,
        "serviceType": data["serviceType"],
        "description": data.get("description", ""),
        "location": site.get("label", ""),
        "status": "accepted",
        "priority": data.get("priority", "medium"),
        "createdAt": now,
        "updatedAt": now,
    }
    if scheduled_dt:
        sr_doc["scheduledDate"] = scheduled_dt
    sr_id = db.service_requests.insert_one(sr_doc).inserted_id

    booking_token = generate_token()
    po_doc = {
        "requestId": sr_id,
        "poNumber": _po_number(),
        "amount": amount,
        "taxRate": tax_rate,
        "taxAmount": tax_amount,
        "totalAmount": total,
        "status": "issued",
        "issuedAt": now,
        "bookingToken": booking_token,
    }
    po_id = db.purchase_orders.insert_one(po_doc).inserted_id

    write_audit(
        org_id=client_org_id, user_id=g.user["_id"],
        action="created", entity="service_request", entity_id=sr_id,
        description=f"Booking created → {po_doc['poNumber']}",
        metadata={"providerOrgId": str(provider_id), "poNumber": po_doc["poNumber"]},
    )

    return jsonify({
        "requestId": str(sr_id),
        "poId": str(po_id),
        "poNumber": po_doc["poNumber"],
        "bookingToken": booking_token,
        "bookingQrPng": make_qr_data_url(booking_token),
    }), 201


@bp.get("/<booking_id>/qr.png")
@require_role("org_admin", "provider_staff")
def booking_qr(booking_id):
    db = get_db()
    try:
        sr_oid = ObjectId(booking_id)
    except InvalidId:
        return _err("BAD_REQUEST", "Invalid id", 400)

    sr = db.service_requests.find_one({"_id": sr_oid})
    if not sr:
        return _err("NOT_FOUND", "Booking not found", 404)

    # Authorization: client org_admin who owns it, or assigned provider staff.
    role = g.user["role"]
    if role == "org_admin" and sr["clientOrgId"] != g.user["orgId"]:
        return _err("FORBIDDEN", "Not your booking", 403)
    if role == "provider_staff" and sr.get("assignedStaffId") != g.user["_id"]:
        return _err("FORBIDDEN", "Not assigned to you", 403)

    po = db.purchase_orders.find_one({"requestId": sr_oid})
    if not po or not po.get("bookingToken"):
        return _err("NOT_FOUND", "No booking QR for this booking", 404)
    return Response(make_qr_png(po["bookingToken"]), mimetype="image/png")
