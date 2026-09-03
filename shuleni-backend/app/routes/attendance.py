from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Class, AttendanceSession, AttendanceRecord
from app.utils.decorators import require_role
from app.utils.auth_helpers import current_user

bp = Blueprint("attendance", __name__, url_prefix="/api/attendance")


@bp.post("")
@require_role("EDUCATOR", "ADMIN")
def take_attendance():
    """Educator takes + signs attendance for a class on a date.
    body: { classId, date: 'YYYY-MM-DD', records: [{ studentId, status }] }
    """
    data = request.get_json(silent=True) or {}
    class_id, date_str, records = data.get("classId"), data.get("date"), data.get("records")
    if not class_id or not date_str or not isinstance(records, list):
        return jsonify({"error": "classId, date, and records[] are required"}), 400

    user = current_user()
    cls = Class.query.filter_by(id=class_id, school_id=user["schoolId"]).first()
    if not cls:
        return jsonify({"error": "Class not found"}), 404

    session_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    session = AttendanceSession.query.filter_by(class_id=class_id, date=session_date).first()

    if session:
        AttendanceRecord.query.filter_by(session_id=session.id).delete()
        session.signed_by_id = user["id"]
        session.confirmed_at = datetime.now(timezone.utc).replace(tzinfo=None)
    else:
        session = AttendanceSession(
            class_id=class_id, date=session_date, signed_by_id=user["id"], confirmed_at=datetime.now(timezone.utc).replace(tzinfo=None)
        )
        db.session.add(session)
        db.session.flush()

    for r in records:
        db.session.add(AttendanceRecord(session_id=session.id, student_id=r["studentId"], status=r["status"]))

    db.session.commit()
    return jsonify(session.to_dict()), 201


@bp.get("")
@require_role("EDUCATOR", "ADMIN")
def attendance_history():
    """GET /api/attendance?classId=... — attendance history for a class."""
    class_id = request.args.get("classId")
    if not class_id:
        return jsonify({"error": "classId is required"}), 400

    user = current_user()
    sessions = (
        AttendanceSession.query.join(Class)
        .filter(AttendanceSession.class_id == class_id, Class.school_id == user["schoolId"])
        .order_by(AttendanceSession.date.desc())
        .all()
    )
    return jsonify([s.to_dict() for s in sessions])


@bp.get("/me")
@require_role("STUDENT")
def my_attendance():
    """A student's own attendance record."""
    user = current_user()
    records = (
        AttendanceRecord.query.join(AttendanceSession)
        .join(Class, AttendanceSession.class_id == Class.id)
        .filter(AttendanceRecord.student_id == user["id"], Class.school_id == user["schoolId"])
        .order_by(AttendanceSession.date.desc())
        .all()
    )
    return jsonify([
        {
            "status": r.status,
            "date": r.session.date.isoformat(),
            "class": {"id": r.session.class_.id, "name": r.session.class_.name},
            "signedBy": r.session.signed_by.name,
        }
        for r in records
    ])
