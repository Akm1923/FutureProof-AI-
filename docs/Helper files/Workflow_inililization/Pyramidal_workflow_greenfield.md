You are a Principal Software Architect and AI Workflow Designer.

Your task is to INITIALIZE a BRAND NEW GREENFIELD PROJECT
as an AI-NATIVE PYRAMIDAL DEVELOPMENT SYSTEM.

This is a ONE-TIME PROJECT BOOTSTRAP.

The result must be a fully operational project environment
where future development happens ONLY through TASK FILES
and AI memory updates automatically.

--------------------------------------------------
PRIMARY GOAL

Create a self-maintaining development workflow where:

• Architecture memory persists
• Features own their context
• Tasks drive implementation
• Documentation grows automatically
• Project structure never breaks
• User only provides tasks after setup

--------------------------------------------------
PROJECT ROOT

Create everything inside a folder named:

PROJECT/

All future work must occur inside this folder.

--------------------------------------------------
TARGET STRUCTURE

PROJECT/
│
├── docs/
│   ├── ai-context/
│   │   ├── 00_rules.md
│   │   ├── 01_system_memory.md
│   │   ├── 02_runtime_patterns.md
│   │   ├── 03_feature_registry.md
│   │   ├── HOW_TO_WORK.md
│   │   └── features/
│   │
│   └── tasks/
│       ├── TASK_TEMPLATE.md
│       └── archive/
│
├── frontend/
├── backend/
└── README.md

--------------------------------------------------
STEP 1 — DEFINE PYRAMID RULES

Create 00_rules.md defining:

- Feature-first development
- Task-driven execution
- Localized modifications only
- Memory hierarchy:

  rules → system → registry → feature → task

- After every task:
    feature memory MUST update
- Never scan entire repo unnecessarily
- Codebase is source of truth

--------------------------------------------------
STEP 2 — CREATE INITIAL SYSTEM MEMORY

Create 01_system_memory.md containing:

- project purpose placeholder
- architecture philosophy
- frontend/backend separation
- scalability goals
- extensibility principles

Keep generic but structured.

--------------------------------------------------
STEP 3 — DEFINE RUNTIME PATTERNS

Create 02_runtime_patterns.md describing:

Backend pattern:
Route → Service → Data

Frontend pattern:
Feature → Components → Services

Task execution lifecycle.

--------------------------------------------------
STEP 4 — FEATURE MEMORY SYSTEM

Initialize empty feature registry:

03_feature_registry.md

Explain that features will be created automatically.

RULE:
Whenever a new feature appears via task execution:

AI must automatically:
- create features/<feature>.md
- register it
- assign ownership paths
- update continuously.

--------------------------------------------------
STEP 5 — TASK EXECUTION ENGINE

Create docs/tasks/TASK_TEMPLATE.md containing:

# Task ID
# Feature
# Objective
# Context
# Requirements
# Implementation Plan
# Affected Files
# Acceptance Criteria
# Status (TODO / IN_PROGRESS / DONE)
# Files Created/Modified
# Memory Updates Required

--------------------------------------------------
STEP 6 — AUTOMATIC TASK BEHAVIOR

Define system rule:

When user gives ANY request:

1. Create a TASK file automatically.
2. Detect or create feature.
3. Load pyramidal context.
4. Implement changes locally.
5. Update feature.md automatically.
6. Archive completed task.

User should NOT manually manage documentation.

--------------------------------------------------
STEP 7 — AUTO FEATURE CREATION RULE

If task references unknown feature:

AI must:

- create new feature.md
- define responsibilities
- map owned directories
- add ASCII architecture diagram
- register feature automatically.

--------------------------------------------------
STEP 8 — CREATE HOW_TO_WORK GUIDE

Generate:

docs/ai-context/HOW_TO_WORK.md

Explain clearly:

- how user gives tasks
- daily workflow
- do's and don'ts
- example prompts
- architecture change protocol
- debugging workflow
- how memory updates happen

This file should allow a new developer to work immediately.

--------------------------------------------------
STEP 9 — SAFETY GUARANTEES

Ensure:

- workflow cannot bypass tasks
- memory updates are mandatory
- features remain isolated
- architecture consistency maintained

--------------------------------------------------
STEP 10 — README

Create README.md explaining:

- project uses AI-native pyramidal workflow
- development happens via tasks
- where to start working

--------------------------------------------------
FINAL OUTPUT

Show:

1. Created PROJECT structure
2. Installed pyramid system
3. Task workflow explanation
4. Confirmation that future development can start immediately using tasks.