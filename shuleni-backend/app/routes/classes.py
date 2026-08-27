from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models import Class, Resource, Exam
from app.utils.decorators import require_role
from app.utils.auth_helpers import current_user

bp = Blueprint("classes", __name__, url_prefix="/api/classes")


@bp.get("")
@jwt_required()
def list_classes():
    """Students see only their own class; admins/educators see all in the school."""
    user = current_user()
    query = Class.query.filter_by(school_id=user["schoolId"])
    if user["role"] == "STUDENT":
        query = query.filter(Class.students.any(id=user["id"]))
    classes = query.order_by(Class.name.asc()).all()
    return jsonify([c.to_dict(with_counts=True) for c in classes])


@bp.get("/<class_id>")
@jwt_required()
def get_class(class_id):
    """The class page hub: students, educators, resources, exams."""
    user = current_user()
    cls = Class.query.filter_by(id=class_id, school_id=user["schoolId"]).first()
    if not cls:
        return jsonify({"error": "Class not found"}), 404

    if user["role"] == "STUDENT" and not any(s.id == user["id"] for s in cls.students):
        return jsonify({"error": "You are not a member of this class"}), 403

    data = cls.to_dict(with_counts=True)
    data["students"] = [{"id": s.id, "name": s.name, "email": s.email} for s in cls.students]
    data["resources"] = [r.to_dict() for r in cls.resources.order_by(Resource.created_at.desc())]
    data["exams"] = [e.to_dict() for e in cls.exams.order_by(Exam.created_at.desc())]
    return jsonify(data)


@bp.post("")
@require_role("ADMIN")
def create_class():
    name = (request.get_json(silent=True) or {}).get("name")
    if not name:
        return jsonify({"error": "name is required"}), 400
    cls = Class(name=name, school_id=current_user()["schoolId"])
    db.session.add(cls)
    db.session.commit()
    return jsonify(cls.to_dict()), 201
