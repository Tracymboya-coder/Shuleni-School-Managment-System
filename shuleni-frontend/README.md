
# Shuleni School Managament System

**The complete school management platform.**

Shuleni is a multi-tenant school management platform built for Kenyan secondary schools. Each school gets its own isolated space (via subdomain) for managing students, educators, classes, attendance, exams, learning resources, and class communication — with role-aware dashboards for School Owners, Educators, and Students.

> "Elimu ni ufunguo wa maisha." — Education is the key to life.

---

## ✨ Features

### 🏫 Multi-school / multi-tenant
- Each school signs up under its own subdomain (`yourschool.shuleni.app`) with fully isolated data.
- Guided 3-step school creation flow: school details → branding → admin account.

### 👤 Role-aware access
Three roles, each with a dedicated dashboard and permission set:

| Role | Can do |
|---|---|
| **School Owner / Admin** | Manage educators & students, create/manage classes, view school-wide analytics, oversee attendance & exams, upload resources, moderate class chat |
| **Educator** | Take attendance, build & grade exams, upload resources for their classes, chat with students, view per-class performance |
| **Student** | View timetable, take exams, check results & attendance history, browse class resources, chat with their class |

### ✅ Attendance
- Digital roll call with present / absent / late marking per student.
- Review → sign & confirm flow (password-confirmed digital signature) before a record is locked in.
- Full attendance history with signed-by/timestamp audit trail, per-class and per-student views.

### 📝 Online exams
- Exam builder supporting MCQ, short-answer, and essay questions with per-question marks.
- Student exam-taking experience with timer, question flagging, tab/focus warnings (anti-cheat), and a submit-confirmation step.
- Auto-scored results, gradebook view for educators, and a personal results/report view for students.

### 📁 Resource library
- Google Drive–style file browser, organized per class (plus a general/all-classes folder).
- Upload, preview, and download resources (PDF, DOC, video, image) with per-class access control.

### 💬 Class chat
- Class-scoped group messaging between an educator and their students.
- Pinned announcements, file sharing in-thread, and an online roster sidebar.

### 📊 Dashboards
- **Admin:** school-wide stats, class performance table, recent activity feed, upcoming exams, quick actions.
- **Educator:** their classes at a glance, pending tasks ("attendance due", grading), recent activity.
- **Student:** today's timetable, pending assessments, attendance summary banner, recent resources.

---

## 🛠 Tech stack

- **React** (function components + hooks) on **Vite**
- **Redux Toolkit** for auth/session state (`store/hooks`, `store/slices/authSlice` — `login`, `createSchool` thunks)
- **Flask** REST API backend (login and school-creation are already wired to real endpoints; other screens currently run on local mock data — see [Status](#-status--roadmap))
- **lucide-react** for icons
- Design system driven by inline styles using CSS custom properties for the palette (see [Design](#-design))

---

## 📂 Key screens

| File | Route / screen | Role |
|---|---|---|
| `Landing.jsx` | Marketing landing page | Public |
| `Login.jsx` | Sign in (+ demo role switcher) | Public |
| `CreateSchool.jsx` | 3-step school onboarding | Public |
| `ForgotPassword.jsx` | Password reset request | Public |
| `AdminDashboard.jsx` | School owner home | Admin |
| `ManageUsers.jsx` | Manage students & educators | Admin |
| `Classes.jsx` | Class list + create/edit class | Admin |
| `ClassDetail.jsx` | Single class detail (roster, resources, exams) | Admin/Educator |
| `EducatorDashboard.jsx` | Educator home | Educator |
| `Attendance.jsx` | Roll call, review, sign, history | Educator |
| `ExamBuilder.jsx` | Build exams + view results | Educator |
| `Resources.jsx` | Resource library / file browser | Admin/Educator |
| `ClassChat.jsx` | Class group chat | Educator/Student |
| `StudentDashboard.jsx` | Student home | Student |
| `ExamStudent.jsx` | Timed exam-taking flow | Student |
| `StudentResults.jsx` | Personal results/report card | Student |
| `StudentAttendance.jsx` | Personal attendance record | Student |

Navigation between screens is handled by a `navigate(screen)` prop passed down from a top-level router/switcher (not included in this file set).

---

## 🚀 Getting started

> This repo currently contains the page-level React components. Wire them into a Vite app with the structure below, or drop them into your existing `src/pages` (or `src/screens`) directory.

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

### Environment

The app expects a running Flask API. Configure the base URL via an environment variable, e.g.:

```
VITE_API_URL=http://localhost:5000
```

`Login.jsx` and `CreateSchool.jsx` dispatch `login` / `createSchool` thunks from `store/slices/authSlice`, which should call this API.

### Demo accounts

`Login.jsx` includes a "sign in as" demo shortcut (bypasses the real API) for exploring the UI without a backend:

- **School Owner** — Alice Kamau · Makini Academy
- **Educator** — Ms. Grace Njeri · Form 3 East
- **Student** — Brian Otieno · Form 3 East

---

## 🎨 Design

- **Headings:** `Plus Jakarta Sans` (weight 700–800)
- **Body:** `Inter`
- **Palette:** warm, editorial neutrals (`#FAF7F0` background, `#1E1A16` ink) with a terracotta primary (`#C1440E`), forest-green success (`#2D6A4F`), and amber warning (`#D4922A`) — evokes a Kenyan school-notebook aesthetic rather than generic SaaS blue.
- Shared utility classes referenced throughout (`card`, `btn-primary`, `btn-secondary`, `btn-ghost`, `input-field`, `table-row`, `stat-card`, `badge-green` / `badge-gold` / `badge-red` / `badge-gray`, `tab-btn`) are expected to live in a global stylesheet.

---

## 📌 Status & roadmap

- ✅ Auth (login) and school creation are wired to a real Flask API via Redux thunks.
- 🚧 Attendance, exams, resources, class chat, and user management currently render from local mock data/state and need to be connected to real backend endpoints.
- 🚧 A top-level app shell/router (sidebar nav + `navigate()` implementation, protected routes per role) isn't included in this file set.
- 🚧 File upload (Resources) and real-time chat are UI-only placeholders pending backend support.

---

## 📄 License

MIT License.