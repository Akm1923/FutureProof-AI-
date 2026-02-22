# Feature Documentation Directory

## Purpose
This directory contains detailed documentation for individual features.
Feature docs are created **lazily** - only when needed.

---

## When to Create Feature Docs

Create a feature doc when:
- Modifying existing feature
- Adding new feature
- Fixing bug in feature
- Adding API endpoints
- Changing dependencies

---

## Feature Doc Template

```markdown
# <Feature Name>

## Responsibility
Brief description of what this feature does.

## Location
- Backend: `backend/src/modules/<feature>/`
- Frontend: `frontend/src/features/<feature>/`

## API Endpoints

### POST /api/<feature>/endpoint
**Purpose:** Description
**Input:**
```json
{
  "field": "value"
}
```
**Output:**
```json
{
  "success": true,
  "data": {}
}
```

## Data Flow

```
User Action
    ↓
Frontend Component
    ↓
API Call
    ↓
Backend Route
    ↓
Service Layer
    ↓
Database
    ↓
Response
```

## Dependencies

**Internal:**
- Shared config
- Database client

**External:**
- Service name
- API name

## Database Tables
- `table_name`: Description

## Key Files
- Backend: `modules/<feature>/routes.py`
- Frontend: `features/<feature>/pages/<Page>.jsx`

---

**Version:** 1.0
**Last Updated:** YYYY-MM-DD
```

---

## Current Status

All features are marked as `LAZY_LOAD` in `03_feature_registry.md`.

Feature docs will be created on-demand when:
1. AI needs to modify a feature
2. Developer explicitly requests documentation
3. Bug fix requires understanding feature

---

## Benefits of Lazy Loading

✅ No upfront documentation burden
✅ Docs created only when needed
✅ Always relevant (created during active work)
✅ Reduces initial context load
✅ Scales with project growth

---

## Version Info
- Document Version: 1.0
- Last Updated: 2026-02-22
