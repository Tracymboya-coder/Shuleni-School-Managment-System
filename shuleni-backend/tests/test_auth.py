import unittest
from tests.base import ShuleniTestCase


class TestAuth(ShuleniTestCase):

    def test_create_school_returns_token_and_school(self):
        data = self.create_school_and_admin()
        self.assertIn("token", data)
        self.assertEqual(data["school"]["subdomain"], "testschool")

    def test_create_school_rejects_duplicate_subdomain(self):
        self.create_school_and_admin()
        res = self.client.post("/api/auth/create-school", json={
            "schoolName": "Another School",
            "subdomain": "testschool",
            "adminName": "Someone Else",
            "adminEmail": "other@test.com",
            "password": "password123",
        })
        self.assertEqual(res.status_code, 409)

    def test_login_succeeds_with_correct_credentials(self):
        self.create_school_and_admin()
        res = self.client.post("/api/auth/login", json={
            "subdomain": "testschool", "email": "admin@test.com", "password": "password123",
        })
        self.assertEqual(res.status_code, 200)
        self.assertIn("token", res.get_json())

    def test_login_fails_with_wrong_password(self):
        self.create_school_and_admin()
        res = self.client.post("/api/auth/login", json={
            "subdomain": "testschool", "email": "admin@test.com", "password": "wrongpass",
        })
        self.assertEqual(res.status_code, 401)

    def test_login_fails_for_wrong_subdomain(self):
        self.create_school_and_admin()
        res = self.client.post("/api/auth/login", json={
            "subdomain": "doesnotexist", "email": "admin@test.com", "password": "password123",
        })
        self.assertEqual(res.status_code, 401)


if __name__ == "__main__":
    unittest.main()
