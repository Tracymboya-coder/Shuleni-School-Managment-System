import os
import time
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from app.extensions import db
from app.models import Resource, Class
from app.utils.decorators import require_role
from app.utils.auth_helpers import current_user

bp = Blueprint("resources", __name__, url_prefix="/api/resources")


@bp.get("")
@jwt_required()
def list_resources():
    """GET /api/resources?classId=&category=&q=
    Students only see resources for classes they belong to.
    """
    user = current_user()
    class_id = request.args.get("classId")
    category = request.args.get("category")
    q = request.args.get("q")

    if user["role"] == "STUDENT":
        membership = Class.query.filter(
            Class.id == class_id, Class.school_id == user["schoolId"], Class.students.any(id=user["id"])
        ).first()
        if not membership:
            return jsonify({"error": "Not a member of this class"}), 403

    query = Resource.query.filter_by(school_id=user["schoolId"])
    if class_id:
        query = query.filter_by(class_id=class_id)
    if category:
        query = query.filter_by(category=category)
    if q:
        query = query.filter(Resource.title.ilike(f"%{q}%"))

    resources = query.order_by(Resource.created_at.desc()).all()
    return jsonify([r.to_dict() for r in resources])


@bp.get("/<resource_id>")
@jwt_required()
def get_resource(resource_id):
    user = current_user()
    resource = Resource.query.filter_by(id=resource_id, school_id=user["schoolId"]).first()
    if not resource:
        return jsonify({"error": "Resource not found"}), 404

    if user["role"] == "STUDENT":
        membership = Class.query.filter(
            Class.id == resource.class_id, Class.students.any(id=user["id"])
        ).first()
        if not membership:
            return jsonify({"error": "Not a member of this class"}), 403

    return jsonify(resource.to_dict())


@bp.post("")
@require_role("ADMIN", "EDUCATOR")
def upload_resource():
    """Educator/Admin uploads a note/book/material/document (multipart/form-data)."""
    title = request.form.get("title")
    category = request.form.get("category")
    description = request.form.get("description")
    class_id = request.form.get("classId")

    if not title or not category or not class_id:
        return jsonify({"error": "title, category, and classId are required"}), 400
    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    user = current_user()
    cls = Class.query.filter_by(id=class_id, school_id=user["schoolId"]).first()
    if not cls:
        return jsonify({"error": "Class not found"}), 404

    file = request.files["file"]
    filename = secure_filename(file.filename)
    stored_name = f"{int(time.time() * 1000)}-{filename}"
    upload_dir = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_dir, exist_ok=True)
    file.save(os.path.join(upload_dir, stored_name))

    resource = Resource(
        school_id=user["schoolId"],
        class_id=class_id,
        title=title,
        category=category,
        description=description,
        file_url=f"/uploads/{stored_name}",
        uploaded_by=user["id"],
    )
    db.session.add(resource)
    db.session.commit()
    return jsonify(resource.to_dict()), 201
