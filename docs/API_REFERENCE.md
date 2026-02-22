# FutureProof AI - API Reference

Complete API documentation for backend endpoints.

**Base URL:** `http://localhost:8000`  
**API Docs:** http://localhost:8000/docs (Swagger UI)

---

## Authentication

All endpoints except `/` and `/health` require authentication via Supabase JWT.

**Header:**
```
Authorization: Bearer <supabase_jwt_token>
```

---

## Resume Module

Base path: `/api/resume`

### Parse Resume

Parse uploaded resume file and extract structured data.

**Endpoint:** `POST /api/resume/parse`

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `file` (required): Resume file (PDF or Image)
  - `user_id` (optional): User ID for storage

**Example (cURL):**
```bash
curl -X POST http://localhost:8000/api/resume/parse \
  -F "file=@resume.pdf" \
  -F "user_id=user-123"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "skills": ["Python", "JavaScript", "React"],
    "experience": [
      {
        "company": "Tech Corp",
        "position": "Software Engineer",
        "duration": "2020-2023",
        "description": "Developed web applications..."
      }
    ],
    "education": [
      {
        "institution": "University Name",
        "degree": "Bachelor of Science",
        "field": "Computer Science",
        "year": "2020"
      }
    ]
  },
  "candidate_id": "uuid-here"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid file format
- `500 Internal Server Error`: Parsing failed

---

### Get Resume

Retrieve stored resume by candidate ID.

**Endpoint:** `GET /api/resume/{candidate_id}`

**Parameters:**
- `candidate_id` (path): UUID of the resume

**Example:**
```bash
curl http://localhost:8000/api/resume/abc-123-def
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "abc-123-def",
    "user_id": "user-123",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      ...
    },
    "created_at": "2026-02-22T10:00:00Z",
    "updated_at": "2026-02-22T10:00:00Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Resume not found

---

### Update Resume

Update existing resume data.

**Endpoint:** `PUT /api/resume/{candidate_id}`

**Parameters:**
- `candidate_id` (path): UUID of the resume

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "newemail@example.com",
  "skills": ["Python", "JavaScript", "React", "Node.js"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "abc-123-def",
    "updated_at": "2026-02-22T11:00:00Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Resume not found
- `500 Internal Server Error`: Update failed

---

## Roadmap Module

Base path: `/api/roadmap`

### Suggest Tech Stacks

Get AI-generated tech stack suggestions based on user interests.

**Endpoint:** `POST /api/roadmap/suggest-techstacks`

**Request Body:**
```json
{
  "interests": "web development, frontend, user interfaces",
  "user_skills": ["HTML", "CSS", "JavaScript"]
}
```

**Response (200 OK):**
```json
{
  "techstacks": [
    {
      "name": "React Ecosystem",
      "description": "Modern frontend framework with component-based architecture",
      "technologies": ["React", "Redux", "React Router", "Styled Components"],
      "difficulty": "Intermediate",
      "time_estimate": "30-45 days"
    },
    {
      "name": "Vue.js Stack",
      "description": "Progressive framework for building user interfaces",
      "technologies": ["Vue.js", "Vuex", "Vue Router", "Nuxt.js"],
      "difficulty": "Beginner-Intermediate",
      "time_estimate": "25-35 days"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input
- `500 Internal Server Error`: AI generation failed

---

### Generate Roadmap

Generate detailed learning roadmap for selected tech stacks.

**Endpoint:** `POST /api/roadmap/generate`

**Request Body:**
```json
{
  "user_id": "user-123",
  "user_skills": ["HTML", "CSS", "JavaScript"],
  "selections": [
    {
      "tech_stack": "React Ecosystem",
      "duration_days": 30,
      "skill_level": "beginner"
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "roadmap_id": "roadmap-uuid",
  "roadmaps": [
    {
      "tech_stack": "React Ecosystem",
      "duration_days": 30,
      "skill_level": "beginner",
      "days": [
        {
          "day": 1,
          "title": "Introduction to React",
          "topics": [
            "What is React?",
            "JSX Syntax",
            "Components Basics"
          ],
          "resources": [
            {
              "title": "React Official Docs",
              "url": "https://react.dev",
              "type": "documentation"
            }
          ],
          "tasks": [
            "Read React introduction",
            "Create first component",
            "Build simple counter app"
          ],
          "estimated_hours": 4
        }
      ],
      "milestones": [
        {
          "day": 7,
          "title": "Complete React Basics",
          "description": "Understand components, props, and state"
        }
      ]
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input
- `500 Internal Server Error`: Generation failed

---

### Get User Roadmap

Retrieve user's learning roadmap.

**Endpoint:** `GET /api/roadmap/{user_id}`

**Parameters:**
- `user_id` (path): User ID

**Response (200 OK):**
```json
{
  "id": "roadmap-uuid",
  "user_id": "user-123",
  "roadmaps": [...],
  "progress": {
    "React Ecosystem": {
      "completed_days": [1, 2, 3],
      "total_days": 30,
      "percentage": 10
    }
  },
  "is_active": true,
  "created_at": "2026-02-22T10:00:00Z"
}
```

**Error Responses:**
- `404 Not Found`: Roadmap not found

---

### Update Progress

Mark a day as completed in the roadmap.

**Endpoint:** `PATCH /api/roadmap/{roadmap_id}/progress`

**Parameters:**
- `roadmap_id` (path): Roadmap UUID

**Request Body:**
```json
{
  "tech_stack": "React Ecosystem",
  "day": 1,
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Progress updated"
}
```

**Error Responses:**
- `404 Not Found`: Roadmap not found
- `500 Internal Server Error`: Update failed

---

### Get Active Roadmap

Get user's currently active roadmap.

**Endpoint:** `GET /api/roadmap/active/{user_id}`

**Parameters:**
- `user_id` (path): User ID

**Response (200 OK):**
```json
{
  "active": true,
  "roadmap": {
    "id": "roadmap-uuid",
    "roadmaps": [...],
    "progress": {...}
  }
}
```

**Response (No Active Roadmap):**
```json
{
  "active": false,
  "roadmap": null
}
```

---

### Get Calendar Events

Get calendar events for user's learning roadmaps.

**Endpoint:** `GET /api/roadmap/calendar/{user_id}`

**Parameters:**
- `user_id` (path): User ID
- `month` (query, optional): Month (1-12)
- `year` (query, optional): Year (e.g., 2026)

**Example:**
```bash
curl http://localhost:8000/api/roadmap/calendar/user-123?month=2&year=2026
```

**Response (200 OK):**
```json
{
  "events": [
    {
      "date": "2026-02-22",
      "tech_stack": "React Ecosystem",
      "day": 1,
      "title": "Introduction to React",
      "completed": false
    }
  ],
  "month": 2,
  "year": 2026
}
```

---

### Delete Roadmap

Delete a learning roadmap.

**Endpoint:** `DELETE /api/roadmap/{roadmap_id}`

**Parameters:**
- `roadmap_id` (path): Roadmap UUID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Roadmap deleted successfully"
}
```

**Error Responses:**
- `404 Not Found`: Roadmap not found
- `500 Internal Server Error`: Deletion failed

---

## Health & Status

### Root Endpoint

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "FutureProof AI API",
  "version": "2.0.0",
  "docs": "/docs",
  "status": "running"
}
```

---

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "version": "2.0.0"
}
```

---

## Error Response Format

All errors follow this structure:

```json
{
  "detail": "Error message describing what went wrong"
}
```

**HTTP Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid input/validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

---

## Rate Limits

Currently no rate limits enforced.

**Future:** Rate limiting will be added based on:
- User tier (free/paid)
- Endpoint type (AI-heavy vs simple CRUD)

---

## Data Models

### Resume Data Structure
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "year": "string"
    }
  ]
}
```

### Roadmap Data Structure
```json
{
  "tech_stack": "string",
  "duration_days": "number",
  "skill_level": "beginner|intermediate|advanced",
  "days": [
    {
      "day": "number",
      "title": "string",
      "topics": ["string"],
      "resources": [
        {
          "title": "string",
          "url": "string",
          "type": "documentation|video|article|course"
        }
      ],
      "tasks": ["string"],
      "estimated_hours": "number"
    }
  ],
  "milestones": [
    {
      "day": "number",
      "title": "string",
      "description": "string"
    }
  ]
}
```

---

## Testing with Swagger UI

Visit http://localhost:8000/docs for interactive API testing:

1. Click on any endpoint
2. Click "Try it out"
3. Fill in parameters
4. Click "Execute"
5. View response

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-22  
**API Version:** 2.0.0
