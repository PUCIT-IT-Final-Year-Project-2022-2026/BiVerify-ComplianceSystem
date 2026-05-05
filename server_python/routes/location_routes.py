from datetime import datetime, timezone
from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, request, jsonify, g, Response
from db import get_db
from auth import require_role
from qr import generate_token, make_qr_png, make_qr_data_url
from audit import write_audit

bp = Blueprint("locations", __name__, url_prefix="/api/locations")


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


@bp.post("")
@require_role("org_admin")
def create_location():
    data = request.get_json(silent=True) or {}
    label = (data.get("label") or "").strip()
    if not label:
        return _err("BAD_REQUEST", "label required", 400)

    db = get_db()
    token = generate_token()
    now = datetime.now(timezone.utc)
    doc = {
        "orgId": g.user["orgId"],
        "label": label,
        "siteToken": token,
        "isActive": True,
        "createdAt": now,
        "createdBy": g.user["_id"],
    }
    site_id = db.site_locations.insert_one(doc).inserted_id

    write_audit(
        org_id=g.user["orgId"], user_id=g.user["_id"],
        action="created", entity="organization", entity_id=site_id,
        description=f"Site QR created: {label}",
    )

    return jsonify({
        "id": str(site_id),
        "label": label,
        "siteToken": token,
        "qrPng": make_qr_data_url(token),
    }), 201


@bp.get("")
@require_role("org_admin", "client_staff")
def list_locations():
    db = get_db()
    cur = db.site_locations.find({"orgId": g.user["orgId"]}).sort("createdAt", -1)
    return jsonify([
        {"id": str(d["_id"]), "label": d["label"], "isActive": d.get("isActive", True)}
        for d in cur
    ])


@bp.get("/<location_id>/qr.png")
@require_role("org_admin", "client_staff")
def location_qr(location_id):
    db = get_db()
    try:
        oid = ObjectId(location_id)
    except InvalidId:
        return _err("BAD_REQUEST", "Invalid id", 400)
    site = db.site_locations.find_one({"_id": oid, "orgId": g.user["orgId"]})
    if not site:
        return _err("NOT_FOUND", "Site not found", 404)
    return Response(make_qr_png(site["siteToken"]), mimetype="image/png")
