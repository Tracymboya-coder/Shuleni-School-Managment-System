
# Shuleni 🎓

> A complete online school platform for the Kenyan education context — bringing everything a physical school does into a single web app, without losing quality of instruction.

## Problem Statement

For physical-based education to be fully accessible in an online environment while still delivering the same quality of education. Most e-learning tools cover only a slice of the school experience (video calls, or file sharing, or quizzes) — none replicate a full school: enrollment, attendance, resources, exams, and class community, all in one place.

## Solution

Shuleni is a multi-tenant online school platform. Any school owner, manager, or facilitator can create their own school on Shuleni, invite educators and students, and run the full academic workflow online — attendance, resources, exams, and class communication — with each school's data fully isolated from every other school on the platform.

## Core Features (MVP)

- **Multi-tenant school creation** — School owners/managers create their own school. Multiple schools can exist on the platform simultaneously without their data, users, or content ever colliding.
-  **Role-based user management** — Owners add students and educators. Educators get extended permissions (attendance, resources, exams) beyond what students can access.
-  **Resource library** — A shared "drive" for notes, books, and resources, with permissions configurable per class.
-  **Attendance & roll call** — Regular attendance tracking that must be confirmed/signed off by the responsible teacher.
-  **Timed exams & assessments** — Online exams and tests with built-in timing and anti-plagiarism safeguards.
- **Class-based chat** — Each class has its own chat space for student and teacher interaction.

### Planned / Stretch Features
-  Video conferencing for live, interactive learning sessions
-  School-wide co-curricular activities — quizzes, clubs, and other online-friendly extracurriculars

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Redux Toolkit (state management) |
| Backend | Python (Flask) |
| Database | PostgreSQL |
| Testing | Jest (frontend), Minitest (backend) |
| Design | Figma (mobile-friendly wireframes) |

## Architecture Overview

Shuleni follows a multi-tenant architecture where each school operates as an isolated scope within a shared platform:

```
Client (React + Redux Toolkit)
        │
        ▼
   REST API (Flask)
        │
        ▼
  PostgreSQL (tenant-scoped by school_id)
```

- Every core resource (users, classes, attendance, exams, resources, chats) is scoped to a `school_id`, enforced at the API and database layer.
- Role-based access control (RBAC) governs what owners, educators, and students can each see and do within their school.

## Project Structure

```
shuleni/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── features/       # Redux Toolkit slices (auth, school, attendance, exams, chat, resources)
│   │   ├── pages/
│   │   ├── services/        # API calls
│   │   └── app/             # Redux store config
│   └── tests/                # Jest tests
│
├── server/                  # Flask backend
│   ├── app/
│   │   ├── models/           # SQLAlchemy models
│   │   ├── routes/           # Blueprints (schools, users, classes, attendance, exams, resources, chat)
│   │   ├── controllers/
│   │   └── utils/
│   ├── migrations/           # DB migrations
│   └── tests/                 # Minitest suites
│
├── design/                    # Figma exports / design assets
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- PostgreSQL 14+

### Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env           # set DATABASE_URL, SECRET_KEY, etc.

# Run migrations
flask db upgrade

# Start the server
flask run
```

### Frontend Setup

```bash
cd client
npm install

# Configure environment variables
cp .env.example .env           # set REACT_APP_API_URL

npm start
```

The app should now be running at `http://localhost:3000`, connected to the Flask API at `http://localhost:5000`.

## Running Tests

**Frontend (Jest):**
```bash
cd client
npm test
```

**Backend (Minitest):**
```bash
cd server
python -m pytest    # or: rails-style minitest runner if configured
```

## User Roles

| Role | Permissions |
|---|---|
| **School Owner/Manager** | Create school, add/remove students & educators, manage school settings |
| **Educator** | Take attendance, manage class resources, create/grade exams, moderate class chat |
| **Student** | View resources, take attendance roll call, take exams, participate in class chat |

## Team

Full Stack team — React (Frontend) & Python/Flask (Backend).

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear messages
4. Push and open a Pull Request

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.
