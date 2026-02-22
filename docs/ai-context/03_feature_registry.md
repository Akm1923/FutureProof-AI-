# Feature Registry - FutureProof AI

## Purpose
Central registry of all features in the system.
Maps feature names to their documentation files.

---

## Registry Format

```
<feature_name>: <status> | <doc_path> | <backend_module> | <frontend_feature>
```

**Status:**
- `DOCUMENTED`: Feature doc exists and is up-to-date
- `LAZY_LOAD`: Feature exists but doc not yet created
- `PLANNED`: Feature planned but not implemented

---

## Backend Features

### Resume Module
**Status:** DOCUMENTED ✅
**Doc:** `features/resume.md`
**Backend:** `backend/src/modules/resume/`
**Frontend:** `frontend/src/features/resume/`
**API Prefix:** `/api/resume`
**Description:** Resume parsing and management

**Endpoints:**
- POST /api/resume/parse
- GET /api/resume/{candidate_id}
- PUT /api/resume/{candidate_id}

---

### Roadmap Module
**Status:** DOCUMENTED ✅
**Doc:** `features/roadmap.md`
**Backend:** `backend/src/modules/roadmap/`
**Frontend:** `frontend/src/features/learning-roadmap/`
**API Prefix:** `/api/roadmap`
**Description:** Learning roadmap generation and tracking

**Endpoints:**
- POST /api/roadmap/suggest-techstacks
- POST /api/roadmap/generate
- GET /api/roadmap/{user_id}
- PATCH /api/roadmap/{roadmap_id}/progress
- GET /api/roadmap/active/{user_id}
- GET /api/roadmap/calendar/{user_id}
- DELETE /api/roadmap/{roadmap_id}

---

## Frontend Features

### Auth
**Status:** DOCUMENTED ✅
**Doc:** `features/auth.md`
**Backend:** Supabase Auth (external)
**Frontend:** `frontend/src/features/auth/`
**Description:** User authentication and authorization

**Pages:**
- /login
- /signup (if exists)

---

### Dashboard
**Status:** DOCUMENTED ✅
**Doc:** `features/dashboard.md`
**Backend:** Multiple modules
**Frontend:** `frontend/src/features/dashboard/`
**Description:** User dashboard and overview

**Pages:**
- /dashboard

---

### Skills Analytics
**Status:** DOCUMENTED ✅ (Partial Implementation)
**Doc:** `features/skills-analytics.md`
**Backend:** TBD
**Frontend:** `frontend/src/features/skills-analytics/`
**Description:** Skills visualization and analytics

**Pages:**
- /skills-analytics

---

## Shared Components

### Frontend Shared
**Location:** `frontend/src/shared/`
**Components:**
- Header
- Sidebar
- Calendar
- Common UI elements

### Backend Shared
**Location:** `backend/src/shared/`
**Modules:**
- Config (settings.py)
- Database (supabase.py)
- Middleware
- Utils

---

## Feature Documentation Checklist

When creating feature doc (`features/<feature>.md`), include:

- [ ] Feature responsibility
- [ ] API endpoints (if backend)
- [ ] Request/response schemas
- [ ] Input/output data
- [ ] Dependencies (internal & external)
- [ ] ASCII flow diagram
- [ ] Backend-frontend relationship
- [ ] Database tables used
- [ ] External services used

Keep under 150 lines.

---

## Quick Reference

| Feature | Backend Module | Frontend Feature | Status |
|---------|---------------|------------------|--------|
| resume | modules/resume | features/resume | DOCUMENTED ✅ |
| roadmap | modules/roadmap | features/learning-roadmap | DOCUMENTED ✅ |
| auth | N/A (Supabase) | features/auth | DOCUMENTED ✅ |
| dashboard | N/A | features/dashboard | DOCUMENTED ✅ |
| skills-analytics | TBD | features/skills-analytics | DOCUMENTED ✅ |

---

## Adding New Features

### Step 1: Implement Feature
Create backend module and/or frontend feature following standard structure.

### Step 2: Register Feature
Add entry to this registry with status `LAZY_LOAD`.

### Step 3: Create Feature Doc (when needed)
When feature is modified or needs documentation:
1. Create `features/<feature>.md`
2. Update status to `DOCUMENTED`
3. Include all required sections

---

## Version Info
- Document Version: 2.0
- Last Updated: 2026-02-22
- Total Features: 5 (all DOCUMENTED)
- Bootstrap Completed: 2026-02-22
