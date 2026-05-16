from flask import Blueprint, request, jsonify, g
from db import get_db
from auth import require_role
from audit import write_audit
from datetime import datetime, timezone

bp = Blueprint("admin_dashboard", __name__, url_prefix="/api/admin/dashboard")

def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status

@bp.get("/stats")
@require_role("super_admin")
def get_stats():
    db = get_db()
    total_orgs = db.organizations.count_documents({})
    active_orgs = db.organizations.count_documents({"status": "approved"})
    pending_orgs = db.organizations.count_documents({"status": "pending"})
    total_users = db.users.count_documents({})
    
    return jsonify({
        "totalOrganizations": total_orgs,
        "activeOrganizations": active_orgs,
        "pendingApprovals": pending_orgs,
        "totalUsers": total_users
    })

@bp.get("/pending-providers")
@require_role("super_admin")
def get_pending_providers():
    db = get_db()
    # Find providers that are pending
    pending = list(db.organizations.find({"type": "provider", "status": "pending"}))
    
    results = []
    for p in pending:
        results.append({
            "id": str(p["_id"]),
            "company": p.get("name"),
            "domain": f"{p.get('subdomain', 'unknown')}.biverify.com",
            "admin": p.get("adminEmail"),
            "date": p.get("createdAt").strftime("%Y-%m-%d") if p.get("createdAt") else "N/A",
            "doc": p.get("serviceType", "General Provider"),
            "expiry": "N/A" # In a real app, you'd find the latest doc expiry
        })
    
    return jsonify(results)

@bp.post("/approve-provider/<org_id>")
@require_role("super_admin")
def approve_provider(org_id):
    from bson import ObjectId
    db = get_db()
    now = datetime.now(timezone.utc)
    
    res = db.organizations.update_one(
        {"_id": ObjectId(org_id)},
        {"$set": {"status": "approved", "approvedAt": now, "updatedAt": now}}
    )
    
    if res.matched_count == 0:
        return _err("NOT_FOUND", "Organization not found", 404)
        
    write_audit(
        org_id=g.user["orgId"], user_id=g.user["_id"],
        action="approved", entity="organization", entity_id=ObjectId(org_id),
        description=f"Superadmin approved organization {org_id}",
    )
    
    return jsonify({"success": True, "message": "Organization approved"})

@bp.post("/reject-provider/<org_id>")
@require_role("super_admin")
def reject_provider(org_id):
    from bson import ObjectId
    db = get_db()
    now = datetime.now(timezone.utc)
    
    res = db.organizations.update_one(
        {"_id": ObjectId(org_id)},
        {"$set": {"status": "rejected", "updatedAt": now}}
    )
    
    if res.matched_count == 0:
        return _err("NOT_FOUND", "Organization not found", 404)
        
    write_audit(
        org_id=g.user["orgId"], user_id=g.user["_id"],
        action="rejected", entity="organization", entity_id=ObjectId(org_id),
        description=f"Superadmin rejected organization {org_id}",
    )
    
    return jsonify({"success": True, "message": "Organization rejected"})
