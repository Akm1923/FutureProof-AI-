# AI Development Workflow Rules

## Purpose
This document defines the MANDATORY workflow for AI-assisted development on FutureProof AI.

## Core Principle
**NEVER analyze the entire codebase. Work feature-by-feature using persistent context.**

---

## Workflow Steps (MANDATORY)

### Before ANY coding task:

1. **Read System Memory**
   - Load: `01_system_memory.md`
   - Understand: System purpose, architecture, communication model
   - Time: 10 seconds

2. **Check Feature Registry**
   - Load: `03_feature_registry.md`
   - Identify: Which feature(s) are affected
   - Time: 5 seconds

3. **Load Feature Context**
   - Load: `features/<feature>.md` (ONLY affected features)
   - If missing → Create it (lazy load)
   - Time: 10 seconds per feature

4. **Load Runtime Patterns**
   - Load: `02_runtime_patterns.md` (if needed)
   - Apply: Reusable patterns for implementation
   - Time: 5 seconds

5. **Perform Localized Changes**
   - Modify ONLY affected files
   - Never touch unrelated modules
   - Time: Variable

6. **Update Feature Doc (if needed)**
   - If feature behavior changed → Update `features/<feature>.md`
   - If new feature → Create new feature doc + register in `03_feature_registry.md`
   - Time: 5 minutes

---

## Prohibited Actions

❌ **NEVER** scan entire repository
❌ **NEVER** read all files in a directory
❌ **NEVER** regenerate system memory unless architecture fundamentally changes
❌ **NEVER** analyze unrelated features
❌ **NEVER** refactor code without explicit request

---

## Allowed Actions

✅ Read system memory (always)
✅ Read feature registry (always)
✅ Load specific feature docs (only affected ones)
✅ Create missing feature docs (lazy load)
✅ Update feature docs (when behavior changes)
✅ Perform localized file changes

---

## Context Loading Priority

```
Priority 1: 00_rules.md (this file)
Priority 2: 01_system_memory.md
Priority 3: 03_feature_registry.md
Priority 4: features/<affected_feature>.md
Priority 5: 02_runtime_patterns.md (optional)
```

Total context load time: < 30 seconds

---

## Feature Documentation Triggers

Create/update feature doc when:
- Adding new feature
- Modifying existing feature behavior
- Fixing bug in feature
- Adding new API endpoint to feature
- Changing feature dependencies

Do NOT update when:
- Fixing typos
- Updating comments
- Refactoring without behavior change
- Updating tests only

---

## Memory Update Rules

### System Memory (01_system_memory.md)
Update ONLY when:
- New major module added (e.g., new backend module)
- External service integration changes
- Architecture pattern changes
- Communication model changes

### Runtime Patterns (02_runtime_patterns.md)
Update ONLY when:
- New reusable pattern emerges
- Existing pattern changes significantly
- New layer added to architecture

### Feature Registry (03_feature_registry.md)
Update when:
- New feature added
- Feature removed
- Feature renamed

### Feature Docs (features/*.md)
Update when:
- Feature behavior changes
- New API endpoints added
- Dependencies change
- Data flow changes

---

## Example Workflow

**Task:** Add new endpoint to resume module

```
Step 1: Read 00_rules.md ✓
Step 2: Read 01_system_memory.md ✓
Step 3: Read 03_feature_registry.md ✓
Step 4: Identify affected feature → "resume"
Step 5: Read features/resume.md ✓
Step 6: Modify backend/src/modules/resume/routes.py
Step 7: Update features/resume.md (add new endpoint)
Step 8: Done
```

Total files read: 4
Total files modified: 2
Time: < 5 minutes

---

## Anti-Pattern Example

**Task:** Add new endpoint to resume module

❌ **WRONG APPROACH:**
```
Step 1: List all files in backend/
Step 2: Read main.py
Step 3: Read all routes.py files
Step 4: Read all services
Step 5: Read database files
Step 6: Analyze entire codebase
Step 7: Make change
```

Total files read: 50+
Time: 30+ minutes
Result: Wasted time, context overload

---

## Version Control

- Document Version: 1.0
- Last Updated: 2026-02-22
- Update Frequency: Only when workflow changes

---

## Compliance

All AI agents working on this project MUST follow these rules.
Non-compliance results in inefficient development and context pollution.
