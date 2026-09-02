import os
from flask import Flask, send_from_directory
from app.config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    origins = os.environ.get("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": [origin.strip() for origin in origins.split(",") if origin.strip()]}}
    )

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Import models so Flask-Migrate can detect them
    from app import models  # noqa: F401

    # Register blueprints
    from app.routes import auth, schools, users, classes, resources, attendance, exams, chat
    app.register_blueprint(auth.bp)
    app.register_blueprint(schools.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(classes.bp)
    app.register_blueprint(resources.bp)
    app.register_blueprint(attendance.bp)
    app.register_blueprint(exams.bp)
    app.register_blueprint(chat.bp)

    @app.get("/api/health")
    def health():
        return {"ok": True}

    @app.get("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

    @app.errorhandler(Exception)
    def handle_error(err):
        code = getattr(err, "code", 500)
        message = getattr(err, "description", str(err))
        return {"error": message}, code if isinstance(code, int) else 500

    return app
