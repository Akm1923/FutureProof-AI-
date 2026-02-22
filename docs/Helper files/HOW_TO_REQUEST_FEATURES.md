# How to Request New Features or Tasks

**Complete guide for developers and users on requesting new features or tasks in FutureProof AI**

---

## Quick Start

### For Users (Simple Request)

Just describe what you want in natural language:

```
"Add export to PDF feature for learning roadmaps"
```

That's it! The AI will handle everything else automatically.

### For Developers (Detailed Request)

Provide more context for better results:

```
Feature Request: Export Learning Roadmaps to PDF

Context: Users want to print and share their roadmaps offline

Requirements:
- Export button on roadmap page
- PDF includes all roadmap data
- Maintains visual styling
- File size < 5MB

Priority: Medium
```

---

## Complete End-to-End Flow

### 🎯 Step 1: You Make a Request

**What You Do:**
Simply tell the AI what you want in natural language.

**Examples:**

**Simple Request:**
```
"Add a dark mode toggle to the dashboard"
```

**Detailed Request:**
```
"I need to add email notifications when a user completes a roadmap.
The notification should include:
- Congratulations message
- Roadmap summary
- Next steps suggestions
Priority: High"
```

**Bug Fix Request:**
```
"Fix: Resume upload fails for files larger than 5MB"
```

**Enhancement Request:**
```
"Improve: Make the roadmap progress bar show percentage on hover"
```

---

### 🤖 Step 2: AI Auto-Creates Task (10 seconds)

**What AI Does Automatically:**

1. **Generates Task ID**
   ```
   Next available: TASK-005
   ```

2. **Detects Feature**
   ```
   Analyzes request → Matches keywords → Identifies feature
   
   Example:
   "roadmap" keyword → Feature: roadmap
   "dashboard" keyword → Feature: dashboard
   "resume" keyword → Feature: resume
   ```

3. **Creates Task File**
   ```
   File: docs/tasks/TASK-005.md
   Status: TODO
   Feature: roadmap (auto-detected)
   ```

4. **Fills Template**
   ```
   - Objective: [extracted from your request]
   - Context: [your full request]
   - Requirements: [parsed from your description]
   - Implementation Plan: [AI generates based on feature knowledge]
   ```

**You See:**
```
✅ Task TASK-005 created
📋 Feature: roadmap
📝 Status: TODO
🔗 File: docs/tasks/TASK-005.md
```

---

### 📚 Step 3: AI Loads Context (< 30 seconds)

**What AI Does:**

```
┌─────────────────────────────────────────┐
│  1. Read Workflow Rules                 │
│     docs/ai-context/00_rules.md         │
│     ↓ Learn mandatory workflow          │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  2. Read System Memory                  │
│     docs/ai-context/01_system_memory.md │
│     ↓ Understand architecture           │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  3. Read Feature Registry               │
│     docs/ai-context/03_feature_registry.md│
│     ↓ Identify target feature           │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  4. Read Feature Documentation          │
│     docs/ai-context/features/roadmap.md │
│     ↓ Get implementation details        │
└─────────────────────────────────────────┘
```

**Total Time:** < 30 seconds
**Files Read:** 4-5 (not 50-100+!)

**You See:**
```
📖 Loading context...
✅ Rules loaded
✅ System memory loaded
✅ Feature registry loaded
✅ Feature documentation loaded (roadmap)
🎯 Ready to implement
```

---

### 🔍 Step 4: AI Identifies Files (5 seconds)

**What AI Does:**

Reads the "Owned Files" section from feature documentation:

```markdown
## Owned Files (from features/roadmap.md)

### Backend
- backend/src/modules/roadmap/routes.py
- backend/src/modules/roadmap/services/
- backend/src/modules/roadmap/database.py

### Frontend
- frontend/src/pages/LearningRoadmap.jsx
- frontend/src/features/learning-roadmap/**
```

**AI Only Loads These Files** - Never scans entire repository!

**You See:**
```
📂 Identified files to modify:
   Backend:
   - routes.py
   - services/roadmap_generator.py
   
   Frontend:
   - LearningRoadmap.jsx
```

---

### 💻 Step 5: AI Implements Changes (Variable Time)

**What AI Does:**

1. **Creates New Files** (if needed)
   ```
   Creating: backend/src/modules/roadmap/services/pdf_generator.py
   ```

2. **Modifies Existing Files**
   ```
   Modifying: backend/src/modules/roadmap/routes.py
   - Adding export endpoint
   
   Modifying: frontend/src/pages/LearningRoadmap.jsx
   - Adding export button
   - Adding download handler
   ```

3. **Updates Dependencies**
   ```
   Updating: backend/src/requirements.txt
   - Adding reportlab==4.0.0
   ```

**You See:**
```
🔨 Implementing changes...
✅ Created pdf_generator.py
✅ Modified routes.py (added export endpoint)
✅ Modified LearningRoadmap.jsx (added export button)
✅ Updated requirements.txt
📊 Status: IN_PROGRESS
```

---

### 📝 Step 6: AI Updates Documentation (< 2 minutes)

**What AI Does Automatically:**

This step is **MANDATORY** before marking task as DONE.

#### 6.1 Update Feature Documentation
```
File: docs/ai-context/features/roadmap.md

Changes:
✅ Add new API endpoint to "API Endpoints" section
✅ Add new files to "Owned Files" section
✅ Update "Key Features" section
✅ Update data flow diagram (if needed)
```

#### 6.2 Update Feature Registry
```
File: docs/ai-context/03_feature_registry.md

Changes:
✅ Add new endpoint to roadmap module list
```

#### 6.3 Update API Reference
```
File: docs/API_REFERENCE.md

Changes:
✅ Document new endpoint with examples
✅ Add request/response format
✅ Add error responses
```

#### 6.4 Update Task File
```
File: docs/tasks/TASK-005.md

Changes:
✅ Check off all memory update boxes
✅ List all files created/modified
✅ Add execution log entry
```

**You See:**
```
📚 Updating documentation...
✅ Updated features/roadmap.md
✅ Updated feature registry
✅ Updated API reference
✅ Updated task file
📖 Documentation is current
```

---

### ✅ Step 7: AI Marks Complete & Archives (10 seconds)

**What AI Does:**

1. **Verify Completion**
   ```
   Checking:
   ✅ All acceptance criteria met
   ✅ All files listed in task
   ✅ Memory updates completed
   ✅ No breaking changes
   ```

2. **Update Task Status**
   ```
   Status: TODO → IN_PROGRESS → DONE
   ```

3. **Add Completion Log**
   ```
   [2026-02-22 16:45] - Status: DONE
   - Implementation completed
   - Memory updates applied
   - Files created: 1
   - Files modified: 3
   ```

4. **Archive Task**
   ```
   Move: docs/tasks/TASK-005.md
   To: docs/tasks/archive/TASK-005.md
   ```

**You See:**
```
🎉 Task TASK-005 completed!
✅ All acceptance criteria met
✅ Documentation updated
✅ Task archived
📁 Location: docs/tasks/archive/TASK-005.md
```

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  YOU: "Add export to PDF for roadmaps"                 │
└────────────────────┬────────────────────────────────────┘
                     │ 10 seconds
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Creates TASK-005.md                                │
│      Feature: roadmap (auto-detected)                   │
│      Status: TODO                                       │
└────────────────────┬────────────────────────────────────┘
                     │ < 30 seconds
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Loads Context                                      │
│      - 00_rules.md                                      │
│      - 01_system_memory.md                              │
│      - 03_feature_registry.md                           │
│      - features/roadmap.md                              │
└────────────────────┬────────────────────────────────────┘
                     │ 5 seconds
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Identifies Files                                   │
│      - routes.py                                        │
│      - LearningRoadmap.jsx                              │
│      - (from "Owned Files" section)                     │
└────────────────────┬────────────────────────────────────┘
                     │ Variable (depends on complexity)
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Implements Changes                                 │
│      ✅ Create pdf_generator.py                         │
│      ✅ Modify routes.py                                │
│      ✅ Modify LearningRoadmap.jsx                      │
│      Status: IN_PROGRESS                                │
└────────────────────┬────────────────────────────────────┘
                     │ < 2 minutes
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Updates Documentation (MANDATORY)                  │
│      ✅ features/roadmap.md                             │
│      ✅ 03_feature_registry.md                          │
│      ✅ API_REFERENCE.md                                │
│      ✅ TASK-005.md                                     │
└────────────────────┬────────────────────────────────────┘
                     │ 10 seconds
                     ▼
┌─────────────────────────────────────────────────────────┐
│  AI: Marks Complete & Archives                          │
│      Status: DONE                                       │
│      Moved to: archive/TASK-005.md                      │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  YOU: Feature is ready to use! 🎉                      │
│       Documentation is current ✅                       │
│       Complete audit trail 📋                           │
└─────────────────────────────────────────────────────────┘
```

---

## Request Templates

### Template 1: New Feature

```
Feature Request: [Feature Name]

Description:
[What the feature should do]

Context:
[Why this feature is needed]

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Priority: [LOW | MEDIUM | HIGH | CRITICAL]

Affected Feature: [If you know it]
```

**Example:**
```
Feature Request: Email Notifications for Roadmap Completion

Description:
Send email to users when they complete a learning roadmap

Context:
Users want to celebrate milestones and share achievements

Requirements:
- Trigger on 100% roadmap completion
- Include roadmap summary
- Add congratulations message
- Suggest next steps

Priority: MEDIUM

Affected Feature: roadmap
```

---

### Template 2: Bug Fix

```
Bug Report: [Brief Description]

Current Behavior:
[What's happening now]

Expected Behavior:
[What should happen]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Error Message (if any):
[Error message or screenshot]

Priority: [LOW | MEDIUM | HIGH | CRITICAL]
```

**Example:**
```
Bug Report: Resume upload fails for large files

Current Behavior:
Upload fails with "Request Entity Too Large" error for files > 5MB

Expected Behavior:
Should accept files up to 10MB

Steps to Reproduce:
1. Go to /upload
2. Select resume file > 5MB
3. Click upload
4. Error appears

Error Message:
"413 Request Entity Too Large"

Priority: HIGH
```

---

### Template 3: Enhancement

```
Enhancement Request: [Feature to Improve]

Current State:
[How it works now]

Proposed Improvement:
[How it should work]

Benefits:
- [Benefit 1]
- [Benefit 2]

Priority: [LOW | MEDIUM | HIGH]
```

**Example:**
```
Enhancement Request: Roadmap Progress Bar

Current State:
Progress bar shows percentage as text below

Proposed Improvement:
Show percentage on hover over progress bar

Benefits:
- Cleaner UI
- Better user experience
- More space for content

Priority: LOW
```

---

### Template 4: Quick Request (Minimal)

Just describe what you want:

```
"Add dark mode to dashboard"
```

```
"Fix resume parsing for PDF files"
```

```
"Show skill count on dashboard stats"
```

AI will figure out the rest!

---

## What Happens Behind the Scenes

### AI's Internal Process

```python
# Pseudo-code of what AI does

def handle_user_request(request: str):
    # Step 1: Create Task (10 seconds)
    task_id = generate_next_task_id()  # TASK-005
    feature = detect_feature(request)   # "roadmap"
    task = create_task_file(task_id, feature, request)
    
    # Step 2: Load Context (< 30 seconds)
    rules = read_file("docs/ai-context/00_rules.md")
    memory = read_file("docs/ai-context/01_system_memory.md")
    registry = read_file("docs/ai-context/03_feature_registry.md")
    feature_doc = read_file(f"docs/ai-context/features/{feature}.md")
    
    # Step 3: Identify Files (5 seconds)
    owned_files = extract_owned_files(feature_doc)
    
    # Step 4: Implement (Variable)
    changes = implement_changes(owned_files, request)
    update_task_status(task_id, "IN_PROGRESS")
    
    # Step 5: Update Memory (< 2 minutes) - MANDATORY
    update_feature_doc(feature, changes)
    update_registry(feature, changes)
    update_api_reference(changes)
    update_task_file(task_id, changes)
    
    # Step 6: Complete (10 seconds)
    verify_completion(task_id)
    update_task_status(task_id, "DONE")
    archive_task(task_id)
    
    return f"✅ Task {task_id} completed!"
```

---

## Tips for Better Requests

### ✅ DO

**Be Specific:**
```
Good: "Add export to PDF button on roadmap page with progress indicators"
Better than: "Add export feature"
```

**Provide Context:**
```
Good: "Users want to print roadmaps for offline reference"
Better than: Just "Add PDF export"
```

**List Requirements:**
```
Good:
- Button should be visible on roadmap page
- PDF should include all roadmap data
- File size should be < 5MB
```

**Mention Priority:**
```
"Priority: HIGH - Users are requesting this frequently"
```

### ❌ DON'T

**Don't Be Vague:**
```
Bad: "Make it better"
Bad: "Fix the thing"
Bad: "Add stuff"
```

**Don't Mix Multiple Features:**
```
Bad: "Add PDF export, email notifications, and dark mode"
Good: Make 3 separate requests
```

**Don't Specify Implementation Details (unless necessary):**
```
Bad: "Use ReportLab library to generate PDF with canvas.drawString()"
Good: "Add PDF export feature" (AI will choose best approach)
```

---

## Tracking Your Request

### View Active Tasks

```bash
# List all active tasks
ls docs/tasks/TASK-*.md

# View specific task
cat docs/tasks/TASK-005.md
```

### View Completed Tasks

```bash
# List archived tasks
ls docs/tasks/archive/

# View completed task
cat docs/tasks/archive/TASK-005.md
```

### Check Task Status

Open the task file and look for:

```markdown
## Metadata
- **Status**: TODO | IN_PROGRESS | DONE
```

---

## Time Estimates

### Typical Timeline

| Phase | Time | What Happens |
|-------|------|--------------|
| Task Creation | 10 seconds | AI creates TASK-XXX.md |
| Context Loading | < 30 seconds | AI reads 4-5 files |
| File Identification | 5 seconds | AI finds owned files |
| Implementation | Variable | Depends on complexity |
| Memory Update | < 2 minutes | AI updates docs |
| Completion | 10 seconds | AI archives task |

### Complexity Examples

**Simple (5-15 minutes total):**
- Add button to UI
- Change text/styling
- Fix typo

**Medium (30-60 minutes total):**
- Add new API endpoint
- Add new UI component
- Modify existing feature

**Complex (2-4 hours total):**
- Add new feature module
- Integrate external service
- Major refactoring

---

## What You Get

### After Task Completion

1. **Working Feature** ✅
   - Code implemented
   - Tests passing
   - Ready to use

2. **Updated Documentation** 📚
   - Feature docs current
   - API reference updated
   - Registry updated

3. **Complete Audit Trail** 📋
   - Task file with full history
   - All files listed
   - Decisions documented

4. **No Technical Debt** 🎯
   - No orphaned code
   - No outdated docs
   - Clean implementation

---

## FAQ

### Q: Do I need to create the task file manually?
**A:** No! Just describe what you want. AI creates the task automatically.

### Q: How do I know which feature my request affects?
**A:** You don't need to! AI detects it automatically from keywords.

### Q: Can I request multiple features at once?
**A:** Better to make separate requests. Each gets its own task for better tracking.

### Q: What if I don't know the technical details?
**A:** That's fine! Just describe what you want in plain language.

### Q: How long does it take?
**A:** Simple features: 5-15 minutes. Complex features: 2-4 hours.

### Q: Will documentation be updated?
**A:** Yes! Automatically. It's mandatory before task completion.

### Q: Can I see the task history?
**A:** Yes! Check `docs/tasks/archive/` for completed tasks.

### Q: What if something goes wrong?
**A:** Each task has a rollback plan. AI can revert changes.

---

## Examples of Good Requests

### Example 1: New Feature
```
"Add ability to share learning roadmaps via public link.
Users should be able to generate a shareable URL that shows
their roadmap without requiring login. Include option to
hide progress if desired."
```

### Example 2: Bug Fix
```
"Resume upload fails when filename contains special characters
like apostrophes or quotes. Error: 'Invalid filename'.
Should accept all valid filename characters."
```

### Example 3: Enhancement
```
"Improve dashboard loading speed. Currently takes 3-5 seconds
to load all stats. Should load in < 1 second. Consider lazy
loading or caching."
```

### Example 4: UI Improvement
```
"Make the roadmap progress bars more visually appealing.
Add gradient colors, smooth animations, and show percentage
on hover. Match the overall app design style."
```

---

## Summary

### The Complete Flow

```
YOU → Make Request (natural language)
  ↓
AI → Creates Task (TASK-XXX.md)
  ↓
AI → Loads Context (< 30 seconds)
  ↓
AI → Identifies Files (owned files only)
  ↓
AI → Implements Changes (localized)
  ↓
AI → Updates Documentation (automatic & mandatory)
  ↓
AI → Marks Complete & Archives
  ↓
YOU → Feature Ready! 🎉
```

### Key Points

- ✅ Just describe what you want
- ✅ AI handles everything automatically
- ✅ Documentation always current
- ✅ Complete audit trail
- ✅ Fast and efficient (< 30 sec context load)
- ✅ No manual task creation needed

---

**Ready to request your first feature?**

Just tell the AI what you want, and watch the magic happen! 🚀

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-22  
**For Questions:** Check `docs/tasks/README.md` or `docs/tasks/EXECUTION_WORKFLOW.md`
