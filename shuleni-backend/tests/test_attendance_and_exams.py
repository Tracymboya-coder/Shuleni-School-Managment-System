import time
import unittest
from datetime import date
from tests.base import ShuleniTestCase


class TestAttendanceAndExams(ShuleniTestCase):

    def _setup_class_with_student(self):
        school = self.create_school_and_admin()
        admin_headers = self.auth_headers(school["token"])
        cls_res = self.client.post("/api/classes", json={"name": "Form 4"}, headers=admin_headers)
        class_id = cls_res.get_json()["id"]
        self.client.post("/api/users", json={
            "name": "Jane Student", "email": "jane@test.com", "password": "password123",
            "role": "STUDENT", "classId": class_id,
        }, headers=admin_headers)
        login_res = self.client.post("/api/auth/login", json={
            "subdomain": "testschool", "email": "jane@test.com", "password": "password123",
        })
        student_token = login_res.get_json()["token"]
        return admin_headers, self.auth_headers(student_token), class_id

    def test_educator_can_take_and_sign_attendance(self):
        school = self.create_school_and_admin()
        headers = self.auth_headers(school["token"])
        cls_res = self.client.post("/api/classes", json={"name": "Form 4"}, headers=headers)
        class_id = cls_res.get_json()["id"]
        student_res = self.client.post("/api/users", json={
            "name": "Jane Student", "email": "jane@test.com", "password": "password123",
            "role": "STUDENT", "classId": class_id,
        }, headers=headers)
        student_id = student_res.get_json()["id"]

        res = self.client.post("/api/attendance", json={
            "classId": class_id,
            "date": str(date.today()),
            "records": [{"studentId": student_id, "status": "PRESENT"}],
        }, headers=headers)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.get_json()["records"][0]["status"], "PRESENT")

    def test_mcq_exam_auto_grades_on_submit(self):
        admin_headers, student_headers, class_id = self._setup_class_with_student()

        exam_res = self.client.post("/api/exams", json={
            "classId": class_id,
            "title": "Quick Quiz",
            "durationMins": 30,
            "questions": [
                {"type": "MCQ", "prompt": "2 + 2?", "options": ["3", "4", "5"], "answer": "4", "points": 1},
                {"type": "MCQ", "prompt": "Capital of Kenya?", "options": ["Nairobi", "Mombasa"], "answer": "Nairobi", "points": 1},
            ],
        }, headers=admin_headers)
        exam_id = exam_res.get_json()["id"]

        start_res = self.client.get(f"/api/exams/{exam_id}/start", headers=student_headers)
        self.assertEqual(start_res.status_code, 200)
        questions = start_res.get_json()["exam"]["questions"]
        # The student-facing payload must never include the correct answer.
        self.assertNotIn("answer", questions[0])

        q_ids = [q["id"] for q in questions]
        answers = {q_ids[0]: "4", q_ids[1]: "Mombasa"}  # one right, one wrong

        submit_res = self.client.post(f"/api/exams/{exam_id}/submit", json={"answers": answers}, headers=student_headers)
        self.assertEqual(submit_res.status_code, 200)
        body = submit_res.get_json()
        self.assertEqual(body["autoGradedScore"], 1)
        self.assertEqual(body["autoGradedOutOf"], 2)

    def test_late_exam_submission_is_rejected_by_server(self):
        admin_headers, student_headers, class_id = self._setup_class_with_student()

        # duration of 0 minutes means any submission after start is "late"
        exam_res = self.client.post("/api/exams", json={
            "classId": class_id,
            "title": "Instant Timeout Quiz",
            "durationMins": 0,
            "questions": [{"type": "MCQ", "prompt": "2 + 2?", "options": ["3", "4"], "answer": "4", "points": 1}],
        }, headers=admin_headers)
        exam_id = exam_res.get_json()["id"]

        self.client.get(f"/api/exams/{exam_id}/start", headers=student_headers)
        time.sleep(1.2)  # ensure we're past the (zero-minute) deadline

        start_data = self.client.get(f"/api/exams/{exam_id}/start", headers=student_headers)
        q_id = start_data.get_json()["exam"]["questions"][0]["id"]

        submit_res = self.client.post(
            f"/api/exams/{exam_id}/submit", json={"answers": {q_id: "4"}}, headers=student_headers
        )
        self.assertEqual(submit_res.status_code, 410)  # Gone: time is up

    def test_student_cannot_start_exam_for_a_class_they_are_not_in(self):
        admin_headers, _, class_id = self._setup_class_with_student()

        # A second, unrelated student in a different class in the same school
        other_cls = self.client.post("/api/classes", json={"name": "Form 5"}, headers=admin_headers).get_json()
        self.client.post("/api/users", json={
            "name": "Outsider", "email": "outsider@test.com", "password": "password123",
            "role": "STUDENT", "classId": other_cls["id"],
        }, headers=admin_headers)
        outsider_login = self.client.post("/api/auth/login", json={
            "subdomain": "testschool", "email": "outsider@test.com", "password": "password123",
        })
        outsider_headers = self.auth_headers(outsider_login.get_json()["token"])

        exam_res = self.client.post("/api/exams", json={
            "classId": class_id, "title": "Restricted Quiz", "durationMins": 10,
            "questions": [{"type": "MCQ", "prompt": "?", "options": ["a", "b"], "answer": "a", "points": 1}],
        }, headers=admin_headers)
        exam_id = exam_res.get_json()["id"]

        res = self.client.get(f"/api/exams/{exam_id}/start", headers=outsider_headers)
        self.assertEqual(res.status_code, 403)


if __name__ == "__main__":
    unittest.main()
