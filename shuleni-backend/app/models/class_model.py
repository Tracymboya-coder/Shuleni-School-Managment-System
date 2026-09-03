from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class Class(TimestampMixin, db.Model):
    __tablename__ = "classes"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    school_id = db.Column(db.String, db.ForeignKey("schools.id"), nullable=False)
    name = db.Column(db.String, nullable=False)

    school = db.relationship("School", back_populates="classes")
    students = db.relationship(
        "User", back_populates="student_class", foreign_keys="User.student_class_id"
    )
    educator_links = db.relationship("ClassEducator", back_populates="class_", lazy="dynamic")

    def to_dict(self, with_counts=False):
        data = {"id": self.id, "name": self.name, "schoolId": self.school_id}
        if with_counts:
            data["studentCount"] = len(self.students)
            data["educators"] = [
                {"id": link.educator_id, "name": link.educator.name} for link in self.educator_links
            ]
        return data


class ClassEducator(db.Model):
    __tablename__ = "class_educators"

    class_id = db.Column(db.String, db.ForeignKey("classes.id"), primary_key=True)
    educator_id = db.Column(db.String, db.ForeignKey("users.id"), primary_key=True)

    class_ = db.relationship("Class", back_populates="educator_links")
    educator = db.relationship("User")
