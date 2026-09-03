"""Seeds demo data: one school, one admin, one educator, one class, one student.
Run with: python seed.py   (after `flask --app run db upgrade` has created the tables)
"""
from app import create_app
from app.extensions import db, bcrypt
from app.models import School, User, Class, ClassEducator

app = create_app()

with app.app_context():
    if School.query.filter_by(subdomain="makini").first():
        print("Demo school already exists — skipping seed.")
    else:
        school = School(name="Makini Academy", subdomain="makini", county="Nairobi", type="Private School")
        db.session.add(school)
        db.session.flush()

        pw_hash = bcrypt.generate_password_hash("password123").decode("utf-8")

        admin = User(school_id=school.id, name="Alice Kamau", email="alice@makini.ac.ke", password_hash=pw_hash, role="ADMIN")
        educator = User(school_id=school.id, name="Grace Njeri", email="grace@makini.ac.ke", password_hash=pw_hash, role="EDUCATOR")
        db.session.add_all([admin, educator])
        db.session.flush()

        cls = Class(school_id=school.id, name="Form 3 East")
        db.session.add(cls)
        db.session.flush()
        db.session.add(ClassEducator(class_id=cls.id, educator_id=educator.id))

        student = User(
            school_id=school.id, name="Brian Otieno", email="brian@makini.ac.ke",
            password_hash=pw_hash, role="STUDENT", student_class_id=cls.id,
        )
        db.session.add(student)

        db.session.commit()
        print("Seeded: school=makini, admin=alice@makini.ac.ke, educator=grace@makini.ac.ke, student=brian@makini.ac.ke")
        print("All demo accounts use password: password123")
