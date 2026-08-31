from flask import Flask, send_from_directory
from flasgger import Swagger

from app.config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors
from app.swagger_docs import SWAGGER_TEMPLATE


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    # Swagger API documentation
    Swagger(app, template=SWAGGER_TEMPLATE)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # Import models so Flask-Migrate can detect them
    from app import models  # noqa: F401

    # Register blueprints
    from app.routes import (
        auth,
        schools,
        users,
        classes,
        resources,
        attendance,
        exams,
        chat,
    )

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
        return send_from_directory(
            app.config["UPLOAD_FOLDER"],
            filename,
        )

    @app.errorhandler(Exception)
    def handle_error(err):
        code = getattr(err, "code", 500)
        message = getattr(err, "description", str(err))
        return {
            "error": message
        }, code if isinstance(code, int) else 500

    return app
