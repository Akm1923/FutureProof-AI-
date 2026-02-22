# Learning Roadmap Feature

## Purpose
AI-powered personalized learning roadmap generation system that creates day-by-day learning plans based on user interests, current skills, and career goals with progress tracking and calendar integration.

## Responsibilities
- Analyze user interests and suggest relevant tech stacks
- Generate comprehensive day-by-day learning plans
- Create project-based milestones
- Track daily progress with checkboxes
- Integrate with calendar for scheduling
- Store and retrieve roadmaps with progress state
- Auto-add completed skills to user profile
- Support multiple concurrent roadmaps

## User Flows Supported
1. **Create New Roadmap**: Enter interests → Get suggestions → Select stacks → Configure duration/level → Generate roadmap
2. **Continue Existing**: Load active roadmap → Track progress → Mark days complete
3. **Progress Tracking**: Check off completed days → Auto-calculate progress → Celebrate milestones
4. **Skill Addition**: Complete 100% of roadmap → Auto-add skill to resume
5. **Calendar View**: View roadmap events by month/year
6. **Delete Roadmap**: Remove roadmap and all progress

## Backend Components

### Location
`backend/src/modules/roadmap/`

### Structure
```
roadmap/
├── routes.py                      # API endpoints
├── services/
│   └── roadmap_generator.py      # AI generation logic
├── database.py                    # Supabase operations
└── schemas.py                     # Pydantic models
```

### Key Classes
- `RoadmapGenerator`: AI-powered roadmap creation using Groq + LangChain
- `LearningRoadmapDB`: Database operations for roadmaps and progress

### Services
- **roadmap_generator.py**: 
  - `suggest_techstacks()`: Analyze interests and recommend technologies
  - `generate_roadmap()`: Create detailed day-by-day learning plan

## Frontend Components

### Location
`frontend/src/features/learning-roadmap/`
`frontend/src/pages/LearningRoadmap.jsx`

### Structure
```
features/learning-roadmap/
├── components/    # Roadmap-specific UI components
├── hooks/         # Custom hooks for roadmap operations
├── services/      # API communication
└── pages/         # Page components
```

### Key Pages
- **LearningRoadmap.jsx**: Multi-step wizard + progress tracking interface

### UI Flow
1. Choice screen (continue existing or create new)
2. Step 1: Enter interests
3. Step 2: Select tech stacks (with "already known" indicators)
4. Step 3: Configure duration and skill level
5. Step 4: View generated roadmap with progress tracking

## API Endpoints

### POST /api/roadmap/suggest-techstacks
Get AI-generated tech stack suggestions
- **Input**: `{ interests: [...], user_skills: [...] }`
- **Output**: Array of tech stack suggestions with metadata
- **AI Process**: Analyze interests → Match technologies → Score relevance

### POST /api/roadmap/generate
Generate detailed learning roadmap
- **Input**: `{ user_id, selections: [...], user_skills: [...] }`
- **Output**: `{ roadmap_id, roadmaps: [...] }`
- **AI Process**: For each selection → Create day-by-day plan → Add projects → Define milestones

### GET /api/roadmap/{user_id}
Get user's latest roadmap
- **Output**: Roadmap with progress data

### GET /api/roadmap/active/{user_id}
Get user's active roadmap
- **Output**: `{ active: boolean, roadmap: {...} }`

### PATCH /api/roadmap/{roadmap_id}/progress
Update progress for specific day
- **Input**: `{ tech_stack, day, completed: boolean }`
- **Side Effect**: If 100% complete → Add skill to resume

### GET /api/roadmap/calendar/{user_id}
Get calendar events for month/year
- **Input**: Query params `month`, `year`
- **Output**: Array of calendar events with dates

### DELETE /api/roadmap/{roadmap_id}
Delete roadmap and all progress

## Data Flow

```
User Interests
    ↓
[AI Suggestion - Groq]
  - Analyze interests
  - Match tech stacks
  - Score relevance
  - Check existing skills
    ↓
Tech Stack Options
(with "already known" flags)
    ↓
User Selection
  - Chosen stacks
  - Duration (7-90 days)
  - Skill level (beginner/intermediate/advanced)
    ↓
[AI Generation - Groq]
  - Day-by-day breakdown
  - Topics per day
  - Hands-on tasks
  - Checkpoints
  - Projects
  - Capstone project
  - Resource gathering (DuckDuckGo)
    ↓
Structured Roadmap
{
  "tech_stack": "React Ecosystem",
  "duration_days": 30,
  "skill_level": "beginner",
  "overview": "...",
  "daily_plan": [
    {
      "day": 1,
      "title": "...",
      "focus": "...",
      "topics": [...],
      "hands_on_tasks": [...],
      "checkpoint": "...",
      "estimated_hours": 4
    }
  ],
  "projects": [...],
  "capstone_project": {...}
}
    ↓
[Supabase Storage]
  - learning_roadmaps table
  - JSONB roadmaps column
  - JSONB progress column
  - is_active flag
    ↓
Frontend Display
  - Progress tracking
  - Calendar integration
  - Checkbox completion
```

## Dependencies

### External Services
- **Groq AI**: Fast LLM inference for roadmap generation
- **LangChain**: AI orchestration and prompting
- **DuckDuckGo Search**: Resource gathering for learning materials
- **Supabase**: Database + Auth

### Python Libraries
- `groq`: Groq API client
- `langchain`: AI framework
- `langchain-groq`: Groq integration
- `duckduckgo-search`: Web search
- `FastAPI`: API framework
- `Pydantic`: Data validation

### JavaScript Libraries
- `Axios`: HTTP client
- `React`: UI framework
- `React Hot Toast`: Notifications
- `Lucide React`: Icons

## Database Schema

### Table: learning_roadmaps
```sql
CREATE TABLE learning_roadmaps (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  roadmaps JSONB NOT NULL,
  progress JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  last_accessed TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Indexes
- `idx_learning_roadmaps_user_id` on user_id
- `idx_learning_roadmaps_active` on (user_id, is_active)
- `idx_learning_roadmaps_created_at` on created_at DESC

### RLS Policies
- Users can read/write their own roadmaps
- Service role has full access

## Owned Files

### Backend
- `backend/src/modules/roadmap/__init__.py`
- `backend/src/modules/roadmap/routes.py`
- `backend/src/modules/roadmap/database.py`
- `backend/src/modules/roadmap/schemas.py`
- `backend/src/modules/roadmap/services/__init__.py`
- `backend/src/modules/roadmap/services/roadmap_generator.py`

### Frontend
- `frontend/src/features/learning-roadmap/**`
- `frontend/src/pages/LearningRoadmap.jsx`

### Database
- `database/migrations/supabase-setup.sql` (learning_roadmaps table section)
- `database/migrations/learning-roadmap-table-only.sql`

## Interaction With Other Features

### Dependencies
- **Auth**: Requires user authentication (user_id)
- **Resume**: Reads user skills to:
  - Mark "already known" tech stacks
  - Personalize roadmap difficulty
  - Auto-add completed skills back to resume

### Provides Data To
- **Dashboard**: Active roadmap display with progress
- **Calendar**: Roadmap events for scheduling
- **Skills Analytics**: Learning progress data
- **Resume**: Completed skills added automatically

### Integrates With
- **Dashboard**: "Continue Learning" card shows active roadmap
- **Resume**: 100% completion triggers skill addition

## Extension Points

### Adding New Roadmap Types
1. Create new generation prompt in `roadmap_generator.py`
2. Add new schema in `schemas.py`
3. Update frontend selection UI

### Customizing AI Generation
1. Modify prompts in `roadmap_generator.py`
2. Adjust duration/difficulty mappings
3. Add new resource types

### Progress Tracking Enhancements
1. Add milestone celebrations
2. Implement streak tracking
3. Add gamification (badges, points)

### Calendar Integration
1. Export to iCal format
2. Sync with Google Calendar
3. Add reminders/notifications

## ASCII Architecture

```
┌──────────────────────────────────────────┐
│    Frontend (LearningRoadmap.jsx)        │
│  Step 1: Enter Interests                 │
└──────────────┬───────────────────────────┘
               │ POST /suggest-techstacks
               ▼
┌──────────────────────────────────────────┐
│   RoadmapGenerator (AI Suggestion)       │
│  - Analyze interests                     │
│  - Match technologies                    │
│  - Score relevance                       │
│  - Check user skills                     │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│    Frontend (Step 2: Select Stacks)      │
│  - Display suggestions                   │
│  - Mark "already known" (green)          │
│  - Multi-select                          │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│    Frontend (Step 3: Configure)          │
│  - Set duration (7-90 days)              │
│  - Set skill level                       │
└──────────────┬───────────────────────────┘
               │ POST /generate
               ▼
┌──────────────────────────────────────────┐
│   RoadmapGenerator (AI Generation)       │
│  For each tech stack:                    │
│  ┌────────────────────────────────────┐  │
│  │ 1. Create daily breakdown          │  │
│  │ 2. Add topics & tasks              │  │
│  │ 3. Define checkpoints              │  │
│  │ 4. Create projects                 │  │
│  │ 5. Design capstone                 │  │
│  │ 6. Gather resources (DuckDuckGo)   │  │
│  └────────────────────────────────────┘  │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│   LearningRoadmapDB (database.py)        │
│  - store_roadmap()                       │
│  - get_user_roadmap()                    │
│  - update_progress()                     │
│  - get_calendar_events()                 │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│      Supabase (PostgreSQL)               │
│  - learning_roadmaps table               │
│  - JSONB roadmaps & progress             │
│  - RLS policies                          │
└──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│    Frontend (Step 4: Track Progress)     │
│  - Display day-by-day plan               │
│  - Checkbox completion                   │
│  - Progress bars                         │
│  - Calendar view                         │
│  - "Add to Skills" button                │
└──────────────────────────────────────────┘
```

## Key Features

### "Already Known" Detection
- Compares suggested tech stacks with user's resume skills
- Displays green overlay on known technologies
- Helps users focus on new learning

### Progress Tracking
- Checkbox for each day
- Real-time progress calculation
- Visual progress bars per tech stack
- Overall progress percentage

### Auto-Skill Addition
- When roadmap reaches 100% completion
- Automatically adds skill to user's resume
- Shows celebration toast notification
- Updates skills analytics

### Calendar Integration
- Converts roadmap days to actual calendar dates
- Supports month/year filtering
- Includes both daily tasks and projects
- Calculates dates from roadmap start_date

### Multi-Roadmap Support
- Users can have multiple active roadmaps
- Choice screen: continue existing or create new
- Each roadmap tracked independently

## Performance Considerations
- AI generation: 10-30 seconds per tech stack
- Parallel generation for multiple stacks
- Progress updates: Optimistic UI updates
- Calendar queries: Indexed by user_id and date

## Error Handling
- Invalid interests → 400 Bad Request
- AI generation failure → 500 with retry suggestion
- Progress update failure → Revert optimistic update
- Missing roadmap → 404 Not Found
- **404 errors** → Verify frontend is calling correct endpoints with `/api/roadmap/` prefix

## Troubleshooting

### 404 Not Found Errors
If you see "Request failed with status code 404" when using roadmap features:

1. **Check API endpoints**: Frontend must call endpoints with `/api/roadmap/` prefix
2. **Verify backend is running**: Backend should be on port 8000
3. **Check endpoint paths**:
   - ✅ Correct: `POST /api/roadmap/suggest-techstacks`
   - ❌ Wrong: `POST /api/suggest-techstacks`
   - ✅ Correct: `POST /api/roadmap/generate`
   - ❌ Wrong: `POST /api/generate-roadmap`
   - ✅ Correct: `GET /api/roadmap/calendar/{user_id}`
   - ❌ Wrong: `GET /api/calendar/{user_id}`

**Common mistakes:**
- Missing `/roadmap` prefix in API calls
- Using old endpoint names (e.g., `generate-roadmap` instead of `generate`)
- Calendar calling `/api/calendar/` instead of `/api/roadmap/calendar/`
- Backend not running or running on wrong port

### 500 Internal Server Errors
If you see "Request failed with status code 500" when generating roadmaps:

1. **Check Groq API Key**:
   - Verify `GROQ_API_KEY` is set in `backend/src/.env`
   - Get key from https://console.groq.com
   - Key should start with `gsk_`

2. **Check Backend Logs**:
   - Look at backend terminal output
   - Error message will show specific issue
   - Common errors:
     - "Invalid API key"
     - "Rate limit exceeded"
     - "Connection timeout"

3. **Verify Dependencies**:
   ```bash
   cd backend/src
   pip install -r requirements.txt
   ```

4. **Test API Key**:
   - Try a simple request first
   - Check Groq API status
   - Verify API key hasn't expired

5. **Restart Backend**:
   ```bash
   # Stop backend (Ctrl+C)
   # Restart
   python main.py
   ```

**Common causes:**
- Missing or invalid GROQ_API_KEY
- Groq API rate limits exceeded
- Network connectivity issues
- Missing Python dependencies

## Future Enhancements
- Real-time collaboration on roadmaps
- Roadmap templates (pre-built paths)
- Integration with online courses (Udemy, Coursera)
- Peer learning groups
- Mentor matching
- Export to PDF/iCal
- Mobile app with push notifications
- Gamification (streaks, badges, leaderboards)

---

**Feature Status**: FULLY IMPLEMENTED  
**Last Updated**: 2026-02-22  
**Maintainer**: Development Team
