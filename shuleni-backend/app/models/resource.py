from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class Resource(TimestampMixin, db.Model):
    __tablename__ = "resources"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    school_id = db.Column(db.String, db.ForeignKey("schools.id"), nullable=False)
    class_id = db.Column(db.String, db.ForeignKey("classes.id"), nullable=False)
    title = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)  # note | book | material | document
    description = db.Column(db.Text, nullable=True)
    file_url = db.Column(db.String, nullable=False)
    uploaded_by = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)

    class_ = db.relationship("Class", backref=db.backref("resources", lazy="dynamic"))


    def to_dict(self):
        return {
            "id": self.id,
            "classId": self.class_id,
            "title": self.title,
            "category": self.category,
            "description": self.description,
            "fileUrl": self.file_url,
            "uploadedBy": self.uploaded_by,
            "createdAt": self.created_at.isoformat(),
        }
