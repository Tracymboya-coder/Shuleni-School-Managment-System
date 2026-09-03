import json
from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models import Class, Exam, Question, ExamSubmission
from app.utils.decorators import require_role
from app.utils.auth_helpers import current_user

bp = Blueprint("exams", __name__, url_prefix="/api/exams")


@bp.post("")
@require_role("EDUCATOR", "ADMIN")
def build_exam():
    """body: { classId, title, instructions, durationMins, questions: [{type, prompt, options?, answer?, points}] }"""
    data = request.get_json(silent=True) or {}
    class_id, title, duration = data.get("classId"), data.get("title"), data.get("durationMins")
    questions = data.get("questions")

    if not class_id or not title or duration is None or not isinstance(questions, list) or len(questions) == 0:
        return jsonify({"error": "classId, title, durationMins, and at least one question are required"}), 400

    user = current_user()
    cls = Class.query.filter_by(id=class_id, school_id=user["schoolId"]).first()
    if not cls:
        return jsonify({"error": "Class not found"}), 404

    exam = Exam(
        school_id=user["schoolId"], class_id=class_id, title=title,
        instructions=data.get("instructions"), duration_mins=duration,
    )
    db.session.add(exam)
    db.session.flush()

    for i, q in enumerate(questions):
        db.session.add(Question(
            exam_id=exam.id,
            type=q["type"],
            prompt=q["prompt"],
            options=json.dumps(q["options"]) if q.get("options") else None,
            answer=q.get("answer"),
            points=q.get("points", 1),
            order=i,
        ))

    db.session.commit()
    return jsonify(exam.to_dict(with_answers=True)), 201


@bp.get("")
@jwt_required()
def list_exams():
    """GET /api/exams?classId=... — students only see exams for their own class."""
    class_id = request.args.get("classId")
    if not class_id:
        return jsonify({"error": "classId is required"}), 400

    user = current_user()

    if user["role"] == "STUDENT":
        membership = Class.query.filter(Class.id == class_id, Class.students.any(id=user["id"])).first()
        if not membership:
            return jsonify({"error": "Not a member of this class"}), 403

    exams = Exam.query.filter_by(class_id=class_id, school_id=user["schoolId"]).order_by(Exam.created_at.desc()).all()
    return jsonify([e.to_dict() for e in exams])


@bp.get("/<exam_id>/start")
@require_role("STUDENT")
def start_exam(exam_id):
    """Student starts an exam — questions are returned WITHOUT answers, and the timer starts now."""
    user = current_user()
    exam = Exam.query.filter_by(id=exam_id, school_id=user["schoolId"]).first()
    if not exam:
        return jsonify({"error": "Exam not found"}), 404

    membership = Class.query.filter(Class.id == exam.class_id, Class.students.any(id=user["id"])).first()
    if not membership:
        return jsonify({"error": "Not a member of this class"}), 403

    submission = ExamSubmission.query.filter_by(exam_id=exam.id, student_id=user["id"]).first()
    if not submission:
        submission = ExamSubmission(exam_id=exam.id, student_id=user["id"], answers="{}", started_at=datetime.now(timezone.utc).replace(tzinfo=None))
        db.session.add(submission)
        db.session.commit()
    elif submission.submitted_at:
        return jsonify({"error": "You have already submitted this exam"}), 409

    return jsonify({
        "exam": exam.to_dict(with_answers=False),
        "startedAt": submission.started_at.isoformat(),
    })


@bp.post("/<exam_id>/submit")
@require_role("STUDENT")
def submit_exam(exam_id):
    """Student submits answers; MCQs auto-grade. Server enforces the timer — late submissions are rejected."""
    data = request.get_json(silent=True) or {}
    answers = data.get("answers")
    if not isinstance(answers, dict):
        return jsonify({"error": "answers object is required"}), 400

    user = current_user()
    exam = Exam.query.filter_by(id=exam_id, school_id=user["schoolId"]).first()
    if not exam:
        return jsonify({"error": "Exam not found"}), 404

    submission = ExamSubmission.query.filter_by(exam_id=exam.id, student_id=user["id"]).first()
    if not submission:
        return jsonify({"error": "Exam was not started"}), 400
    if submission.submitted_at:
        return jsonify({"error": "Already submitted"}), 409

    deadline = submission.started_at + timedelta(minutes=exam.duration_mins)
    if datetime.now(timezone.utc).replace(tzinfo=None) > deadline:
        return jsonify({"error": "Time is up — exam auto-closed"}), 410

    score = 0
    auto_gradable = 0
    for q in exam.questions:
        if q.type == "MCQ" and q.answer is not None:
            auto_gradable += q.points
            if answers.get(q.id) == q.answer:
                score += q.points

    submission.answers = json.dumps(answers)
    submission.score = score
    submission.submitted_at = datetime.now(timezone.utc).replace(tzinfo=None)
    db.session.commit()

    total_points = sum(q.points for q in exam.questions)
    return jsonify({
        "message": "Exam submitted",
        "autoGradedScore": score,
        "autoGradedOutOf": auto_gradable,
        "fullyGraded": auto_gradable == total_points,
        "submittedAt": submission.submitted_at.isoformat(),
    })


@bp.get("/<exam_id>/results")
@require_role("EDUCATOR", "ADMIN")
def exam_results(exam_id):
    """Educator/Admin views all submissions for an exam."""
    user = current_user()
    exam = Exam.query.filter_by(id=exam_id, school_id=user["schoolId"]).first()
    if not exam:
        return jsonify({"error": "Exam not found"}), 404

    submissions = ExamSubmission.query.filter_by(exam_id=exam.id).order_by(ExamSubmission.submitted_at.desc()).all()
    return jsonify([s.to_dict() for s in submissions])


@bp.get("/results/me")
@require_role("STUDENT")
def my_results():
    """Student views their own results across all exams."""
    user = current_user()
    submissions = (
        ExamSubmission.query.join(Exam)
        .filter(
            ExamSubmission.student_id == user["id"],
            Exam.school_id == user["schoolId"],
            ExamSubmission.submitted_at.isnot(None),
        )
        .order_by(ExamSubmission.submitted_at.desc())
        .all()
    )
    return jsonify([
        {
            "examId": s.exam_id,
            "examTitle": s.exam.title,
            "classId": s.exam.class_id,
            "score": s.score,
            "submittedAt": s.submitted_at.isoformat(),
        }
        for s in submissions
    ])
