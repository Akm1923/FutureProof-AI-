You are a Principal Software Architect and AI Workflow Engineer.

Your task is to transform this EXISTING BROWNFIELD PROJECT
into an AI-NATIVE PYRAMIDAL DEVELOPMENT SYSTEM.

This is a ONE-TIME INITIALIZATION PROCESS.

DO NOT refactor business logic.
DO NOT change application behavior.
ONLY build an AI operational layer around the project.

--------------------------------------------------
PRIMARY OBJECTIVE

Create a self-maintaining AI context + task execution workflow
so future development NEVER requires re-analyzing the full codebase.

After this setup:
- AI understands architecture persistently
- features have dedicated memory
- tasks drive implementation
- memory updates automatically

--------------------------------------------------
TARGET ARCHITECTURE TO INSTALL

docs/
 ├── ai-context/      (AI MEMORY LAYER)
 │     ├── 00_rules.md
 │     ├── 01_system_memory.md
 │     ├── 02_runtime_patterns.md
 │     ├── 03_feature_registry.md
 │     ├── WORKFLOW_GUIDE.md
 │     └── features/
 │
 └── tasks/           (EXECUTION LAYER)
       ├── TASK_TEMPLATE.md
       └── archive/

--------------------------------------------------
STEP 1 — PROJECT DISCOVERY (SAFE ANALYSIS)

Lightly analyze repository structure:

- detect frontend/backend/services/modules
- detect feature folders
- detect API boundaries
- detect shared utilities

DO NOT deeply parse every file.
Focus on structure and relationships.

--------------------------------------------------
STEP 2 — CREATE AI RULES

Create docs/ai-context/00_rules.md defining:

- feature isolation principles
- modular boundaries
- localized modification rule
- pyramid loading order:
    rules → system → registry → feature → task
- memory must update after changes
- never scan entire repo unless required

--------------------------------------------------
STEP 3 — GENERATE SYSTEM MEMORY

Create 01_system_memory.md containing:

- project purpose
- high-level architecture
- frontend/backend relationship
- major subsystems
- external integrations
- communication patterns

Concise but complete (<250 lines).

--------------------------------------------------
STEP 4 — EXTRACT RUNTIME PATTERNS

Create 02_runtime_patterns.md describing reusable patterns:

Backend:
- request lifecycle
- controller/service/data flow

Frontend:
- routing
- state handling
- feature modularization

No feature-specific details.

--------------------------------------------------
STEP 5 — FEATURE DETECTION & CONTEXT CREATION

Automatically detect major features/modules from:

backend modules
frontend feature folders
logical domain grouping

For EACH feature create:

docs/ai-context/features/<feature>.md

Each feature file must include:

- Purpose
- Responsibilities
- User flows
- Backend components
- Frontend components
- API endpoints
- Data flow
- Dependencies
- Owned Files (CRITICAL)
- Interaction with other features
- Extension points
- ASCII architecture diagram

Keep 100–200 lines.

--------------------------------------------------
STEP 6 — CREATE FEATURE REGISTRY

Generate 03_feature_registry.md mapping:

Feature → feature.md path → owned directories.

This registry becomes AI navigation index.

--------------------------------------------------
STEP 7 — INSTALL TASK EXECUTION SYSTEM

Create docs/tasks/ structure.

Create TASK_TEMPLATE.md with:

- Task ID
- Feature (auto-detect)
- Objective
- Context
- Requirements
- Implementation Plan
- Affected Files
- Acceptance Criteria
- Status
- Files Created/Modified
- Memory Updates Required

--------------------------------------------------
STEP 8 — DEFINE TASK WORKFLOW

Add WORKFLOW_GUIDE.md explaining:

When user gives request:
1. Create task automatically
2. Load pyramid memory
3. Modify only feature-owned files
4. Update feature memory
5. Archive task

--------------------------------------------------
STEP 9 — ENABLE AUTOMATIC MEMORY SYNC

Define rule:

After ANY implementation AI must:

- update feature.md ownership lists
- record new APIs/components
- update flows if changed
- never regenerate full documentation

--------------------------------------------------
STEP 10 — SAFETY CONSTRAINTS

- No code refactoring
- No dependency changes
- No file movement unless required
- Documentation layer only

--------------------------------------------------
FINAL OUTPUT

Show:

1. Detected system architecture summary
2. List of generated features
3. Created ai-context structure
4. Installed task workflow
5. Explanation of how future development works

After completion the repository must be ready for
task-based pyramidal development immediately.