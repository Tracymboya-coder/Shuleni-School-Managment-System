from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db, bcrypt
from app.models import User, Class, ClassEducator
from app.utils.decorators import require_role
from app.utils.auth_helpers import current_user

bp = Blueprint("users", __name__, url_prefix="/api/users")


@bp.get("")
@require_role("ADMIN", "EDUCATOR")
def list_users():
    """GET /api/users?role=STUDENT|EDUCATOR"""
    school_id = current_user()["schoolId"]
    role = request.args.get("role")
    query = User.query.filter_by(school_id=school_id)
    if role:
        query = query.filter_by(role=role.upper())
    users = query.order_by(User.name.asc()).all()
    return jsonify([u.to_dict() for u in users])


@bp.get("/<user_id>")
@require_role("ADMIN", "EDUCATOR")
def get_user(user_id):
    school_id = current_user()["schoolId"]
    user = User.query.filter_by(id=user_id, school_id=school_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict())


@bp.post("")
@require_role("ADMIN")
def create_user():
    """Admin adds a student or educator."""
    data = request.get_json(silent=True) or {}
    name, email, password, role = data.get("name"), data.get("email"), data.get("password"), data.get("role")
    class_id = data.get("classId")

    if not name or not email or not password or role not in ("EDUCATOR", "STUDENT"):
        return jsonify({"error": "name, email, password, and a valid role (EDUCATOR|STUDENT) are required"}), 400
    if len(password) < 8:
        return jsonify({"error": "password must be at least 8 characters"}), 400

    school_id = current_user()["schoolId"]
    if User.query.filter_by(school_id=school_id, email=email.lower()).first():
        return jsonify({"error": "A user with that email already exists in this school"}), 409

    user = User(
        school_id=school_id,
        name=name,
        email=email.lower(),
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8"),
        role=role,
        student_class_id=class_id if role == "STUDENT" else None,
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@bp.patch("/<user_id>")
@require_role("ADMIN")
def update_user(user_id):
    """Edit info / reassign a student's class."""
    school_id = current_user()["schoolId"]
    user = User.query.filter_by(id=user_id, school_id=school_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json(silent=True) or {}
    if "name" in data and data["name"]:
        user.name = data["name"]
    if user.role == "STUDENT" and "classId" in data:
        user.student_class_id = data["classId"]

    db.session.commit()
    return jsonify(user.to_dict())


@bp.post("/<user_id>/assign-class")
@require_role("ADMIN")
def assign_class(user_id):
    """Assign an EDUCATOR to a class."""
    school_id = current_user()["schoolId"]
    class_id = (request.get_json(silent=True) or {}).get("classId")
    if not class_id:
        return jsonify({"error": "classId is required"}), 400

    educator = User.query.filter_by(id=user_id, school_id=school_id, role="EDUCATOR").first()
    if not educator:
        return jsonify({"error": "Educator not found"}), 404
    cls = Class.query.filter_by(id=class_id, school_id=school_id).first()
    if not cls:
        return jsonify({"error": "Class not found"}), 404

    existing = ClassEducator.query.filter_by(class_id=class_id, educator_id=user_id).first()
    if not existing:
        db.session.add(ClassEducator(class_id=class_id, educator_id=user_id))
        db.session.commit()

    return jsonify({"message": "Educator assigned to class"})
