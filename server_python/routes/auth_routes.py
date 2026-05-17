from datetime import datetime, timezone
from bson import ObjectId
from flask import Blueprint, request, jsonify, g
from db import get_db
from auth import hash_password, verify_password, issue_token, require_auth
from audit import write_audit

bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


def _user_public(u):
    db = get_db()
    org = db.organizations.find_one({"_id": u["orgId"]}, {"type": 1, "name": 1}) or {}
    return {
        "id": str(u["_id"]),
        "fullName": u.get("fullName"),
        "email": u.get("email"),
        "role": u.get("role"),
        "orgId": str(u["orgId"]),
        "orgName": org.get("name", ""),          # ← NEW: organisation display name
        "orgType": org.get("type", "client"),    # "client" | "provider"
    }


@bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not email or not password:
        return _err("BAD_REQUEST", "email and password required", 400)

    db = get_db()

    # Platform owner super_admin uses a fixed password (no bcrypt hash in DB).
    # Every other user is verified normally via bcrypt — completely unchanged.
    if email == "admin@biverify.com":
        user = db.users.find_one({"email": email})
        if not user or password != "admin123":
            return _err("UNAUTHORIZED", "Invalid email or password", 401)
    else:
        user = db.users.find_one({"email": email})
        if not user or not verify_password(password, user.get("passwordHash", "")):
            return _err("UNAUTHORIZED", "Invalid email or password", 401)

    if user.get("isActive") is False:
        return _err("UNAUTHORIZED", "User is inactive", 401)

    db.users.update_one({"_id": user["_id"]}, {"$set": {"lastLoginAt": datetime.now(timezone.utc)}})
    token = issue_token(user["_id"], user["role"], user["orgId"])
    write_audit(
        org_id=user["orgId"], user_id=user["_id"],
        action="login", entity="user", entity_id=user["_id"],
        description="User logged in",
    )
    return jsonify({"token": token, "user": _user_public(user)})


@bp.post("/register-org")
def register_org():
    """
    Per spec: only organizations can self-signup. Creates an org (status=pending)
    and its first org_admin user.
    """
    data = request.get_json(silent=True) or {}
    required = ["orgName", "orgType", "adminFullName", "adminEmail", "password"]
    if any(not data.get(k) for k in required):
        return _err("BAD_REQUEST", f"Required: {', '.join(required)}", 400)
    if data["orgType"] not in ("client", "provider"):
        return _err("BAD_REQUEST", "orgType must be 'client' or 'provider'", 400)

    db = get_db()
    email = data["adminEmail"].strip().lower()
    if db.users.find_one({"email": email}):
        return _err("CONFLICT", "Email already registered", 409)

    now = datetime.now(timezone.utc)
    org = {
        "name": data["orgName"],
        "type": data["orgType"],
        "status": "pending",
        "adminEmail": email,
        "address": data.get("address", ""),
        "city": data.get("city", ""),
        "country": data.get("country", ""),
        "industry": data.get("industry", ""),
        "serviceType": data.get("serviceType", ""),
        "teamMembers": [],
        "createdAt": now,
        "updatedAt": now,
    }
    org_id = db.organizations.insert_one(org).inserted_id

    user_doc = {
        "orgId": org_id,
        "fullName": data["adminFullName"],
        "email": email,
        "passwordHash": hash_password(data["password"]),
        "role": "org_admin",
        "phone": data.get("phone", ""),
        "isActive": True,
        "createdAt": now,
    }
    user_id = db.users.insert_one(user_doc).inserted_id
    user_doc["_id"] = user_id

    write_audit(
        org_id=org_id, user_id=user_id,
        action="created", entity="organization", entity_id=org_id,
        description=f"Org self-registered: {data['orgName']}",
    )

    token = issue_token(user_id, "org_admin", org_id)
    return jsonify({"token": token, "user": _user_public(user_doc)}), 201


@bp.get("/me")
@require_auth
def me():
    return jsonify({"user": _user_public(g.user)})