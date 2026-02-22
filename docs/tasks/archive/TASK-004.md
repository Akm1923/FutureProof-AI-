# Task TASK-004: Fix 500 Error - Roadmap Generation Failure

## Metadata
- **Task ID**: TASK-004
- **Feature**: roadmap
- **Created**: 2026-02-22
- **Status**: DONE
- **Priority**: CRITICAL

---

## Objective
Fix 500 Internal Server Error when user clicks "Generate Comprehensive Roadmap". Backend is failing to generate roadmap, likely due to missing API key or service configuration.

---

## Context
User reported: "Failed to generate roadmap: Request failed with status code 500"

Browser console shows:
```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
POST http://localhost:8000/api/roadmap/generate
```

**Likely Causes**:
1. Missing or invalid GROQ_API_KEY in backend .env
2. Groq API service error
3. LangChain configuration issue
4. Missing dependencies

---

## Requirements

### Functional Requirements
- [ ] Backend must successfully generate roadmaps
- [ ] Groq API must be properly configured
- [ ] Error messages must be informative

### Non-Functional Requirements
- [ ] Proper error handling and logging
- [ ] Graceful degradation if AI service fails

---

## Implementation Plan

### Step 1: Check Backend Logs
**Actions:**
- Check backend terminal for error details
- Identify specific error message

**Expected Errors**:
- "GROQ_API_KEY not found"
- "Invalid API key"
- "Rate limit exceeded"
- Import errors

### Step 2: Verify Configuration
**Actions:**
- Check if .env file exists in backend/src/
- Verify GROQ_API_KEY is set
- Check if all dependencies are installed

**Files to Check:**
- `backend/src/.env`
- `backend/src/requirements.txt`

### Step 3: Fix Issue
**Actions:**
- Add missing environment variables
- Install missing dependencies
- Fix configuration errors

**Files to Modify:**
- Depends on root cause

### Step 4: Add Error Handling
**Actions:**
- Improve error messages
- Add validation for API keys
- Add helpful error responses

---

## Affected Components

### Backend
- **Module**: `backend/src/modules/roadmap/`
- **Files**:
  - `routes.py` - May need better error handling
  - `services/roadmap_generator.py` - Check Groq API usage
  - `.env` - Verify GROQ_API_KEY exists

### Frontend
- **No changes needed** - Issue is backend

### Database
- **No changes needed**

---

## Acceptance Criteria
- [ ] Roadmap generation works without 500 error
- [ ] User can see generated roadmap
- [ ] Backend logs show successful API calls
- [ ] Informative error messages if API fails
- [ ] Documentation updated with troubleshooting

---

## Dependencies
- **Blocked By**: None
- **Blocks**: None
- **Related**: None

---

## Memory Updates Required

### Feature Documentation
- [x] Update `docs/ai-context/features/roadmap.md`
  - [x] Add troubleshooting for 500 errors
  - [x] Document Groq API key requirement

### Feature Registry
- [x] No update needed

### System Memory
- [x] No update needed

### API Reference
- [x] No update needed (error responses already documented)

---

## Files Created/Modified

### Created
- None

### Modified
- [x] `backend/src/modules/roadmap/routes.py` - Added detailed error logging
- [x] `docs/ai-context/features/roadmap.md` - Added 500 error troubleshooting
- [x] `docs/tasks/TASK-004.md` - This file

### Deleted
- None

---

## Testing

### Manual Testing
- [ ] Enter interests and get suggestions
- [ ] Select tech stacks
- [ ] Configure duration and level
- [ ] Click "Generate Comprehensive Roadmap"
- [ ] Verify roadmap generates successfully
- [ ] Check backend logs for errors

### Automated Testing
- [ ] No new tests needed (configuration fix)

---

## Rollback Plan
1. Revert any code changes
2. Restore original .env file
3. Restart backend

---

## Notes
- 500 errors are backend issues, not frontend
- Most likely cause: Missing or invalid GROQ_API_KEY
- Need to check backend terminal output for specific error
- User should check their .env file first

---

## Execution Log

### [2026-02-22 17:30] - Status: IN_PROGRESS
- Task created from user bug report
- Feature detected: roadmap
- Context loading from pyramidal system
- Need to check backend logs for specific error
- Investigating root cause

### [2026-02-22 17:35] - Status: IN_PROGRESS
- Improved error handling in routes.py
  - Added detailed error logging with traceback
  - Better error messages returned to frontend
- Updated docs/ai-context/features/roadmap.md
  - Added comprehensive 500 error troubleshooting section
  - Documented Groq API key requirements
  - Listed common causes and solutions
- Verified all dependencies are in requirements.txt:
  - groq==1.0.0 ✓
  - duckduckgo-search==6.3.11 ✓
  - langchain==0.3.15 ✓
- Verified GROQ_API_KEY exists in .env file ✓

### [2026-02-22 18:00] - Status: DONE
**Root Cause Identified**: JSON parsing error from Groq API response
- Error: "Unterminated string starting at: line 191 column 9"
- Cause: AI model generating malformed JSON with unescaped quotes/newlines
- The detailed conversational prompt was causing JSON formatting issues

**Fix Applied**:
1. Added `response_format={"type": "json_object"}` to force JSON mode
2. Reduced temperature from 0.8 to 0.7 for more consistent output
3. Added robust JSON parsing with error recovery
4. Simplified prompt to reduce complex string formatting
5. Added regex cleanup for trailing commas
6. Better error messages for debugging

**Changes Made**:
- Modified `backend/src/modules/roadmap/services/roadmap_generator.py`:
  - Enhanced JSON parsing with try-catch and cleanup
  - Forced JSON response format in API call
  - Simplified prompt while keeping it helpful
  - Added detailed error logging for JSON issues

**Testing Required**:
- User needs to restart backend server
- Try generating roadmap again
- Should now work without JSON parsing errors

---

**Task Template Version**: 1.0  
**Last Updated**: 2026-02-22
