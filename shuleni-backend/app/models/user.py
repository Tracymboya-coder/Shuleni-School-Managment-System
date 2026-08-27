from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class User(TimestampMixin, db.Model):
    __tablename__ = "users"
    __table_args__ = (
        # Email only needs to be unique *within* a school, not globally —
        # this is what lets two different schools each have an "admin@school.com".
        db.UniqueConstraint("school_id", "email", name="uq_user_school_email"),
    )

    id = db.Column(db.String, primary_key=True, default=gen_id)
    school_id = db.Column(db.String, db.ForeignKey("schools.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)  # 'ADMIN' | 'EDUCATOR' | 'STUDENT'

    student_class_id = db.Column(db.String, db.ForeignKey("classes.id"), nullable=True)

    school = db.relationship("School", back_populates="users")
    student_class = db.relationship(
        "Class", back_populates="students", foreign_keys=[student_class_id]
    )

    def to_dict(self, include_email=True):
        data = {"id": self.id, "name": self.name, "role": self.role, "createdAt": self.created_at.isoformat()}
        if include_email:
            data["email"] = self.email
        if self.role == "STUDENT":
            data["studentClassId"] = self.student_class_id
        return data
