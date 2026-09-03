import unittest
from app import create_app
from app.config import TestConfig
from app.extensions import db


class ShuleniTestCase(unittest.TestCase):
    """Base test case: spins up a fresh in-memory SQLite DB per test.
    Mirrors the setup/teardown style of Ruby's Minitest — a clean slate every test,
    no shared state leaking between tests.
    """

    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def create_school_and_admin(self, subdomain="testschool"):
        res = self.client.post("/api/auth/create-school", json={
            "schoolName": "Test School",
            "subdomain": subdomain,
            "adminName": "Admin User",
            "adminEmail": "admin@test.com",
            "password": "password123",
        })
        return res.get_json()

    def auth_headers(self, token):
        return {"Authorization": f"Bearer {token}"}
