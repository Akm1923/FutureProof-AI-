# System Memory - FutureProof AI

## System Purpose
AI-powered career development platform combining resume parsing with personalized learning roadmap generation.

Core capabilities:
- Parse resumes (PDF/Image) → Extract structured data
- Generate learning roadmaps → Personalized tech stack paths
- Track progress → Calendar integration + milestone tracking
- Skills analytics → Career trajectory analysis

---

## Architecture Overview

### Three-Tier Structure

```
Frontend (React + Vite)
    ↕ REST API (JSON/HTTP)
Backend (FastAPI)
    ↕ Supabase SDK
Database (Supabase PostgreSQL + Auth)
```

### External Services
- **Groq AI**: LLM inference (resume parsing, roadmap generation)
- **LangChain**: AI orchestration framework
- **DuckDuckGo Search**: Resource gathering for roadmaps

---

## Major Modules

### Backend Modules (FastAPI)

**Location:** `backend/src/modules/`

1. **Resume Module** (`modules/resume/`)
   - Parse uploaded resumes (PDF/Image)
   - Extract: name, email, phone, skills, experience, education
   - Store in Supabase (resumes table)
   - API Prefix: `/api/resume`

2. **Roadmap Module** (`modules/roadmap/`)
   - Suggest tech stacks based on interests
   - Generate day-by-day learning plans
   - Track progress and milestones
   - API Prefix: `/api/roadmap`

**Shared Resources:** `backend/src/shared/`
- Config: Environment variables (Pydantic Settings)
- Database: Supabase client singleton
- Middleware: CORS configuration
- Utils: Helper functions

### Frontend Features (React)

**Location:** `frontend/src/features/`

1. **Auth** (`features/auth/`)
   - Supabase authentication (JWT)
   - Login/Signup flows
   - Protected route wrapper

2. **Resume** (`features/resume/`)
   - File upload (drag & drop)
   - Resume form editor
   - Display parsed data

3. **Learning Roadmap** (`features/learning-roadmap/`)
   - Tech stack selection
   - Roadmap visualization
   - Progress tracking

4. **Dashboard** (`features/dashboard/`)
   - User overview
   - Quick actions
   - Recent activity

5. **Skills Analytics** (`features/skills-analytics/`)
   - Skill visualization
   - Career insights

**Shared Resources:** `frontend/src/shared/`
- Components: Reusable UI elements
- Hooks: Custom React hooks
- Services: API communication layer
- Utils: Helper functions

---

## Communication Model

### Frontend ↔ Backend

**Protocol:** REST API (HTTP/JSON)
**Client:** Axios (configured in `frontend/src/lib/api.js`)
**Base URL:** Environment variable `VITE_API_URL`

Request Flow:
```
Frontend Component
    → API Service (lib/api.js)
    → Axios HTTP Request
    → Backend Route Handler
    → Service Layer
    → Database Layer
    → Response (JSON)
    → Frontend State Update
```

### Backend ↔ Database

**Protocol:** Supabase SDK (PostgreSQL client)
**Authentication:** Service role key (full access)
**Security:** Row Level Security (RLS) policies

Tables:
- `resumes`: User resume data (JSONB)
- `learning_roadmaps`: Generated roadmaps (JSONB)
- `auth.users`: Supabase managed auth

### Backend ↔ AI Services

**Groq API:**
- Model: Fast LLM inference
- Use cases: Resume parsing, roadmap generation
- Integration: LangChain framework

**DuckDuckGo Search:**
- Use case: Resource gathering for learning materials
- Integration: Python library

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI framework + build tool |
| Frontend Routing | React Router v6 | Client-side navigation |
| Frontend Styling | Tailwind CSS | Utility-first CSS |
| Frontend HTTP | Axios | API communication |
| Backend | FastAPI + Uvicorn | Python API framework |
| Backend Validation | Pydantic | Data validation |
| AI/LLM | Groq + LangChain | AI processing |
| Database | Supabase (PostgreSQL) | Managed database + auth |
| File Processing | PyMuPDF + Tesseract | PDF/Image text extraction |

---

## Module Structure Pattern

### Backend Module
```
modules/<feature>/
├── routes.py       # API endpoints
├── services/       # Business logic
├── database.py     # Data access layer
└── schemas.py      # Pydantic models
```

### Frontend Feature
```
features/<feature>/
├── components/     # UI components
├── hooks/          # Custom hooks
├── services/       # API calls
└── pages/          # Page components
```

---

## Key Design Decisions

1. **Unified Backend**: Single FastAPI app with modular structure (not microservices)
2. **Feature-Based Frontend**: Organized by feature, not technical layer
3. **JSONB Storage**: Flexible schema for resume/roadmap data
4. **Supabase**: All-in-one backend (DB + Auth + Storage)
5. **Groq**: Fast LLM inference for responsive UX

---

## Environment Configuration

### Frontend (.env)
```
VITE_SUPABASE_URL=<supabase_project_url>
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
SUPABASE_URL=<supabase_project_url>
SUPABASE_KEY=<service_role_key>
GROQ_API_KEY=<groq_api_key>
API_PORT=8000
API_HOST=0.0.0.0
```

---

## Folder Structure (High-Level)

```
FutureProof-AI/
├── frontend/           # React application
│   └── src/
│       ├── features/   # Feature modules
│       ├── pages/      # Page components
│       ├── lib/        # External integrations
│       └── shared/     # Shared resources
├── backend/            # FastAPI application
│   └── src/
│       ├── main.py     # App entry point
│       ├── modules/    # Feature modules
│       └── shared/     # Shared resources
├── database/           # SQL migrations
└── docs/               # Documentation
    └── ai-context/     # AI memory system
```

---

## Adding New Features

### Backend Module
1. Create: `backend/src/modules/<feature>/`
2. Add: routes.py, services/, database.py, schemas.py
3. Register in `main.py`: `app.include_router(router, prefix="/api/<feature>")`

### Frontend Feature
1. Create: `frontend/src/features/<feature>/`
2. Add: components/, hooks/, services/, pages/
3. Add routes in `App.jsx`
4. Create feature doc: `docs/ai-context/features/<feature>.md`
5. Register in: `docs/ai-context/03_feature_registry.md`

---

## Version Info
- Document Version: 1.0
- Last Updated: 2026-02-22
- Architecture Source: ARCHITECTURE.md
