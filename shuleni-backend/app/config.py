import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "postgresql://shuleni:shuleni@localhost:5432/shuleni"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "change-this-to-a-long-random-string")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24 * 7  # 7 days, in seconds
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", os.path.join(os.getcwd(), "uploads"))
    MAX_CONTENT_LENGTH = 25 * 1024 * 1024  # 25MB upload cap


class TestConfig(Config):
    TESTING = True
    # Tests run against SQLite in-memory so they don't need a real Postgres instance.
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
