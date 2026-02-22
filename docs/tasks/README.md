# Task-Based Execution System

## Overview
This directory contains the task execution layer for the Pyramidal AI Context System. Tasks provide structured execution control while the `ai-context/` directory remains the source of architectural truth.

---

## System Hierarchy

```
1. ai-context/          → LONG TERM MEMORY (architecture truth)
   ├── 00_rules.md
   ├── 01_system_memory.md
   ├── 02_runtime_patterns.md
   ├── 03_feature_registry.md
   └── features/*.md

2. tasks/               → EXECUTION CONTROL (this directory)
   ├── TASK-001.md
   ├── TASK-002.md
   └── archive/

3. codebase             → SOURCE OF TRUTH (actual implementation)
```

**Principle**: Tasks decide WHAT to change. Feature memory decides WHERE and HOW.

---

## Task Lifecycle

```
User Request
    ↓
[AUTO-CREATE TASK]
    ↓
TASK-XXX.md (TODO)
    ↓
[AI READS PYRAMIDAL CONTEXT]
  - 00_rules.md
  - 01_system_memory.md
  - 03_feature_registry.md
  - features/[target].md
    ↓
[IMPLEMENT CHANGES]
  - Modify feature-owned files only
  - Localized changes
    ↓
[AUTO-UPDATE MEMORY]
  - Update feature.md
  - Update registry (if needed)
  - Update API docs
    ↓
TASK-XXX.md (DONE)
    ↓
[ARCHIVE]
Move to archive/
```

---

## Task Creation (Automatic)

When a user provides ANY development request, AI automatically:

1. **Creates Task File**: `TASK-XXX.md` with incremental ID
2. **Detects Feature**: Uses `03_feature_registry.md` to identify affected feature
3. **Fills Template**: Populates template using pyramidal context
4. **Sets Status**: Initializes as `TODO`

**User does NOT manually create tasks.**

---

## Task Execution Workflow

### Step 1: Load Context (Mandatory)
```
1. Read docs/ai-context/00_rules.md
2. Read docs/ai-context/01_system_memory.md
3. Read docs/ai-context/03_feature_registry.md
4. Identify target feature
5. Read docs/ai-context/features/[feature].md
```

### Step 2: Inspect Files
```
- Review "Owned Files" section in feature.md
- Load ONLY files listed in "Owned Files"
- Never scan entire repository
```

### Step 3: Implement Changes
```
- Modify only feature-owned files
- Follow patterns from 02_runtime_patterns.md
- Maintain module isolation
- Prefer minimal, localized changes
```

### Step 4: Update Memory (Automatic & Required)
```
✅ Update docs/ai-context/features/[feature].md
   - Add new files to "Owned Files"
   - Update API endpoints
   - Update data flow if changed
   - Update dependencies

✅ Update docs/ai-context/03_feature_registry.md
   - Add new feature (if applicable)
   - Update endpoint list

✅ Update docs/API_REFERENCE.md
   - Document new endpoints
   - Add examples

✅ Record in task file
   - List all files created/modified
   - Check off memory update checkboxes
```

### Step 5: Mark Complete
```
- Update task status: TODO → IN_PROGRESS → DONE
- Move to archive/
```

---

## Task Naming Convention

```
TASK-001.md  - First task
TASK-002.md  - Second task
TASK-XXX.md  - Incremental numbering
```

**Format**: `TASK-[3-digit-number].md`

---

## Task Status Values

- **TODO**: Task created, not started
- **IN_PROGRESS**: Currently being worked on
- **DONE**: Completed and archived
- **BLOCKED**: Waiting on dependencies
- **CANCELLED**: No longer needed

---

## Directory Structure

```
docs/tasks/
├── README.md              # This file
├── TASK_TEMPLATE.md       # Template for new tasks
├── TASK-001.md            # Active task
├── TASK-002.md            # Active task
├── TASK-003.md            # Active task
└── archive/               # Completed tasks
    ├── TASK-001.md
    └── TASK-002.md
```

---

## Safety Rules

### DO
✅ Create task for every development request
✅ Load pyramidal context before implementation
✅ Modify only feature-owned files
✅ Update memory after changes
✅ Archive completed tasks

### DON'T
❌ Regenerate full documentation
❌ Scan entire repository
❌ Modify files outside feature ownership
❌ Skip memory updates
❌ Break module isolation

---

## Example Task Flow

### User Request
"Add export to PDF feature for learning roadmaps"

### AI Actions

1. **Auto-Create Task**
   ```
   File: docs/tasks/TASK-005.md
   Feature: roadmap (detected from registry)
   Status: TODO
   ```

2. **Load Context**
   ```
   - Read 00_rules.md
   - Read 01_system_memory.md
   - Read 03_feature_registry.md
   - Read features/roadmap.md
   ```

3. **Identify Files**
   ```
   From roadmap.md "Owned Files":
   - backend/src/modules/roadmap/routes.py
   - backend/src/modules/roadmap/services/roadmap_generator.py
   - frontend/src/pages/LearningRoadmap.jsx
   ```

4. **Implement**
   ```
   - Add export endpoint to routes.py
   - Add PDF generation to services
   - Add export button to UI
   ```

5. **Update Memory**
   ```
   - Update features/roadmap.md:
     - Add GET /api/roadmap/{id}/export endpoint
     - Add pdf_generator.py to owned files
   - Update API_REFERENCE.md:
     - Document new endpoint
   - Update TASK-005.md:
     - List all modified files
   ```

6. **Complete**
   ```
   - Mark TASK-005.md as DONE
   - Move to archive/
   ```

---

## Task Template Usage

### For AI
When user provides a development request:

```python
# Pseudo-code
task_id = get_next_task_id()  # TASK-XXX
feature = detect_feature_from_registry(user_request)
task_content = fill_template(
    template="TASK_TEMPLATE.md",
    task_id=task_id,
    feature=feature,
    objective=extract_objective(user_request),
    context=user_request
)
create_file(f"docs/tasks/{task_id}.md", task_content)
```

### For Developers
Developers can also manually create tasks using the template for planned work.

---

## Integration with Pyramidal System

### Pyramidal System (ai-context/)
- **Purpose**: Long-term architectural memory
- **Updates**: Only when features change
- **Scope**: System-wide understanding

### Task System (tasks/)
- **Purpose**: Short-term execution control
- **Updates**: Every development request
- **Scope**: Specific implementation work

### Relationship
```
Pyramidal System
    ↓ (provides context)
Task System
    ↓ (executes changes)
Codebase
    ↓ (triggers updates)
Pyramidal System
```

---

## Benefits

### For AI Agents
- Structured execution workflow
- Clear context loading path
- Automatic memory updates
- Traceable changes

### For Developers
- Visible task history
- Clear implementation plans
- Documented decisions
- Easy rollback

### For Project
- Living documentation
- Audit trail
- Knowledge preservation
- Onboarding resource

---

## Metrics

### Efficiency
- Context load time: < 30 seconds
- Files analyzed: 4-5 (not 50-100+)
- Memory update time: < 2 minutes

### Quality
- Documentation always current
- No orphaned code
- Clear ownership
- Traceable changes

---

## Future Enhancements

- Task dependencies visualization
- Automated task creation from commits
- Task estimation and tracking
- Integration with project management tools
- Task templates for common patterns
- Automated testing integration

---

**System Version**: 1.0  
**Created**: 2026-02-22  
**Status**: OPERATIONAL
