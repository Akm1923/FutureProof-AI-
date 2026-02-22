# Task System - Quick Reference Card

**One-page reference for the task-based execution system**

---

## 🎯 Making a Request

### Simple
```
"Add export to PDF for roadmaps"
```

### Detailed
```
Feature: Email notifications for roadmap completion
Priority: HIGH
Requirements:
- Send on 100% completion
- Include summary
- Suggest next steps
```

---

## 🔄 The Flow (Automatic)

```
1. YOU: Make request
   ↓ (10 sec)
2. AI: Creates TASK-XXX.md
   ↓ (< 30 sec)
3. AI: Loads context (4-5 files)
   ↓ (5 sec)
4. AI: Identifies files
   ↓ (variable)
5. AI: Implements changes
   ↓ (< 2 min)
6. AI: Updates docs (MANDATORY)
   ↓ (10 sec)
7. AI: Marks DONE & archives
   ↓
8. YOU: Feature ready! 🎉
```

---

## 📁 File Locations

```
docs/tasks/
├── TASK-001.md          # Active tasks
├── TASK-002.md
└── archive/             # Completed tasks
    └── TASK-001.md
```

---

## 📊 Task Status

- **TODO**: Not started
- **IN_PROGRESS**: Being worked on
- **DONE**: Completed & archived
- **BLOCKED**: Waiting on dependencies

---

## 🎯 Context Loading (< 30 sec)

AI reads only these files:
1. `00_rules.md` - Workflow rules
2. `01_system_memory.md` - Architecture
3. `03_feature_registry.md` - Feature index
4. `features/[target].md` - Feature details

**Never scans entire repository!**

---

## ✅ Memory Updates (Automatic)

Before marking DONE, AI updates:
- ✅ `features/[feature].md`
- ✅ `03_feature_registry.md`
- ✅ `API_REFERENCE.md`
- ✅ Task file

**This is MANDATORY!**

---

## 📝 Request Templates

### New Feature
```
Feature: [Name]
Description: [What it does]
Requirements:
- [Req 1]
- [Req 2]
Priority: [LOW|MEDIUM|HIGH]
```

### Bug Fix
```
Bug: [Description]
Current: [What happens]
Expected: [What should happen]
Steps: [How to reproduce]
Priority: [LOW|MEDIUM|HIGH]
```

### Enhancement
```
Enhance: [Feature]
Current: [How it works]
Proposed: [Improvement]
Benefits: [Why]
```

---

## ⏱️ Time Estimates

| Complexity | Time |
|------------|------|
| Simple | 5-15 min |
| Medium | 30-60 min |
| Complex | 2-4 hours |

---

## 🔍 Tracking Tasks

### View Active
```bash
ls docs/tasks/TASK-*.md
```

### View Completed
```bash
ls docs/tasks/archive/
```

### Check Status
```bash
cat docs/tasks/TASK-005.md
# Look for: Status: TODO|IN_PROGRESS|DONE
```

---

## 🎯 What You Get

After completion:
- ✅ Working feature
- ✅ Updated documentation
- ✅ Complete audit trail
- ✅ No technical debt

---

## 💡 Tips

### DO
- ✅ Be specific
- ✅ Provide context
- ✅ List requirements
- ✅ Mention priority

### DON'T
- ❌ Be vague
- ❌ Mix multiple features
- ❌ Specify implementation (unless needed)

---

## 📚 Full Documentation

- **How-To Guide**: `docs/HOW_TO_REQUEST_FEATURES.md`
- **Workflow**: `docs/tasks/EXECUTION_WORKFLOW.md`
- **Integration**: `docs/tasks/SYSTEM_INTEGRATION.md`
- **Task System**: `docs/tasks/README.md`

---

## 🚀 Example

**Request:**
```
"Add dark mode toggle to dashboard"
```

**AI Does:**
```
✅ Creates TASK-006.md
✅ Detects feature: dashboard
✅ Loads context (< 30 sec)
✅ Identifies files:
   - Dashboard.jsx
   - Header.jsx
✅ Implements dark mode
✅ Updates documentation
✅ Marks DONE
✅ Archives task
```

**Result:**
```
🎉 Dark mode ready!
📚 Docs updated
📋 Task archived
⏱️ Total time: ~15 minutes
```

---

## 🆘 Need Help?

1. Read: `docs/HOW_TO_REQUEST_FEATURES.md`
2. Check: `docs/tasks/README.md`
3. Review: Example task `docs/tasks/TASK-001.md`

---

**Quick Reference Version:** 1.0  
**Last Updated:** 2026-02-22

**Just describe what you want - AI handles the rest!** 🚀
