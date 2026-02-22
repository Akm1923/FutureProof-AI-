# AI Workflow Quick Reference

## 🎯 Purpose
Fast reference for AI agents working on FutureProof AI.

---

## 📋 Mandatory Checklist (Every Task)

```
□ Read 00_rules.md
□ Read 01_system_memory.md
□ Read 03_feature_registry.md
□ Identify affected feature(s)
□ Load feature doc (or create if missing)
□ Apply runtime patterns (if needed)
□ Make localized changes
□ Update feature doc (if behavior changed)
```

---

## ⚡ Quick Start

### Task: Modify Existing Feature

```bash
1. Load context (30 seconds)
   - 00_rules.md
   - 01_system_memory.md
   - 03_feature_registry.md
   - features/<feature>.md

2. Make changes
   - Modify only affected files
   - Follow runtime patterns

3. Update docs
   - Update features/<feature>.md if needed
```

### Task: Add New Feature

```bash
1. Load context (30 seconds)
   - 00_rules.md
   - 01_system_memory.md
   - 02_runtime_patterns.md

2. Implement feature
   - Backend: modules/<feature>/
   - Frontend: features/<feature>/

3. Document
   - Create features/<feature>.md
   - Register in 03_feature_registry.md
```

### Task: Fix Bug

```bash
1. Load context (30 seconds)
   - 00_rules.md
   - 01_system_memory.md
   - 03_feature_registry.md
   - features/<affected_feature>.md

2. Fix bug
   - Localized change only

3. Update docs (if needed)
   - Update feature doc if behavior changed
```

---

## 🚫 Never Do This

```
❌ List all files in repository
❌ Read entire codebase
❌ Analyze unrelated features
❌ Regenerate system memory
❌ Skip workflow steps
```

---

## ✅ Always Do This

```
✅ Read rules first
✅ Load only affected features
✅ Follow runtime patterns
✅ Make localized changes
✅ Update docs when needed
```

---

## 📊 Context Load Priority

```
Priority 1: 00_rules.md (MANDATORY)
Priority 2: 01_system_memory.md (MANDATORY)
Priority 3: 03_feature_registry.md (MANDATORY)
Priority 4: features/<feature>.md (CONDITIONAL)
Priority 5: 02_runtime_patterns.md (OPTIONAL)
```

---

## 🎨 Common Patterns

### Backend Endpoint
```
Pattern: Request Lifecycle
Location: 02_runtime_patterns.md
Apply: When creating API endpoints
```

### Frontend Component
```
Pattern: React Component Structure
Location: 02_runtime_patterns.md
Apply: When creating UI components
```

### AI Integration
```
Pattern: AI Processing Pipeline
Location: 02_runtime_patterns.md
Apply: When adding AI features
```

---

## 📁 File Locations

```
AI Context:     docs/ai-context/
Rules:          docs/ai-context/00_rules.md
System Memory:  docs/ai-context/01_system_memory.md
Patterns:       docs/ai-context/02_runtime_patterns.md
Registry:       docs/ai-context/03_feature_registry.md
Features:       docs/ai-context/features/

Backend:        backend/src/modules/
Frontend:       frontend/src/features/
Database:       database/migrations/
```

---

## 🔄 Update Triggers

| File | Update When |
|------|-------------|
| 00_rules.md | Workflow changes (rare) |
| 01_system_memory.md | Architecture changes (rare) |
| 02_runtime_patterns.md | New patterns emerge |
| 03_feature_registry.md | Features added/removed |
| features/*.md | Feature behavior changes |

---

## 📈 Efficiency Metrics

**Traditional Approach:**
- Context load: 5-30 minutes
- Files read: 50-100+
- Efficiency: 1x

**Pyramidal Approach:**
- Context load: < 30 seconds
- Files read: 4-5
- Efficiency: 10x

---

## 🎓 Learning Path

```
Day 1: Read 00_rules.md + 01_system_memory.md
Day 2: Review 02_runtime_patterns.md
Day 3: Explore 03_feature_registry.md
Day 4: Practice with small task
Day 5: Full feature implementation
```

---

## 💡 Pro Tips

1. **Always start with rules** - They prevent wasted time
2. **Trust the registry** - It knows all features
3. **Lazy load features** - Don't create docs upfront
4. **Follow patterns** - Consistency is key
5. **Update as you go** - Keep docs fresh

---

## 🆘 Troubleshooting

**Problem:** Don't know which feature to modify
**Solution:** Check 03_feature_registry.md

**Problem:** Don't know how to implement
**Solution:** Check 02_runtime_patterns.md

**Problem:** Need system overview
**Solution:** Read 01_system_memory.md

**Problem:** Feature doc missing
**Solution:** Create it (lazy load)

---

## Version: 1.0 | Updated: 2026-02-22
