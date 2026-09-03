# Shuleni — MVP School Management & Online Learning Platform

Design a complete, modern, mobile-friendly web application called **Shuleni**.

Shuleni is an online school platform that allows multiple independent schools to operate on the same platform. Each school must have completely separate data and users. One school must never see or interact with another school's students, educators, classes, resources, attendance, exams, or chats.

Design **ONLY the MVP features described below**. Do NOT add payments, subscriptions, video conferencing, clubs, co-curricular activities, or any other features outside this MVP.

## 1. User Roles

Design interfaces for three user roles:

* School Owner / Manager / Facilitator
* Educator / Teacher
* Student

Each role should have appropriate permissions and dashboards.

## 2. Authentication

Create:

* Login screen
* Registration screen
* Forgot password screen
* Role-aware authentication flow

The registration flow should allow a school owner/manager/facilitator to create a new school.

The design should clearly communicate that each school operates independently.

## 3. School Creation and School Management

Create a school setup flow where a school owner/manager/facilitator can:

* Create a new school
* Enter school name and basic school information
* Access their school dashboard
* Manage students
* Manage educators
* Manage classes

Create a school administrator dashboard showing useful school information such as:

* Number of students
* Number of educators
* Number of classes
* Recent attendance activity
* Recent exams/assessments
* Recent learning resources

Do not include financial information or payment sections.

## 4. Student Management

Create screens where the school owner/manager/facilitator can:

* View all students
* Add a student
* View student details
* Assign students to classes
* Edit student information

Include a student list/table and a mobile-friendly student card layout.

## 5. Educator Management

Create screens where the school owner/manager/facilitator can:

* View educators
* Add an educator
* View educator details
* Assign educators to classes
* Edit educator information

Educators should have their own dashboard.

## 6. Classes

Create a class management section.

Users should be able to see:

* Classes in their school
* Students belonging to each class
* Educators responsible for each class
* Class resources
* Class attendance
* Class exams/assessments
* Class chat

A class page should act as the central location for that class.

## 7. Learning Resources

Create a resource management system similar to a simple school-specific digital library.

The resource section must support:

* Notes
* Books
* Learning materials
* Documents/resources

Educators should be able to add resources.

Students should be able to view resources they have permission to access.

Different classes may have different permissions, so the design should include resource visibility/access settings.

Create:

* Resource library screen
* Resource details screen
* Add resource screen for educators
* Resource access/permission screen
* Student resource view

Use clear categories and search/filter functionality where appropriate.

Do not design payment, cloud-storage subscriptions, or unrelated file-sharing functionality.

## 8. Attendance

Create a complete attendance workflow.

Educators should be able to:

* Select a class
* Select a date
* View students in the class
* Mark students as Present, Absent, or other appropriate attendance status
* Submit attendance
* Sign/confirm the attendance record

Create attendance screens for:

* Taking attendance
* Attendance confirmation/signature
* Attendance history
* Student attendance record
* Class attendance overview

Students should be able to view their own attendance records.

The attendance record must clearly show the responsible educator who signed/confirmed it.

## 9. Exams, Tests and Assessments

Create a complete online assessment system.

Educators should be able to:

* Create an exam/test/assessment
* Add questions
* Set exam duration
* Assign the assessment to a class
* View submitted assessments
* View student results

Students should be able to:

* View available assessments
* Open an assessment
* See instructions
* Start the assessment
* Answer questions
* See a visible countdown timer
* Submit the assessment
* Receive/view results where appropriate

Design different question states such as:

* Unanswered
* Answered
* Current question
* Flagged/review question if appropriate

Include an exam submission confirmation screen.

The design should communicate that assessments are timed.

Include an anti-plagiarism/proctoring-related interface only as a simple assessment integrity indicator or warning. Do not add unrelated surveillance features.

## 10. Class-Based Chat

Create a class-based chat system.

Each class should have its own chat.

Students and educators belonging to the class can:

* Open the class chat
* View messages
* Send messages
* See message timestamps
* Identify the sender

Create:

* Class chat list
* Chat conversation screen
* Message composer
* Student/educator identification

Do not create a global public chat or social-media-style feed.

## 11. Dashboards

Create separate dashboards for:

### School Owner / Manager / Facilitator

Show:

* Students
* Educators
* Classes
* Resources
* Attendance
* Exams/assessments
* Class chats

### Educator

Show:

* Assigned classes
* Students
* Resources
* Attendance
* Exams/assessments
* Class chats

### Student

Show:

* My classes
* My resources
* My attendance
* Available exams/tests/assessments
* My results
* My class chats

Only show information that the particular role is authorized to access.

## 12. Navigation

Create a consistent responsive navigation system.

Desktop:

* Sidebar navigation
* Top header
* User profile/menu

Mobile:

* Compact header
* Bottom navigation or mobile menu
* Responsive cards and lists

Navigation should change according to the user's role.

## 13. Responsive Design

The entire design must be **mobile-first and responsive**.

Create designs for:

* Mobile phone
* Tablet
* Desktop

Make sure tables, forms, attendance lists, exams, resources, and chat remain usable on small screens.

## 14. Visual Design

Use a clean, modern educational technology style.

Design principles:

* Professional
* Simple
* Accessible
* Easy to navigate
* Not overly decorative
* Clear typography
* Strong visual hierarchy
* Clear buttons and form states
* Consistent spacing
* Accessible contrast
* Clear success, warning, error, present, and absent states

Use a consistent Shuleni design system containing:

* Colors
* Typography
* Buttons
* Inputs
* Cards
* Tables
* Navigation
* Modals
* Badges
* Alerts
* Empty states
* Loading states
* Error states

## 15. Important MVP Restriction

The design must contain ONLY functionality required to support the following six MVP requirements:

1. Multiple independent schools can be created and managed without their data colliding.
2. School owners/managers/facilitators can add students and educators, while educators have additional functionality.
3. Notes, books, and learning resources can be stored and accessed according to class permissions.
4. Educators can regularly take attendance and sign/confirm attendance records.
5. Students can take timed online exams, tests, and assessments with basic mechanisms supporting assessment integrity.
6. Students and educators can communicate through class-based chats.

Do NOT add:

* Payment systems
* School fees
* M-Pesa
* Subscriptions
* Online shopping
* Video conferencing
* Clubs
* Co-curricular activities
* School-wide quizzes
* Marketplace
* Transport management
* Library borrowing system
* Payroll
* Parent portal
* Cafeteria
* Accommodation
* Any other functionality not required by the MVP.

Create a complete clickable Figma prototype showing the main user flows from login → dashboard → classes → resources → attendance → exams/assessments → class chat, with role-appropriate screens and permissions.
