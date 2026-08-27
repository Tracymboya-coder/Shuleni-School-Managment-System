from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class ChatMessage(TimestampMixin, db.Model):
    __tablename__ = "chat_messages"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    class_id = db.Column(db.String, db.ForeignKey("classes.id"), nullable=False)
    sender_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)

    sender = db.relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "classId": self.class_id,
            "body": self.body,
            "createdAt": self.created_at.isoformat(),
            "sender": {"id": self.sender.id, "name": self.sender.name, "role": self.sender.role},
        }
