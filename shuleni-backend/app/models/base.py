import uuid
from datetime import datetime, timezone
from app.extensions import db


def gen_id() -> str:
    """Short random string id, equivalent role to Prisma's cuid()."""
    return uuid.uuid4().hex


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class TimestampMixin:
    created_at = db.Column(db.DateTime, default=utcnow, nullable=False)
