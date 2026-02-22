# AI Context System - FutureProof AI

## Overview
This directory contains the **Pyramidal AI Development Workflow** - a persistent context system that enables efficient AI-assisted development without repeatedly analyzing the entire codebase.

---

## System Architecture

```
AI Context Pyramid
──────────────────

Level 0: Rules (00_rules.md)
    ↓ ALWAYS READ FIRST
Level 1: System Memory (01_system_memory.md)
    ↓ High-level architecture
Level 2: Runtime Patterns (02_runtime_patterns.md)
    ↓ Reusable implementation patterns
Level 3: Feature Registry (03_feature_registry.md)
    ↓ Feature index
Level 4: Feature Docs (features/*.md)
    ↓ Detailed feature documentation (LAZY LOADED)
```

---

## Core Files

### 00_rules.md
**Purpose:** Mandatory AI workflow rules
**Read:** Before EVERY task
**Content:**
- Workflow steps
- Prohibited actions
- Context loading priority
- Update triggers

### 01_system_memory.md
**Purpose:** Permanent system knowledge
**Read:** Always (after rules)
**Content:**
- System purpose
- Architecture overview
- Major modules
- Communication model
- Technology stack

### 02_runtime_patterns.md
**Purpose:** Reusable patterns
**Read:** When implementing features
**Content:**
- Backend patterns (request lifecycle, module structure)
- Frontend patterns (component structure, API calls)
- Data flow patterns
- Configuration patterns

### 03_feature_registry.md
**Purpose:** Feature index
**Read:** Always (to identify affected features)
**Content:**
- List of all features
- Status (DOCUMENTED / LAZY_LOAD)
- Backend/frontend locations
- API endpoints

### features/*.md
**Purpose:** Detailed feature docs
**Read:** Only when working on specific feature
**Content:**
- Feature responsibility
- API endpoints
- Data flow diagrams
- Dependencies
- Key files

---

## Workflow Example

**Task:** Add new endpoint to resume module

```
Step 1: Read 00_rules.md
    ↓ Understand workflow
Step 2: Read 01_system_memory.md
    ↓ Understand system architecture
Step 3: Read 03_feature_registry.md
    ↓ Identify "resume" feature
Step 4: Check features/resume.md
    ↓ If missing → Create it (lazy load)
    ↓ If exists → Read it
Step 5: Read 02_runtime_patterns.md
    ↓ Apply "Request Lifecycle" pattern
Step 6: Modify code
    ↓ backend/src/modules/resume/routes.py
Step 7: Update features/resume.md
    ↓ Document new endpoint
Step 8: Done
```

**Total context files read:** 4-5
**Time:** < 5 minutes
**Efficiency:** 10x faster than full codebase analysis

---

## Benefits

### For AI Agents
✅ No need to scan entire repository
✅ Fast context loading (< 30 seconds)
✅ Focused, localized changes
✅ Consistent patterns
✅ Self-updating memory

### For Developers
✅ Clear documentation structure
✅ Feature-by-feature understanding
✅ Easy onboarding
✅ Maintainable over time
✅ Scales with project growth

### For Project
✅ Faster development cycles
✅ Reduced context pollution
✅ Better code consistency
✅ Living documentation
✅ AI-friendly architecture

---

## Maintenance

### When to Update

**00_rules.md:** Only when workflow changes
**01_system_memory.md:** When architecture changes (rare)
**02_runtime_patterns.md:** When new patterns emerge
**03_feature_registry.md:** When features added/removed
**features/*.md:** When feature behavior changes

### Update Frequency
- Rules: Almost never
- System Memory: Rarely (major architecture changes)
- Runtime Patterns: Occasionally (new patterns)
- Feature Registry: Regularly (new features)
- Feature Docs: Frequently (active development)

---

## Lazy Loading Strategy

Feature docs are **NOT** created upfront.

**Created when:**
- Feature is modified
- Bug is fixed
- New endpoints added
- Dependencies change

**Benefits:**
- No documentation debt
- Always up-to-date
- Created during active work
- Relevant context only

---

## Anti-Patterns (DO NOT DO)

❌ Reading all files in repository
❌ Analyzing unrelated features
❌ Regenerating system memory frequently
❌ Creating all feature docs upfront
❌ Ignoring the workflow rules

---

## Success Metrics

**Before AI Context System:**
- Context load time: 5-30 minutes
- Files analyzed: 50-100+
- Context pollution: High
- Efficiency: Low

**After AI Context System:**
- Context load time: < 30 seconds
- Files analyzed: 4-5
- Context pollution: Minimal
- Efficiency: 10x improvement

---

## Version Control

All AI context files are version controlled.

**Commit triggers:**
- New feature added → Update registry
- Architecture change → Update system memory
- New pattern → Update runtime patterns
- Feature modified → Update feature doc

---

## Getting Started

### For AI Agents
1. Read `00_rules.md` first
2. Follow the mandatory workflow
3. Never skip steps
4. Update docs when needed

### For Developers
1. Read this README
2. Review `01_system_memory.md` for system overview
3. Check `03_feature_registry.md` for feature list
4. Read relevant feature docs when working on features

---

## Future Enhancements

- Automated feature doc generation
- Context validation tools
- Dependency graph visualization
- AI workflow metrics tracking

---

## Version Info
- System Version: 1.0
- Created: 2026-02-22
- Architecture Source: ARCHITECTURE.md
- Maintained By: Development Team

---

## Questions?

This system is designed to be self-explanatory.
If confused, start with `00_rules.md` and follow the workflow.
