Here is a **clean, one-page, production-style operating manual** you can directly keep in your repo as:

```
AI_DEVELOPER_PLAYBOOK.txt
```

(or `.md` if you later want formatting)

This is written so **any new developer or any new AI session** can instantly understand *how work happens in this project*.

---

# AI DEVELOPER PLAYBOOK

## One-Page Operating Manual for This Project

---

## Purpose

This project follows a **Pyramidal Development Workflow** designed for AI-assisted development at scale.

The system ensures:

* seamless work across sessions
* minimal context loading
* feature-based development
* automatic architectural memory
* safe incremental changes

You do not need to understand the entire codebase before contributing.

---

## Core Principle

Work happens in layers:

Rules → System Memory → Feature Context → Task → Code

You never start from source code directly.

Always work through **features and tasks**.

---

## Project Mental Model

Think of the project as:

* AI Context = Project Brain
* Features = Independent Units of Work
* Tasks = Instructions for Change
* Codebase = Source of Truth

You provide intent.
The system provides context.

---

## Starting a New Session

At the beginning of any new AI session, initialize context using:

Follow pyramidal workflow. Load project context and work feature-first.

This loads only essential knowledge:

* project rules
* architecture overview
* feature navigation map

Do not request full project analysis.

---

## Adding a Feature

Describe the feature clearly and briefly.

Examples:

Add PDF export to resume feature.
Create analytics dashboard for roadmap feature.

Expected system behavior:

1. Identify feature domain.
2. Load feature context.
3. Create task automatically.
4. Modify only owned files.
5. Update feature memory.
6. Archive task history.

Do not manually list files.

---

## Fixing Bugs

Describe the problem and where it appears.

Examples:

Fix 404 error in calendar component.
Resume upload fails for images.

System workflow:

1. Detect related feature.
2. Load feature memory.
3. Open minimal required files.
4. Diagnose and fix issue.
5. Update memory if logic changes.

Avoid asking AI to load the entire project.

---

## Continuing Previous Work

Use:

Continue working on the roadmap feature and suggest next steps.

The system will:

* review recent tasks
* understand latest changes
* resume work safely

---

## Working Across Features

If integration is needed:

Integrate resume skills with roadmap generation.

The system automatically loads both feature contexts.

---

## How Tasks Work

Every change becomes a task internally.

Task lifecycle:

TODO → IN_PROGRESS → DONE → ARCHIVED

Tasks provide execution history and continuity across sessions.

You do not manually maintain tasks unless required.

---

## Feature Ownership Rule

Each feature owns specific folders and files.

AI must:

* modify only feature-owned areas
* avoid unrelated modules
* preserve architecture boundaries

This prevents accidental system breakage.

---

## What NOT To Do

Do NOT:

* ask AI to load all files
* request full codebase explanation
* start from random source files
* bypass feature workflow
* mix unrelated features in one request

These increase token usage and reduce accuracy.

---

## Ideal Prompt Style

Use short intent-driven instructions:

Follow pyramidal workflow.
Task: improve roadmap recommendations.

Short prompts are preferred.
The system already knows the project.

---

## Daily Workflow

Start Session
→ Initialize pyramidal workflow

Give Task
→ Describe feature or bug

AI Loads Context
→ Feature memory only

AI Implements Change
→ Localized edits

Memory Updates Automatically
→ Future sessions remain consistent

Repeat.

---

## Architecture Change Protocol

If system design must change, explicitly say:

Architecture change: introduce notification service.

Only then should system-level memory update.

---

## Golden Rules

1. Think in features, not files.
2. Keep prompts simple.
3. Let AI manage context loading.
4. One logical change per request.
5. Trust the pyramidal system.

---

## Quick Examples

New session:
Follow pyramidal workflow.

Add feature:
Add streak tracking to roadmap.

Bug fix:
Fix login token expiration issue.

Continue work:
Continue resume feature improvements.

---

## Final Principle

Simple intent + structured memory = scalable development.

You guide direction.
The pyramidal system maintains understanding.

---

If you want, next I can also give you a **“ULTRA SHORT VERSION (10 lines)”** that senior teams pin at the top of README so even a brand-new AI session behaves correctly instantly.
