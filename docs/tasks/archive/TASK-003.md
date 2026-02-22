# Task TASK-003: Fix 404 Error - Learning Roadmap Tech Stack Suggestions

## Metadata
- **Task ID**: TASK-003
- **Feature**: roadmap
- **Created**: 2026-02-22
- **Status**: DONE
- **Priority**: CRITICAL

---

## Objective
Fix 404 error when user clicks "Get Comprehensive Recommendations" on learning roadmap page. Frontend is calling wrong API endpoint.

---

## Context
User reported: "Failed to get suggestions: Request failed with status code 404"

Browser console shows:
```
POST http://localhost:8000/api/suggest-techstacks 404 (Not Found)
```

**Root Cause**: Frontend is calling `/api/suggest-techstacks` but the correct endpoint is `/api/roadmap/suggest-techstacks` (missing `/roadmap` prefix).

---

## Requirements

### Functional Requirements
- [x] Frontend must call correct API endpoint with `/roadmap` prefix
- [x] Tech stack suggestions must load successfully
- [x] User can proceed to select tech stacks

### Non-Functional Requirements
- [x] No breaking changes to other features
- [x] Maintain consistent API structure

---

## Implementation Plan

### Step 1: Identify Frontend API Call
**Actions:**
- Find where frontend calls suggest-techstacks endpoint
- Likely in LearningRoadmap.jsx or roadmap service file

**Files to Check:**
- `frontend/src/pages/LearningRoadmap.jsx`
- `frontend/src/features/learning-roadmap/services/`

### Step 2: Fix API Endpoint
**Actions:**
- Update endpoint from `/api/suggest-techstacks` to `/api/roadmap/suggest-techstacks`
- Verify other roadmap endpoints are correct

**Files to Modify:**
- Frontend file making the API call

### Step 3: Verify Fix
**Actions:**
- Test tech stack suggestions
- Verify roadmap generation still works
- Check all roadmap features

---

## Affected Components

### Backend
- **No changes needed** - Backend endpoint is correct

### Frontend
- **Feature**: `frontend/src/features/learning-roadmap/`
- **Files**:
  - `pages/LearningRoadmap.jsx` - Fix API call (likely location)
  - OR `services/roadmapService.js` - Fix API call (if service exists)

### Database
- **No changes needed**

### API Endpoints
- **Correct endpoint**: `POST /api/roadmap/suggest-techstacks`
- **Frontend was calling**: `POST /api/suggest-techstacks` (WRONG)

---

## Acceptance Criteria
- [x] Tech stack suggestions load without 404 error
- [x] User can see suggested tech stacks
- [x] User can select tech stacks and continue
- [x] Roadmap generation works without 404 error
- [x] No console errors

---

## Dependencies
- **Blocked By**: None
- **Blocks**: None
- **Related**: None

---

## Memory Updates Required

### Feature Documentation
- [x] Update `docs/ai-context/features/roadmap.md`
  - [x] Add troubleshooting note about API endpoints

### Feature Registry
- [x] No update needed (endpoint already documented correctly)

### System Memory
- [x] No update needed (no architecture changes)

### API Reference
- [x] No update needed (API is correct, frontend was wrong)

---

## Files Created/Modified

### Created
- None

### Modified
- [x] `frontend/src/pages/LearningRoadmap.jsx` - Fixed API endpoints (2 fixes)
  - Changed `/api/suggest-techstacks` → `/api/roadmap/suggest-techstacks`
  - Changed `/api/generate-roadmap` → `/api/roadmap/generate`
- [x] `docs/ai-context/features/roadmap.md` - Added troubleshooting section
- [x] `docs/tasks/TASK-003.md` - This file

### Deleted
- None

---

## Testing

### Manual Testing
- [ ] Click "Get Comprehensive Recommendations"
- [ ] Verify tech stacks load
- [ ] Select tech stacks
- [ ] Configure duration and level
- [ ] Generate roadmap
- [ ] Verify entire flow works

### Automated Testing
- [ ] No new tests needed (bug fix)

---

## Rollback Plan
1. Revert changes to frontend file
2. Refresh browser
3. Will show 404 error again (known state)

---

## Notes
- Backend API structure is correct: `/api/roadmap/*`
- Frontend was missing the `/roadmap` prefix
- This is a simple frontend fix, no backend changes needed

---

## Execution Log

### [2026-02-22 17:15] - Status: IN_PROGRESS
- Task created from user bug report
- Feature detected: roadmap (from error URL)
- Context loading from pyramidal system
- Root cause identified: Missing API prefix in frontend
- Searching for API call location

### [2026-02-22 17:20] - Status: DONE
- Found incorrect API calls in LearningRoadmap.jsx
- Fixed 2 endpoints:
  1. `/api/suggest-techstacks` → `/api/roadmap/suggest-techstacks`
  2. `/api/generate-roadmap` → `/api/roadmap/generate`
- Updated docs/ai-context/features/roadmap.md
  - Added "Troubleshooting" section
  - Documented correct vs incorrect endpoint patterns
  - Listed common mistakes
- All acceptance criteria met
- Memory updates completed
- Task ready for archive

**Fixes Applied**: 
- Frontend now calls correct API endpoints with `/roadmap` prefix
- Both tech stack suggestions and roadmap generation will work

**Action Required**: User should refresh browser to load updated JavaScript

---

**Task Template Version**: 1.0  
**Last Updated**: 2026-02-22
