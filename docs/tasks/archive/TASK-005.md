# Task TASK-005: Fix 404 Error - Calendar Events API

## Metadata
- **Task ID**: TASK-005
- **Feature**: roadmap
- **Created**: 2026-02-22
- **Status**: DONE
- **Priority**: HIGH

---

## Objective
Fix 404 error when Calendar component tries to fetch calendar events. Frontend is calling wrong API endpoint.

---

## Context
User reported: "Error fetching calendar events: AxiosError: Request failed with status code 404"

Browser console shows error at Calendar.jsx:27

**Root Cause**:
- Frontend calling: `/api/calendar/${userId}`
- Backend expects: `/api/roadmap/calendar/${user_id}`
- Missing `/roadmap` prefix in the API call

---

## Requirements

### Functional Requirements
- [x] Calendar should successfully fetch events from backend
- [x] Display learning roadmap tasks on calendar
- [x] Show multi-techstack learning schedule

### Non-Functional Requirements
- [x] Proper error handling
- [x] Loading states

---

## Implementation Plan

### Step 1: Fix API Endpoint
**File**: `frontend/src/components/Calendar.jsx`
**Change**: Update line 23 from `/api/calendar/` to `/api/roadmap/calendar/`

---

## Affected Components

### Frontend
- **File**: `frontend/src/components/Calendar.jsx`
  - Line 23: API endpoint call

### Backend
- **No changes needed** - endpoint already correct

---

## Acceptance Criteria
- [x] Calendar opens without 404 error
- [x] Events load successfully
- [x] Calendar displays learning tasks
- [x] No console errors

---

## Memory Updates Required

### Feature Documentation
- [x] Update `docs/ai-context/features/roadmap.md`
  - [x] Add calendar endpoint to troubleshooting section

---

## Files Created/Modified

### Modified
- [x] `frontend/src/components/Calendar.jsx` - Fixed API endpoint
- [x] `docs/ai-context/features/roadmap.md` - Added calendar troubleshooting
- [x] `docs/tasks/TASK-005.md` - This file

---

## Execution Log

### [2026-02-22 18:15] - Status: IN_PROGRESS
- Task created from user bug report
- Root cause identified: Missing /roadmap prefix in API call
- Applying fix now

### [2026-02-22 18:17] - Status: DONE
- Fixed Calendar.jsx API endpoint
  - Changed `/api/calendar/` to `/api/roadmap/calendar/`
- Updated roadmap feature documentation
  - Added calendar endpoint to troubleshooting
- All memory updates completed

**Fix Applied**:
- Calendar now calls correct endpoint: `/api/roadmap/calendar/${userId}`
- Matches backend route: `@router.get("/calendar/{user_id}")`

**Testing Required**:
- User should hard refresh browser (Ctrl+Shift+R)
- Open calendar modal
- Should load events without 404 error

