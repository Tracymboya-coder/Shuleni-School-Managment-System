from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class School(TimestampMixin, db.Model):
    __tablename__ = "schools"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    name = db.Column(db.String, nullable=False)
    subdomain = db.Column(db.String, unique=True, nullable=False)
    county = db.Column(db.String, nullable=True)
    type = db.Column(db.String, nullable=True)
    motto = db.Column(db.String, nullable=True)

    users = db.relationship("User", back_populates="school", lazy="dynamic")
    classes = db.relationship("Class", back_populates="school", lazy="dynamic")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "subdomain": self.subdomain,
            "county": self.county,
            "type": self.type,
        }
