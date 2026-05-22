"""
file_upload_routes.py  –  Multipart file upload endpoint for compliance documents

Endpoint
────────
POST /api/provider/compliance/upload
    Accepts:  multipart/form-data  with field "file"
    Returns:  { fileUrl: "/uploads/<saved_filename>", fileName: "<saved_filename>" }

Files are saved to the  uploads/  folder next to app.py.
In production, replace the local save with an S3 pre-signed upload or similar.

Register in app.py:
    from routes.file_upload_routes import bp as file_upload_bp
    app.register_blueprint(file_upload_bp)
"""

import os
import uuid
from datetime import datetime, timezone
from flask import Blueprint, g, jsonify, request, current_app
from werkzeug.utils import secure_filename

from auth import require_role

bp = Blueprint("file_upload", __name__, url_prefix="/api/provider/compliance")

# ── Config ────────────────────────────────────────────────────────────────────

ALLOWED_EXTENSIONS = {"pdf", "doc", "docx", "xlsx", "xls", "png", "jpg", "jpeg"}
MAX_FILE_BYTES     = 10 * 1024 * 1024   # 10 MB


def _allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def _upload_dir() -> str:
    """Return the absolute path to the uploads folder, creating it if needed."""
    folder = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "uploads",
    )
    os.makedirs(folder, exist_ok=True)
    return folder


def _err(code, msg, status):
    return jsonify({"error": {"code": code, "message": msg}}), status


# ── Route ─────────────────────────────────────────────────────────────────────

@bp.post("/upload")
@require_role("org_admin", "provider_staff")
def upload_file():
    """
    Receive a file from the browser (FormData field name: "file"),
    save it with a unique name, and return its accessible URL.
    """
    if "file" not in request.files:
        return _err("BAD_REQUEST", "No file field in request", 400)

    f = request.files["file"]

    if not f or f.filename == "":
        return _err("BAD_REQUEST", "No file selected", 400)

    if not _allowed(f.filename):
        return _err(
            "BAD_REQUEST",
            f"File type not allowed. Supported: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
            400,
        )

    # Read content to check size (avoids relying on Content-Length header)
    content = f.read()
    if len(content) > MAX_FILE_BYTES:
        return _err("BAD_REQUEST", "File exceeds 10 MB limit", 400)

    # Build a unique, safe filename  e.g.  20260522_153012_a3f9b1_invoice.pdf
    original_safe = secure_filename(f.filename)
    ext           = original_safe.rsplit(".", 1)[-1].lower() if "." in original_safe else "bin"
    uid           = uuid.uuid4().hex[:6]
    timestamp     = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    saved_name    = f"{timestamp}_{uid}_{original_safe}"

    save_path = os.path.join(_upload_dir(), saved_name)
    with open(save_path, "wb") as out:
        out.write(content)

    # Return a URL the frontend can store and later request through Flask's
    # static file serving (configured below) or your CDN / S3.
    file_url = f"/uploads/{saved_name}"

    return jsonify({"fileUrl": file_url, "fileName": saved_name}), 201
