def response(description):
    return {"description": description}


def get_tag(summary):
    mapping = [
        ("chat", "Chat"),
        ("message", "Chat"),
        ("user", "Users"),
        ("educator", "Users"),
        ("attendance", "Attendance"),
        ("resource", "Resources"),
        ("exam", "Exams"),
        ("dashboard", "School"),
        ("health", "System"),
        ("class", "Classes"),
    ]

    summary_lower = summary.lower()

    for keyword, tag in mapping:
        if keyword in summary_lower:
            return tag

    return "System"


def auth_operation(summary, description, parameters=None, responses=None):
    operation = {
        "summary": summary,
        "description": description,
        "tags": [get_tag(summary)],
        "responses": responses or {"200": response("Success")},
    }

    if parameters:
        operation["parameters"] = parameters

    return operation


def protected(summary, description, parameters=None, responses=None):
    operation = auth_operation(
        summary,
        description,
        parameters,
        responses,
    )
    operation["security"] = [{"BearerAuth": []}]
    return operation


def path_param(name, description):
    return {
        "name": name,
        "in": "path",
        "required": True,
        "type": "string",
        "description": description,
    }


def query_param(name, description, required=False):
    return {
        "name": name,
        "in": "query",
        "required": required,
        "type": "string",
        "description": description,
    }


def json_body(example, required_fields=None):
    return {
        "name": "body",
        "in": "body",
        "required": True,
        "schema": {
            "type": "object",
            "required": required_fields or [],
            "example": example,
        },
    }


SWAGGER_TEMPLATE = {
    "swagger": "2.0",
    "info": {
        "title": "Shuleni School Management API",
        "description": (
            "Backend API for the Shuleni School Management System. "
            "Use the Authentication endpoints to obtain a JWT token, "
            "then click Authorize and enter: Bearer YOUR_TOKEN"
        ),
        "version": "1.0.0",
    },
    "basePath": "/",
    "schemes": ["http"],
    "securityDefinitions": {
        "BearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": (
                "JWT authorization. Enter exactly: "
                "Bearer YOUR_ACCESS_TOKEN"
            ),
        }
    },
    "paths": {

        "/api/classes": {
            "get": protected(
                "List classes",
                "Returns classes in the authenticated user's school. "
                "Students only see classes they belong to.",
                responses={
                    "200": response("Classes returned successfully"),
                    "401": response("Missing or invalid JWT token"),
                },
            ),
            "post": protected(
                "Create a class",
                "ADMIN only. Creates a new class in the authenticated school.",
                [
                    json_body(
                        {"name": "Form 1A"},
                        ["name"],
                    )
                ],
                {
                    "201": response("Class created successfully"),
                    "400": response("Class name is required"),
                    "401": response("Missing or invalid JWT token"),
                    "403": response("Admin role required"),
                },
            ),
        },

        "/api/classes/{class_id}": {
            "get": protected(
                "Get class details",
                "Returns class details, students, resources and exams.",
                [
                    path_param(
                        "class_id",
                        "ID of the class",
                    )
                ],
                {
                    "200": response("Class returned successfully"),
                    "403": response("Not a member of this class"),
                    "404": response("Class not found"),
                },
            ),
        },

        "/api/users": {
            "get": protected(
                "List users",
                "ADMIN and EDUCATOR only. Optionally filter by role.",
                [
                    query_param(
                        "role",
                        "Optional role filter: STUDENT or EDUCATOR",
                    )
                ],
                {
                    "200": response("Users returned successfully"),
                    "403": response("Admin or educator role required"),
                },
            ),
            "post": protected(
                "Create a student or educator",
                "ADMIN only. Adds a new STUDENT or EDUCATOR.",
                [
                    json_body(
                        {
                            "name": "Jane Doe",
                            "email": "jane.doe@educator.shuleni-academy.com",
                            "password": "password123",
                            "role": "EDUCATOR",
                            "classId": "CLASS_ID_FOR_STUDENT",
                        },
                        ["name", "email", "password", "role"],
                    )
                ],
                {
                    "201": response("User created successfully"),
                    "400": response("Invalid or missing fields"),
                    "403": response("Admin role required"),
                    "409": response("User already exists"),
                },
            ),
        },

        "/api/users/{user_id}": {
            "get": protected(
                "Get a user",
                "ADMIN and EDUCATOR only.",
                [
                    path_param(
                        "user_id",
                        "ID of the user",
                    )
                ],
                {
                    "200": response("User returned successfully"),
                    "404": response("User not found"),
                },
            ),
            "patch": protected(
                "Update a user",
                "ADMIN only. Can update a user's name or a student's class.",
                [
                    path_param(
                        "user_id",
                        "ID of the user",
                    ),
                    json_body(
                        {
                            "name": "Updated Name",
                            "classId": "NEW_CLASS_ID",
                        }
                    ),
                ],
                {
                    "200": response("User updated successfully"),
                    "404": response("User not found"),
                },
            ),
        },

        "/api/users/{user_id}/assign-class": {
            "post": protected(
                "Assign educator to a class",
                "ADMIN only. Assigns an EDUCATOR to a class.",
                [
                    path_param(
                        "user_id",
                        "ID of the educator",
                    ),
                    json_body(
                        {"classId": "CLASS_ID"},
                        ["classId"],
                    ),
                ],
                {
                    "200": response("Educator assigned successfully"),
                    "400": response("classId is required"),
                    "404": response("Educator or class not found"),
                },
            ),
        },

        "/api/resources": {
            "get": protected(
                "List learning resources",
                "Returns resources. Can be filtered by class, category or search text.",
                [
                    query_param("classId", "Optional class ID"),
                    query_param("category", "Optional resource category"),
                    query_param("q", "Optional search text"),
                ],
                {
                    "200": response("Resources returned successfully"),
                    "403": response("Student is not a member of the class"),
                },
            ),
            "post": protected(
                "Upload a learning resource",
                "ADMIN and EDUCATOR only. Uploads a note, book or document.",
                [
                    {
                        "name": "title",
                        "in": "formData",
                        "required": True,
                        "type": "string",
                        "example": "Mathematics Notes",
                    },
                    {
                        "name": "category",
                        "in": "formData",
                        "required": True,
                        "type": "string",
                        "example": "Notes",
                    },
                    {
                        "name": "description",
                        "in": "formData",
                        "required": False,
                        "type": "string",
                        "example": "Introduction to algebra",
                    },
                    {
                        "name": "classId",
                        "in": "formData",
                        "required": True,
                        "type": "string",
                        "description": "ID of the class",
                    },
                    {
                        "name": "file",
                        "in": "formData",
                        "required": True,
                        "type": "file",
                        "description": "File to upload",
                    },
                ],
                {
                    "201": response("Resource uploaded successfully"),
                    "400": response("Missing required form fields"),
                    "403": response("Admin or educator role required"),
                    "404": response("Class not found"),
                },
            ),
        },

        "/api/resources/{resource_id}": {
            "get": protected(
                "Get a learning resource",
                "Returns one resource by ID.",
                [
                    path_param(
                        "resource_id",
                        "ID of the resource",
                    )
                ],
                {
                    "200": response("Resource returned successfully"),
                    "403": response("Not a member of this class"),
                    "404": response("Resource not found"),
                },
            ),
        },

        "/api/attendance": {
            "get": protected(
                "Get attendance history",
                "ADMIN and EDUCATOR only. Returns attendance sessions for a class.",
                [
                    query_param(
                        "classId",
                        "ID of the class",
                        True,
                    )
                ],
                {
                    "200": response("Attendance history returned"),
                    "400": response("classId is required"),
                },
            ),
            "post": protected(
                "Take attendance",
                "ADMIN and EDUCATOR only. Creates or updates attendance "
                "for a class and date.",
                [
                    json_body(
                        {
                            "classId": "CLASS_ID",
                            "date": "2026-08-28",
                            "records": [
                                {
                                    "studentId": "STUDENT_ID",
                                    "status": "PRESENT",
                                }
                            ],
                        },
                        ["classId", "date", "records"],
                    )
                ],
                {
                    "201": response("Attendance recorded successfully"),
                    "400": response("Missing or invalid attendance data"),
                    "404": response("Class not found"),
                },
            ),
        },

        "/api/attendance/me": {
            "get": protected(
                "Get my attendance",
                "STUDENT only. Returns the authenticated student's attendance records.",
                responses={
                    "200": response("Student attendance returned"),
                    "403": response("Student role required"),
                },
            ),
        },

        "/api/exams": {
            "get": protected(
                "List exams",
                "Returns exams for a class. Students only see exams "
                "for classes they belong to.",
                [
                    query_param(
                        "classId",
                        "ID of the class",
                        True,
                    )
                ],
                {
                    "200": response("Exams returned successfully"),
                    "400": response("classId is required"),
                    "403": response("Not a member of this class"),
                },
            ),
            "post": protected(
                "Create an exam",
                "ADMIN and EDUCATOR only. Creates an exam with questions.",
                [
                    json_body(
                        {
                            "classId": "CLASS_ID",
                            "title": "Mathematics Test",
                            "instructions": "Answer all questions.",
                            "durationMins": 30,
                            "questions": [
                                {
                                    "type": "MCQ",
                                    "prompt": "What is 2 + 2?",
                                    "options": ["3", "4", "5"],
                                    "answer": "4",
                                    "points": 1,
                                }
                            ],
                        },
                        [
                            "classId",
                            "title",
                            "durationMins",
                            "questions",
                        ],
                    )
                ],
                {
                    "201": response("Exam created successfully"),
                    "400": response("Invalid or missing exam data"),
                    "404": response("Class not found"),
                },
            ),
        },

        "/api/exams/{exam_id}/start": {
            "get": protected(
                "Start an exam",
                "STUDENT only. Starts the exam timer and returns questions "
                "without correct answers.",
                [
                    path_param(
                        "exam_id",
                        "ID of the exam",
                    )
                ],
                {
                    "200": response("Exam started successfully"),
                    "403": response("Student is not a member of this class"),
                    "404": response("Exam not found"),
                    "409": response("Exam already submitted"),
                },
            ),
        },

        "/api/exams/{exam_id}/submit": {
            "post": protected(
                "Submit exam answers",
                "STUDENT only. MCQ answers are automatically graded.",
                [
                    path_param(
                        "exam_id",
                        "ID of the exam",
                    ),
                    json_body(
                        {
                            "answers": {
                                "QUESTION_ID": "4"
                            }
                        },
                        ["answers"],
                    ),
                ],
                {
                    "200": response("Exam submitted successfully"),
                    "400": response("Exam was not started or answers missing"),
                    "404": response("Exam not found"),
                    "409": response("Exam already submitted"),
                    "410": response("Exam time is up"),
                },
            ),
        },

        "/api/exams/{exam_id}/results": {
            "get": protected(
                "Get exam results",
                "ADMIN and EDUCATOR only. Returns submissions for an exam.",
                [
                    path_param(
                        "exam_id",
                        "ID of the exam",
                    )
                ],
                {
                    "200": response("Exam results returned"),
                    "404": response("Exam not found"),
                },
            ),
        },

        "/api/exams/results/me": {
            "get": protected(
                "Get my exam results",
                "STUDENT only. Returns the authenticated student's submitted exam results.",
                responses={
                    "200": response("Student results returned"),
                    "403": response("Student role required"),
                },
            ),
        },

        "/api/chat/{class_id}/messages": {
            "get": protected(
                "Get class chat messages",
                "Returns up to 200 messages. The optional after parameter "
                "returns only newer messages.",
                [
                    path_param(
                        "class_id",
                        "ID of the class",
                    ),
                    query_param(
                        "after",
                        "Optional ISO timestamp",
                    ),
                ],
                {
                    "200": response("Messages returned successfully"),
                    "403": response("Not a member of this class"),
                },
            ),
            "post": protected(
                "Send a class chat message",
                "Sends a message to the class chat.",
                [
                    path_param(
                        "class_id",
                        "ID of the class",
                    ),
                    json_body(
                        {"body": "Hello class!"},
                        ["body"],
                    ),
                ],
                {
                    "201": response("Message created successfully"),
                    "400": response("Message body is required"),
                    "403": response("Not a member of this class"),
                },
            ),
        },

        "/api/school/dashboard": {
            "get": protected(
                "Get school dashboard data",
                "Returns student, educator and class counts plus recent "
                "attendance, exams and resources.",
                responses={
                    "200": response("Dashboard data returned successfully"),
                    "401": response("Missing or invalid JWT token"),
                },
            ),
        },

        "/api/health": {
            "get": auth_operation(
                "Health check",
                "Checks whether the backend is running.",
                responses={
                    "200": response("Backend is healthy"),
                },
            ),
        },
    },
}
