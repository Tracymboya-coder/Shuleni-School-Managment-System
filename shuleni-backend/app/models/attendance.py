from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class AttendanceSession(TimestampMixin, db.Model):
    __tablename__ = "attendance_sessions"
    __table_args__ = (db.UniqueConstraint("class_id", "date", name="uq_session_class_date"),)

    id = db.Column(db.String, primary_key=True, default=gen_id)
    class_id = db.Column(db.String, db.ForeignKey("classes.id"), nullable=False)
    date = db.Column(db.Date, nullable=False)
    signed_by_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    confirmed_at = db.Column(db.DateTime, nullable=True)

    records = db.relationship("AttendanceRecord", backref="session", lazy="joined", cascade="all, delete-orphan")
    signed_by = db.relationship("User")
    class_ = db.relationship("Class")

    def to_dict(self):
        return {
            "id": self.id,
            "classId": self.class_id,
            "date": self.date.isoformat(),
            "confirmedAt": self.confirmed_at.isoformat() if self.confirmed_at else None,
            "signedBy": {"id": self.signed_by.id, "name": self.signed_by.name},
            "records": [r.to_dict() for r in self.records],
        }


class AttendanceRecord(db.Model):
    __tablename__ = "attendance_records"
    __table_args__ = (db.UniqueConstraint("session_id", "student_id", name="uq_record_session_student"),)

    id = db.Column(db.String, primary_key=True, default=gen_id)
    session_id = db.Column(db.String, db.ForeignKey("attendance_sessions.id"), nullable=False)
    student_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String, nullable=False)  # PRESENT | ABSENT | LATE | EXCUSED

    def to_dict(self):
        return {"studentId": self.student_id, "status": self.status}
