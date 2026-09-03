import unittest
from tests.base import ShuleniTestCase


class TestTenantIsolation(ShuleniTestCase):
    """The most important property of a multi-tenant app: school A can never see school B's data."""

    def test_two_schools_can_reuse_the_same_admin_email(self):
        self.create_school_and_admin(subdomain="school-a")
        res = self.create_school_and_admin(subdomain="school-b")
        # Same admin@test.com email in both schools should succeed — uniqueness is per-school.
        self.assertIn("token", res)

    def test_class_created_in_one_school_is_invisible_to_another(self):
        school_a = self.create_school_and_admin(subdomain="school-a")
        school_b = self.create_school_and_admin(subdomain="school-b")

        cls_res = self.client.post(
            "/api/classes", json={"name": "Form 1"}, headers=self.auth_headers(school_a["token"])
        )
        class_id = cls_res.get_json()["id"]

        # Admin of school B should not be able to fetch school A's class.
        res = self.client.get(f"/api/classes/{class_id}", headers=self.auth_headers(school_b["token"]))
        self.assertEqual(res.status_code, 404)


class TestUsersAndClasses(ShuleniTestCase):

    def test_admin_can_create_class_and_student(self):
        school = self.create_school_and_admin()
        headers = self.auth_headers(school["token"])

        cls_res = self.client.post("/api/classes", json={"name": "Form 2"}, headers=headers)
        self.assertEqual(cls_res.status_code, 201)
        class_id = cls_res.get_json()["id"]

        student_res = self.client.post("/api/users", json={
            "name": "Jane Student", "email": "jane@test.com", "password": "password123",
            "role": "STUDENT", "classId": class_id,
        }, headers=headers)
        self.assertEqual(student_res.status_code, 201)
        self.assertEqual(student_res.get_json()["role"], "STUDENT")

    def test_student_cannot_create_a_class(self):
        school = self.create_school_and_admin()
        admin_headers = self.auth_headers(school["token"])

        cls_res = self.client.post("/api/classes", json={"name": "Form 3"}, headers=admin_headers)
        class_id = cls_res.get_json()["id"]

        self.client.post("/api/users", json={
            "name": "Jane Student", "email": "jane@test.com", "password": "password123",
            "role": "STUDENT", "classId": class_id,
        }, headers=admin_headers)

        login_res = self.client.post("/api/auth/login", json={
            "subdomain": "testschool", "email": "jane@test.com", "password": "password123",
        })
        student_token = login_res.get_json()["token"]

        res = self.client.post(
            "/api/classes", json={"name": "Illegal Class"}, headers=self.auth_headers(student_token)
        )
        self.assertEqual(res.status_code, 403)


if __name__ == "__main__":
    unittest.main()
