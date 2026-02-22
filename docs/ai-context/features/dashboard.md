# Dashboard Feature

## Purpose
Central hub for user navigation and overview, providing quick access to all features, displaying active roadmaps, showing profile statistics, and adapting UI based on user state (first-time vs returning).

## Responsibilities
- Display user overview and statistics
- Show active learning roadmap with progress
- Provide quick action cards for all features
- Check if user has uploaded resume
- Adapt UI for first-time users (onboarding)
- Display profile completeness metrics
- Navigate to all major features
- Handle roadmap deletion
- Show user email and sign-out option

## User Flows Supported
1. **First-Time User**: No resume → Show centered upload prompt with onboarding
2. **Returning User**: Has resume → Show full dashboard with stats and actions
3. **Active Learner**: Has roadmap → Show "Continue Learning" card with progress
4. **Quick Navigation**: Click action cards → Navigate to features
5. **Roadmap Management**: Delete active roadmap → Refresh dashboard

## Backend Components

### Location
No dedicated backend module - dashboard aggregates data from other features

### API Calls Made
- `GET /api/roadmap/active/{user_id}` - Fetch active roadmap
- `DELETE /api/roadmap/{roadmap_id}` - Delete roadmap
- Supabase: Query resumes table to check if user has resume

## Frontend Components

### Location
`frontend/src/pages/Dashboard.jsx`
`frontend/src/features/dashboard/`
`frontend/src/components/Sidebar.jsx`
`frontend/src/components/Header.jsx`

### Structure
```
pages/
└── Dashboard.jsx          # Main dashboard page

features/dashboard/
├── components/            # Dashboard-specific components
├── hooks/                 # Dashboard hooks
├── pages/                 # Dashboard pages
└── services/              # Dashboard API calls

components/
├── Sidebar.jsx            # Navigation sidebar
└── Header.jsx             # Page header
```

### Key Components
- **Dashboard.jsx**: Main dashboard logic and UI
- **Sidebar**: Global navigation menu
- **Header**: Page title and subtitle

## UI States

### State 1: First-Time User (No Resume)
```
┌─────────────────────────────────────────┐
│  Header: Welcome to FutureProof AI     │
└─────────────────────────────────────────┘
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Welcome Message                  │ │
│  │  "Let's Start Your Career Journey"│ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  📤 Upload Your Resume            │ │
│  │  [Get Started Button]             │ │
│  │                                   │ │
│  │  What happens next?               │ │
│  │  1. AI extracts data              │ │
│  │  2. Review profile                │ │
│  │  3. Get insights                  │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### State 2: Returning User (Has Resume, No Roadmap)
```
┌─────────────────────────────────────────┐
│  Sidebar │  Career Intelligence         │
└─────────────────────────────────────────┘
│          │                              │
│  Nav     │  Stats Grid                  │
│  Menu    │  ┌────┐ ┌────┐ ┌────┐       │
│          │  │85% │ │ 42 │ │ 3  │       │
│          │  └────┘ └────┘ └────┘       │
│          │                              │
│          │  Action Cards                │
│          │  ┌──────────┐ ┌──────────┐  │
│          │  │ Update   │ │ Edit     │  │
│          │  │ Resume   │ │ Profile  │  │
│          │  └──────────┘ └──────────┘  │
│          │                              │
│          │  ┌────────────────────────┐ │
│          │  │ Create Learning Roadmap│ │
│          │  └────────────────────────┘ │
└─────────────────────────────────────────┘
```

### State 3: Active Learner (Has Roadmap)
```
┌─────────────────────────────────────────┐
│  Sidebar │  Career Intelligence         │
└─────────────────────────────────────────┘
│          │                              │
│  Nav     │  Stats Grid                  │
│  Menu    │  [Same as State 2]           │
│          │                              │
│          │  Continue Learning           │
│          │  ┌────────────────────────┐ │
│          │  │ 🌟 Active Roadmap      │ │
│          │  │ React, Node.js, Docker │ │
│          │  │ Progress: 45%          │ │
│          │  │ [Delete] [Continue →]  │ │
│          │  └────────────────────────┘ │
│          │                              │
│          │  Action Cards                │
│          │  [Same as State 2]           │
└─────────────────────────────────────────┘
```

## Data Flow

```
Dashboard Load
    ↓
Check Auth State
    ↓
Fetch User Data
  ├─ Check Resume Exists (Supabase)
  └─ Fetch Active Roadmap (Backend API)
    ↓
Determine UI State
  ├─ No Resume → First-Time UI
  ├─ Has Resume, No Roadmap → Full Dashboard
  └─ Has Resume + Roadmap → Dashboard with Active Roadmap
    ↓
Render Appropriate UI
    ↓
User Interactions
  ├─ Click "Upload Resume" → Navigate to /upload
  ├─ Click "Edit Profile" → Navigate to /form
  ├─ Click "Create Roadmap" → Navigate to /learning-roadmap
  ├─ Click "Continue Learning" → Navigate to /learning-roadmap (with state)
  └─ Click "Delete Roadmap" → Confirm → API call → Refresh
```

## Dependencies

### External Services
- **Supabase**: Query resumes table
- **Backend API**: Roadmap endpoints

### JavaScript Libraries
- `React`: UI framework
- `React Router`: Navigation
- `Axios`: HTTP client
- `React Hot Toast`: Notifications
- `Lucide React`: Icons

## Owned Files

### Frontend
- `frontend/src/pages/Dashboard.jsx` (PRIMARY)
- `frontend/src/features/dashboard/**`
- `frontend/src/components/Sidebar.jsx`
- `frontend/src/components/Header.jsx`

## Interaction With Other Features

### Dependencies
- **Auth**: Requires authenticated user
- **Resume**: Checks if user has resume
- **Roadmap**: Fetches and displays active roadmap

### Navigates To
- **Resume Upload**: `/upload`
- **Resume Form**: `/form`
- **Learning Roadmap**: `/learning-roadmap`
- **Skills Analytics**: `/skills-analytics`

### Displays Data From
- **Resume**: Profile completeness (85%)
- **Roadmap**: Active roadmap progress
- **Skills**: Skill match score (42)

## Key Features

### Adaptive UI
- Detects first-time users (no resume)
- Shows onboarding flow for new users
- Full dashboard for returning users
- Highlights active roadmap if exists

### Statistics Display
- **Profile Completeness**: 85% (calculated from resume data)
- **Skill Match Score**: 42 (placeholder for future feature)
- **Certifications**: 3 (placeholder for future feature)

### Active Roadmap Card
- Shows tech stacks in progress
- Displays overall progress percentage
- "Continue" button navigates with state
- "Delete" button removes roadmap
- Confirmation dialog before deletion

### Quick Actions
- **Update Resume**: Navigate to upload page
- **Edit Profile**: Navigate to form page
- **Create Roadmap**: Navigate to roadmap wizard

### Navigation
- **Sidebar**: Persistent navigation menu
- **Header**: Contextual page title
- **Sign Out**: User email + logout button

## Extension Points

### Adding New Stats
1. Add stat card to stats grid
2. Fetch data from appropriate API
3. Calculate metric
4. Display with icon and label

### Adding New Action Cards
1. Create card component
2. Add to action cards grid
3. Define navigation target
4. Add icon and description

### Customizing First-Time Experience
1. Modify first-time UI in Dashboard.jsx
2. Add additional onboarding steps
3. Create guided tour

## Performance Considerations
- Dashboard loads in < 500ms
- Parallel API calls (resume check + roadmap fetch)
- Optimistic UI updates for deletions
- Cached Supabase queries

## Error Handling
- Resume check failure → Assume no resume
- Roadmap fetch failure → Hide roadmap card
- Delete failure → Show error toast, don't refresh
- Network errors → Retry mechanism

## Future Enhancements
- Real-time statistics updates
- Activity feed (recent actions)
- Notifications center
- Quick stats charts (skill growth over time)
- Recommended actions based on profile
- Achievement badges
- Streak tracking
- Social features (share progress)
- Customizable dashboard layout
- Widget system

---

**Feature Status**: FULLY IMPLEMENTED  
**Last Updated**: 2026-02-22  
**Maintainer**: Development Team
