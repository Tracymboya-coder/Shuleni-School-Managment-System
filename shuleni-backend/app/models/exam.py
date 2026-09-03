import json
from app.extensions import db
from app.models.base import gen_id, TimestampMixin


class Exam(TimestampMixin, db.Model):
    __tablename__ = "exams"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    school_id = db.Column(db.String, db.ForeignKey("schools.id"), nullable=False)
    class_id = db.Column(db.String, db.ForeignKey("classes.id"), nullable=False)
    title = db.Column(db.String, nullable=False)
    instructions = db.Column(db.Text, nullable=True)
    duration_mins = db.Column(db.Integer, nullable=False)

    class_ = db.relationship("Class", backref=db.backref("exams", lazy="dynamic"))


    questions = db.relationship(
        "Question", backref="exam", lazy="joined", order_by="Question.order",
        cascade="all, delete-orphan",
    )

    def to_dict(self, with_answers=False):
        return {
            "id": self.id,
            "classId": self.class_id,
            "title": self.title,
            "instructions": self.instructions,
            "durationMins": self.duration_mins,
            "createdAt": self.created_at.isoformat(),
            "questions": [q.to_dict(with_answer=with_answers) for q in self.questions],
        }


class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.String, primary_key=True, default=gen_id)
    exam_id = db.Column(db.String, db.ForeignKey("exams.id"), nullable=False)
    type = db.Column(db.String, nullable=False)  # MCQ | SHORT_ANSWER | ESSAY
    prompt = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text, nullable=True)  # JSON-encoded array for MCQ
    answer = db.Column(db.Text, nullable=True)  # correct answer — never sent to students
    points = db.Column(db.Integer, default=1, nullable=False)
    order = db.Column(db.Integer, default=0, nullable=False)

    def to_dict(self, with_answer=False):
        data = {
            "id": self.id,
            "type": self.type,
            "prompt": self.prompt,
            "options": json.loads(self.options) if self.options else None,
            "points": self.points,
            "order": self.order,
        }
        if with_answer:
            data["answer"] = self.answer
        return data


class ExamSubmission(TimestampMixin, db.Model):
    __tablename__ = "exam_submissions"
    __table_args__ = (db.UniqueConstraint("exam_id", "student_id", name="uq_submission_exam_student"),)

    id = db.Column(db.String, primary_key=True, default=gen_id)
    exam_id = db.Column(db.String, db.ForeignKey("exams.id"), nullable=False)
    student_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    answers = db.Column(db.Text, default="{}", nullable=False)  # JSON-encoded { questionId: answer }
    score = db.Column(db.Float, nullable=True)
    started_at = db.Column(db.DateTime, default=None, nullable=True)
    submitted_at = db.Column(db.DateTime, nullable=True)

    student = db.relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "examId": self.exam_id,
            "student": {"id": self.student.id, "name": self.student.name, "email": self.student.email},
            "score": self.score,
            "startedAt": self.started_at.isoformat() if self.started_at else None,
            "submittedAt": self.submitted_at.isoformat() if self.submitted_at else None,
        }
