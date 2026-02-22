# FutureProof AI - System Architecture

## 1. Project Overview

FutureProof AI is an intelligent career development platform that combines AI-powered resume parsing with personalized learning roadmap generation. The system helps users:

- Parse and extract structured data from resumes using AI
- Generate personalized learning roadmaps based on skills and interests
- Track progress through learning paths with calendar integration
- Analyze skills and career trajectories

The platform addresses the challenge of career planning by automating resume analysis and creating actionable, time-bound learning plans tailored to individual skill levels and goals.

---

## 2. High-Level Architecture

The system follows a modern three-tier architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │  Pages   │  │ Features │  │  Shared/Context │  │
│  └──────────┘  └──────────┘  └─────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │ REST API (Axios)
                     │ HTTP/JSON
┌────────────────────▼────────────────────────────────┐
│              Backend (FastAPI)                      │
│  ┌──────────────┐         ┌──────────────────┐    │
│  │Resume Module │         │ Roadmap Module   │    │
│  │  - Parser    │         │  - Generator     │    │
│  │  - Routes    │         │  - AI Service    │    │
│  └──────────────┘         └──────────────────┘    │
│           │                        │               │
│           └────────┬───────────────┘               │
│                    │ Shared (Config, DB Client)    │
└────────────────────┼───────────────────────────────┘
                     │ Supabase Client
                     │ PostgreSQL + Auth
┌────────────────────▼────────────────────────────────┐
│              Supabase (Backend-as-a-Service)        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  PostgreSQL  │  │     Auth     │  │ Storage  │ │
│  │  + RLS       │  │  (JWT-based) │  │          │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────┘

External Services:
┌──────────────┐
│  Groq AI API │  ← AI/LLM for parsing & generation
└──────────────┘
```

Communication Pattern:
- Frontend ↔ Backend: RESTful API (JSON over HTTP)
- Backend ↔ Database: Supabase SDK (PostgreSQL with RLS)
- Backend ↔ AI: Groq API (LangChain integration)

---

## 3. Folder Structure

```
FutureProof-AI/
│
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── app/                # App-level config (routes, providers)
│   │   ├── features/           # Feature modules (auth, resume, roadmap, etc.)
│   │   ├── pages/              # Page components (Landing, Dashboard, etc.)
│   │   ├── components/         # Shared UI components (Header, Sidebar)
│   │   ├── context/            # React Context (AuthContext)
│   │   ├── lib/                # External integrations (api.js, supabase.js)
│   │   └── shared/             # Shared utilities, hooks, services
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # FastAPI application
│   └── src/
│       ├── main.py             # FastAPI app entry point
│       ├── modules/            # Feature modules (isolated)
│       │   ├── resume/         # Resume parsing module
│       │   │   ├── routes.py
│       │   │   ├── services/   # Business logic (parser_service.py)
│       │   │   ├── database.py
│       │   │   └── schemas.py
│       │   └── roadmap/        # Learning roadmap module
│       │       ├── routes.py
│       │       ├── services/   # AI roadmap generation
│       │       ├── database.py
│       │       └── schemas.py
│       ├── shared/             # Shared resources
│       │   ├── config/         # Settings (environment variables)
│       │   ├── database/       # Supabase client
│       │   ├── middleware/     # CORS, auth middleware
│       │   └── utils/          # Helper functions
│       └── requirements.txt
│
├── database/                    # Database migrations & setup
│   ├── migrations/
│   │   └── supabase-setup.sql  # Table creation, RLS policies
│   └── README.md
│
├── Prompts/                     # Architecture documentation
│   └── Architecture.md
│
└── run_project.bat             # Unified startup script
```

Responsibilities:
- `frontend/`: User interface, routing, state management, API calls
- `backend/`: Business logic, AI integration, data validation, API endpoints
- `database/`: Schema definitions, migrations, RLS policies
- `Prompts/`: Documentation and architecture guides

---

## 4. Component Architecture

### 4.1 Resume Module

Handles resume upload, parsing, and storage.

```
Resume Module Flow
──────────────────

┌──────────────────┐
│  POST /parse     │  ← File upload (multipart/form-data)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  routes.py       │  ← Endpoint handler
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ parser_service   │  ← AI extraction (Groq + LangChain)
│  - Extract text  │
│  - Parse with AI │
│  - Structure data│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  database.py     │  ← Store in Supabase
│  (ResumeDatabase)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Supabase DB     │
│  (resumes table) │
└──────────────────┘
```

Inputs: PDF/Image file, user_id (optional)
Outputs: Structured JSON (name, email, skills, experience, education)
Dependencies: Groq AI, PyMuPDF, Tesseract OCR, Supabase

### 4.2 Roadmap Module

Generates personalized learning paths based on interests and skills.

```
Roadmap Module Flow
───────────────────

┌──────────────────────┐
│ POST /suggest-       │  ← User interests + current skills
│      techstacks      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ roadmap_generator    │  ← AI suggestion engine
│  - Analyze interests │
│  - Match tech stacks │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ POST /generate       │  ← Selected tech stacks + duration
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ roadmap_generator    │  ← Generate day-by-day plan
│  - Create timeline   │
│  - Structure modules │
│  - Add resources     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  database.py         │  ← Store roadmap
│ (LearningRoadmapDB)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Supabase DB         │
│ (learning_roadmaps)  │
└──────────────────────┘
```

Inputs: User interests, skill level, tech stack selection, duration
Outputs: Structured roadmap (daily tasks, resources, milestones)
Dependencies: Groq AI, LangChain, DuckDuckGo Search, Supabase

---

## 5. Frontend Architecture

### Structure

```
Frontend Component Hierarchy
────────────────────────────

App.jsx (Root)
├── AuthProvider (Context)
│   └── BrowserRouter
│       └── Routes
│           ├── Landing (Public)
│           ├── Login (Public)
│           └── ProtectedRoute
│               ├── Dashboard
│               ├── ResumeUpload
│               ├── ResumeForm
│               ├── LearningRoadmap
│               └── SkillsAnalytics
```

### Key Patterns

Routing: React Router v6 with protected routes
State Management:
- Global: React Context (AuthContext for user session)
- Local: useState/useReducer in components
- Server State: Direct API calls (no caching layer)

API Communication:
- Axios instance configured in `lib/api.js`
- Base URL from environment variables
- Centralized error handling

Feature Modularization:
```
features/
├── auth/
│   ├── components/  (LoginForm, SignupForm)
│   ├── hooks/       (useAuth)
│   ├── services/    (authService.js)
│   └── pages/       (Login.jsx)
├── resume/
│   ├── components/  (ResumeUploader, ResumeEditor)
│   ├── services/    (resumeService.js)
│   └── pages/       (ResumeUpload.jsx, ResumeForm.jsx)
└── learning-roadmap/
    ├── components/  (RoadmapCard, ProgressTracker)
    ├── services/    (roadmapService.js)
    └── pages/       (LearningRoadmap.jsx)
```

Each feature is self-contained with its own components, hooks, and services.

---

## 6. Backend Architecture

### Request Lifecycle

```
HTTP Request Flow
─────────────────

1. Client Request
   │
   ▼
2. FastAPI App (main.py)
   │
   ▼
3. CORS Middleware
   │
   ▼
4. Router (resume/roadmap)
   │
   ▼
5. Route Handler (routes.py)
   │  - Validate request (Pydantic schemas)
   │  - Extract parameters
   │
   ▼
6. Service Layer (services/)
   │  - Business logic
   │  - AI processing
   │  - Data transformation
   │
   ▼
7. Database Layer (database.py)
   │  - Supabase operations
   │  - Query execution
   │
   ▼
8. Response
   │  - Serialize with Pydantic
   │  - Return JSON
   │
   ▼
9. Client receives response
```

### Layers

Controllers (routes.py):
- Define API endpoints
- Handle HTTP request/response
- Validate input with Pydantic schemas
- Call service layer

Services (services/):
- Core business logic
- AI/ML operations (Groq, LangChain)
- Data processing and transformation
- External API integration

Database (database.py):
- Supabase client wrapper
- CRUD operations
- Query building
- Error handling

Middleware:
- CORS: Allow frontend origins
- (Future: Auth middleware, rate limiting)

---

## 7. User Flow

### Resume Parsing Flow

```
User Journey: Resume Upload → Parse → Edit → Save
──────────────────────────────────────────────────

User                Frontend              Backend              Database
 │                     │                     │                     │
 │  1. Upload Resume   │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │  2. POST /parse     │                     │
 │                     ├────────────────────>│                     │
 │                     │                     │  3. Extract text    │
 │                     │                     │  4. AI parsing      │
 │                     │                     │                     │
 │                     │                     │  5. Store resume    │
 │                     │                     ├────────────────────>│
 │                     │                     │                     │
 │                     │  6. Return data     │                     │
 │                     │<────────────────────┤                     │
 │  7. Show form       │                     │                     │
 │<────────────────────┤                     │                     │
 │                     │                     │                     │
 │  8. Edit fields     │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │                     │                     │
 │  9. Save changes    │                     │                     │
 ├────────────────────>│  10. PUT /resume    │                     │
 │                     ├────────────────────>│  11. Update DB      │
 │                     │                     ├────────────────────>│
 │                     │  12. Success        │                     │
 │  13. Confirmation   │<────────────────────┤                     │
 │<────────────────────┤                     │                     │
```

### Learning Roadmap Flow

```
User Journey: Interests → Suggestions → Selection → Roadmap
───────────────────────────────────────────────────────────

User                Frontend              Backend              Database
 │                     │                     │                     │
 │  1. Enter interests │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │  2. POST /suggest   │                     │
 │                     ├────────────────────>│  3. AI analysis     │
 │                     │                     │  4. Generate options│
 │                     │  5. Tech stacks     │                     │
 │  6. View options    │<────────────────────┤                     │
 │<────────────────────┤                     │                     │
 │                     │                     │                     │
 │  7. Select stacks   │                     │                     │
 │  8. Set duration    │                     │                     │
 ├────────────────────>│  9. POST /generate  │                     │
 │                     ├────────────────────>│ 10. Create roadmap  │
 │                     │                     │ 11. Structure days  │
 │                     │                     │ 12. Add resources   │
 │                     │                     │                     │
 │                     │                     │ 13. Store roadmap   │
 │                     │                     ├────────────────────>│
 │                     │ 14. Roadmap data    │                     │
 │ 15. View roadmap    │<────────────────────┤                     │
 │<────────────────────┤                     │                     │
 │                     │                     │                     │
 │ 16. Track progress  │ 17. PATCH /progress │                     │
 ├────────────────────>├────────────────────>│ 18. Update progress │
 │                     │                     ├────────────────────>│
```

---

## 8. Data Flow

### Resume Data Flow

```
Resume Data Transformation Pipeline
────────────────────────────────────

PDF/Image File
     │
     ▼
[Text Extraction]
  - PyMuPDF (PDF)
  - Tesseract (Image)
     │
     ▼
Raw Text String
     │
     ▼
[AI Parsing - Groq]
  - LangChain prompt
  - Structured extraction
     │
     ▼
Structured JSON
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "skills": [...],
  "experience": [...],
  "education": [...]
}
     │
     ▼
[Validation - Pydantic]
     │
     ▼
[Storage - Supabase]
  - resumes table
  - JSONB column
     │
     ▼
[Retrieval]
     │
     ▼
Frontend Display
```

### Roadmap Data Flow

```
Roadmap Generation Pipeline
────────────────────────────

User Input
  - Interests
  - Current skills
  - Skill level
     │
     ▼
[AI Suggestion - Groq]
  - Analyze interests
  - Match tech stacks
     │
     ▼
Tech Stack Options
     │
     ▼
User Selection
  - Chosen stacks
  - Duration (days)
     │
     ▼
[AI Generation - Groq]
  - Day-by-day breakdown
  - Resource gathering
  - Milestone planning
     │
     ▼
Structured Roadmap
{
  "tech_stack": "...",
  "duration_days": 30,
  "days": [
    {
      "day": 1,
      "title": "...",
      "topics": [...],
      "resources": [...]
    }
  ]
}
     │
     ▼
[Storage - Supabase]
  - learning_roadmaps table
  - Progress tracking
     │
     ▼
[Progress Updates]
  - Mark days complete
  - Track milestones
     │
     ▼
Frontend Display
  - Calendar view
  - Progress charts
```

---

## 9. API Communication Model

### Request Lifecycle

```
API Request Pattern
───────────────────

Client                          Server
  │                               │
  │  1. HTTP Request              │
  │     - Method (GET/POST/etc)   │
  │     - Headers (Content-Type)  │
  │     - Body (JSON/FormData)    │
  ├──────────────────────────────>│
  │                               │
  │                          2. Validation
  │                             - Pydantic schemas
  │                             - Type checking
  │                               │
  │                          3. Processing
  │                             - Business logic
  │                             - AI operations
  │                             - Database queries
  │                               │
  │                          4. Response Building
  │                             - Serialize data
  │                             - Add metadata
  │                               │
  │  5. HTTP Response             │
  │     - Status code             │
  │     - JSON body               │
  │<──────────────────────────────┤
  │                               │
```

### Validation

Input validation using Pydantic models:
```python
class ResumeParseResponse(BaseModel):
    success: bool
    data: Dict[str, Any]
    candidate_id: str
```

### Error Handling

```
Error Response Structure
────────────────────────

{
  "detail": "Error message",
  "status_code": 400/404/500
}
```

HTTP Status Codes:
- 200: Success
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Internal Server Error

### Response Structure

Success Response:
```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

## 10. Configuration & Environment

### Environment Variables

Frontend (.env):
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_API_URL=http://localhost:8000
```

Backend (.env):
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJxxx...  (service_role key)
GROQ_API_KEY=gsk_xxx...
API_PORT=8000
API_HOST=0.0.0.0
```

### Configuration Management

Backend uses Pydantic Settings:
- Type-safe configuration
- Environment variable loading
- Default values
- Validation on startup

```python
class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    GROQ_API_KEY: str
    API_PORT: int = 8000
    CORS_ORIGINS: List[str] = [...]
```

### Runtime Setup

1. Frontend: Vite loads env vars prefixed with `VITE_`
2. Backend: Pydantic loads from `.env` file
3. Database: Migrations run manually in Supabase SQL Editor

---

## 11. Scalability & Modularity Design

### Module Isolation

Each feature module is self-contained:
```
modules/resume/
├── routes.py       # API endpoints
├── services/       # Business logic
├── database.py     # Data access
└── schemas.py      # Data models
```

Benefits:
- Independent development
- Easy testing
- Clear boundaries
- Reusable components

### Adding New Features

To add a new module (e.g., "analytics"):

1. Create module structure:
```
modules/analytics/
├── routes.py
├── services/
├── database.py
└── schemas.py
```

2. Register in main.py:
```python
from modules.analytics.routes import router as analytics_router
app.include_router(analytics_router, prefix="/api/analytics", tags=["Analytics"])
```

3. No changes needed to existing modules

### Extensibility Strategy

Shared Resources:
- Database client: Single Supabase instance
- Configuration: Centralized settings
- Middleware: Applied globally
- Utilities: Reusable helpers

Frontend Features:
- Feature-based folder structure
- Shared components in `shared/`
- Reusable hooks in `shared/hooks/`
- Centralized API client

Database:
- JSONB columns for flexible schema
- RLS policies for security
- Indexes for performance
- Triggers for automation

### Horizontal Scaling

Current architecture supports:
- Stateless backend (multiple instances)
- Database connection pooling
- CDN for frontend assets
- Caching layer (future: Redis)

---

## 12. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Framework | React 18 | UI component library |
| Frontend Build | Vite | Fast development & bundling |
| Frontend Routing | React Router v6 | Client-side navigation |
| Frontend Styling | Tailwind CSS | Utility-first CSS framework |
| Frontend HTTP | Axios | API communication |
| Frontend Icons | Lucide React | Icon library |
| Frontend Notifications | React Hot Toast | Toast notifications |
| Backend Framework | FastAPI | High-performance Python API |
| Backend Server | Uvicorn | ASGI server |
| Backend Validation | Pydantic | Data validation & serialization |
| AI/LLM | Groq | Fast LLM inference |
| AI Framework | LangChain | LLM orchestration |
| AI Search | DuckDuckGo Search | Resource gathering |
| Database | Supabase (PostgreSQL) | Managed database + auth |
| Authentication | Supabase Auth | JWT-based auth |
| File Processing | PyMuPDF | PDF text extraction |
| OCR | Tesseract | Image text extraction |
| Image Processing | Pillow | Image manipulation |
| Environment | Python-dotenv | Environment variables |
| HTTP Client (Backend) | HTTPX | Async HTTP requests |

---

## 13. Future Improvements

### Performance
- Implement Redis caching for AI responses
- Add database query optimization and indexing
- Implement lazy loading for frontend components
- Add CDN for static assets

### Features
- Real-time collaboration on roadmaps
- Integration with job boards for skill matching
- Gamification (badges, streaks, leaderboards)
- Mobile app (React Native)
- Export roadmaps to PDF/Calendar (iCal)

### Architecture
- Implement event-driven architecture (message queue)
- Add WebSocket support for real-time updates
- Microservices split for heavy AI workloads
- Implement API rate limiting and throttling
- Add comprehensive logging and monitoring (Sentry, DataDog)

### Security
- Implement API key rotation
- Add request signing for sensitive operations
- Implement RBAC (Role-Based Access Control)
- Add audit logging for compliance

### DevOps
- CI/CD pipeline (GitHub Actions)
- Docker containerization
- Kubernetes orchestration
- Automated testing (unit, integration, e2e)
- Infrastructure as Code (Terraform)

---

## Appendix: Key Design Decisions

### Why Unified Backend?
Single FastAPI app instead of separate services reduces operational complexity while maintaining module isolation through clear folder structure.

### Why Supabase?
Provides PostgreSQL, authentication, and real-time subscriptions in one platform, reducing infrastructure management overhead.

### Why Groq?
Extremely fast LLM inference (up to 10x faster than alternatives) critical for responsive user experience in resume parsing and roadmap generation.

### Why Feature-Based Frontend Structure?
Organizes code by feature rather than technical layer, making it easier to locate and modify related code.

### Why JSONB for Resume Data?
Flexible schema allows storing varied resume formats without rigid table structure, while still supporting querying and indexing.

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-22  
**Maintained By:** Development Team
