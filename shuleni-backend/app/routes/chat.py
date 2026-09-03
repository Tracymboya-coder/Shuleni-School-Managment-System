from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models import Class, ChatMessage, ClassEducator
from app.utils.auth_helpers import current_user

bp = Blueprint("chat", __name__, url_prefix="/api/chat")


def _assert_membership(user, class_id):
    if user["role"] == "STUDENT":
        return Class.query.filter(
            Class.id == class_id, Class.school_id == user["schoolId"], Class.students.any(id=user["id"])
        ).first()
    if user["role"] == "EDUCATOR":
        return Class.query.filter(
            Class.id == class_id, Class.school_id == user["schoolId"],
            Class.educator_links.any(ClassEducator.educator_id == user["id"]),
        ).first()
    return Class.query.filter_by(id=class_id, school_id=user["schoolId"]).first()  # ADMIN


@bp.get("/<class_id>/messages")
@jwt_required()
def get_messages(class_id):
    """GET /api/chat/:classId/messages?after=<ISO timestamp>
    Poll with `after` to fetch only new messages since your last check.
    For real-time delivery, swap this for a Socket.IO/WebSocket channel scoped to the class room.
    """
    user = current_user()
    if not _assert_membership(user, class_id):
        return jsonify({"error": "Not a member of this class"}), 403

    query = ChatMessage.query.filter_by(class_id=class_id)
    after = request.args.get("after")
    if after:
        query = query.filter(ChatMessage.created_at > datetime.fromisoformat(after))

    messages = query.order_by(ChatMessage.created_at.asc()).limit(200).all()
    return jsonify([m.to_dict() for m in messages])


@bp.post("/<class_id>/messages")
@jwt_required()
def post_message(class_id):
    user = current_user()
    if not _assert_membership(user, class_id):
        return jsonify({"error": "Not a member of this class"}), 403

    body = (request.get_json(silent=True) or {}).get("body", "")
    if not body.strip():
        return jsonify({"error": "Message body is required"}), 400

    message = ChatMessage(class_id=class_id, sender_id=user["id"], body=body.strip())
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201
