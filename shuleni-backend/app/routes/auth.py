import re
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.extensions import db, bcrypt
from app.models import School, User


bp = Blueprint("auth", __name__, url_prefix="/api/auth")

SUBDOMAIN_RE = re.compile(r"^[a-z0-9-]+$")


def make_token(user: User):
    return create_access_token(
        identity=user.id,
        additional_claims={
            "schoolId": user.school_id,
            "role": user.role,
            "name": user.name,
        },
    )


@bp.post("/create-school")
def create_school():
    """
    Create a new school and its administrator account.
    ---
    tags:
      - Authentication
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - schoolName
            - subdomain
            - adminName
            - adminEmail
            - password
          properties:
            schoolName:
              type: string
              example: Shuleni Academy
            subdomain:
              type: string
              example: shuleni-academy
            county:
              type: string
              example: Nairobi
            type:
              type: string
              example: Secondary School
            adminName:
              type: string
              example: John Doe
            adminEmail:
              type: string
              example: john.admin@shuleni.com
            password:
              type: string
              example: password123
    responses:
      201:
        description: School and administrator created successfully
      400:
        description: Missing or invalid required fields
      409:
        description: Subdomain already exists
    """
    data = request.get_json(silent=True) or {}

    required = [
        "schoolName",
        "subdomain",
        "adminName",
        "adminEmail",
        "password",
    ]

    missing = [field for field in required if not data.get(field)]

    if missing:
        return jsonify({
            "error": f"Missing required fields: {', '.join(missing)}"
        }), 400

    subdomain = data["subdomain"].lower()

    if not SUBDOMAIN_RE.match(subdomain):
        return jsonify({
            "error": "subdomain may only contain lowercase letters, numbers, and hyphens"
        }), 400

    if len(data["password"]) < 8:
        return jsonify({
            "error": "password must be at least 8 characters"
        }), 400

    if School.query.filter_by(subdomain=subdomain).first():
        return jsonify({
            "error": "That subdomain is already taken"
        }), 409

    school = School(
        name=data["schoolName"],
        subdomain=subdomain,
        county=data.get("county"),
        type=data.get("type"),
    )

    db.session.add(school)
    db.session.flush()

    password_hash = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    admin = User(
        school_id=school.id,
        name=data["adminName"],
        email=data["adminEmail"].lower(),
        password_hash=password_hash,
        role="ADMIN",
    )

    db.session.add(admin)
    db.session.commit()

    token = make_token(admin)

    return jsonify({
        "token": token,
        "user": admin.to_dict(),
        "school": school.to_dict(),
    }), 201


@bp.post("/login")
def login():
    """
    Login to a school account and receive a JWT access token.
    ---
    tags:
      - Authentication
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - subdomain
            - email
            - password
          properties:
            subdomain:
              type: string
              example: shuleni-academy
            email:
              type: string
              example: john.admin@shuleni.com
            password:
              type: string
              example: password123
    responses:
      200:
        description: Login successful and JWT token returned
      400:
        description: Missing login fields
      401:
        description: Invalid school, email, or password
    """
    data = request.get_json(silent=True) or {}

    subdomain = data.get("subdomain")
    email = data.get("email")
    password = data.get("password")

    if not subdomain or not email or not password:
        return jsonify({
            "error": "subdomain, email, and password are required"
        }), 400

    school = School.query.filter_by(
        subdomain=subdomain.lower()
    ).first()

    if not school:
        return jsonify({
            "error": "Invalid school, email, or password"
        }), 401

    user = User.query.filter_by(
        school_id=school.id,
        email=email.lower(),
    ).first()

    if not user or not bcrypt.check_password_hash(
        user.password_hash,
        password,
    ):
        return jsonify({
            "error": "Invalid school, email, or password"
        }), 401

    token = make_token(user)

    return jsonify({
        "token": token,
        "user": user.to_dict(),
        "school": user.school.to_dict(),
    })


@bp.post("/forgot-password")
def forgot_password():
    """
    Request a password reset.
    ---
    tags:
      - Authentication
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - subdomain
            - email
          properties:
            subdomain:
              type: string
              example: shuleni-academy
            email:
              type: string
              example: john.admin@shuleni.com
    responses:
      200:
        description: Password reset request processed
      400:
        description: Missing subdomain or email
    """
    data = request.get_json(silent=True) or {}

    if not data.get("subdomain") or not data.get("email"):
        return jsonify({
            "error": "subdomain and email are required"
        }), 400

    return jsonify({
        "message": "If that account exists, a reset link has been sent."
    })
