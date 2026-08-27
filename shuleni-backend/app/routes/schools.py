from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models import User, Class, AttendanceSession, Exam, Resource
from app.utils.auth_helpers import current_user

bp = Blueprint("schools", __name__, url_prefix="/api/school")


@bp.get("/dashboard")
@jwt_required()
def dashboard():
    """Summary numbers for the admin dashboard — always scoped to the caller's schoolId."""
    school_id = current_user()["schoolId"]

    student_count = User.query.filter_by(school_id=school_id, role="STUDENT").count()
    educator_count = User.query.filter_by(school_id=school_id, role="EDUCATOR").count()
    class_count = Class.query.filter_by(school_id=school_id).count()

    recent_attendance = (
        AttendanceSession.query.join(Class)
        .filter(Class.school_id == school_id)
        .order_by(AttendanceSession.date.desc())
        .limit(5)
        .all()
    )
    recent_exams = Exam.query.filter_by(school_id=school_id).order_by(Exam.created_at.desc()).limit(5).all()
    recent_resources = (
        Resource.query.filter_by(school_id=school_id).order_by(Resource.created_at.desc()).limit(5).all()
    )

    return jsonify({
        "counts": {"students": student_count, "educators": educator_count, "classes": class_count},
        "recentAttendance": [s.to_dict() for s in recent_attendance],
        "recentExams": [e.to_dict() for e in recent_exams],
        "recentResources": [r.to_dict() for r in recent_resources],
    })
