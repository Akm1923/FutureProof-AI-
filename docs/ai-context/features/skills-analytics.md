# Skills Analytics Feature

## Purpose
Visualize user skills, track skill growth over time, analyze skill gaps, and provide career insights based on resume data and learning progress.

## Responsibilities
- Display user's technical and tool skills
- Visualize skill distribution
- Track skill acquisition over time
- Identify skill gaps for target roles
- Show learning progress from roadmaps
- Provide career recommendations
- Compare skills with industry standards

## User Flows Supported
1. **View Skills**: Navigate to analytics → See skill breakdown
2. **Track Growth**: View skill acquisition timeline
3. **Gap Analysis**: Compare current skills with target role
4. **Progress Tracking**: See skills gained from completed roadmaps

## Backend Components

### Location
No dedicated backend module currently - reads from resume and roadmap data

### Future Backend Needs
- Skill taxonomy/categorization
- Industry skill benchmarks
- Skill trend analysis
- Career path recommendations

## Frontend Components

### Location
`frontend/src/pages/SkillsAnalytics.jsx`
`frontend/src/features/skills-analytics/`

### Structure
```
pages/
└── SkillsAnalytics.jsx    # Main analytics page

features/skills-analytics/
├── components/            # Chart components, skill cards
├── hooks/                 # Analytics hooks
├── pages/                 # Analytics pages
└── services/              # Analytics calculations
```

### Key Components
- **SkillsAnalytics.jsx**: Main analytics dashboard
- **SkillChart**: Visualization components (future)
- **SkillCard**: Individual skill display (future)

## Data Sources

### Resume Data
- Technical skills from `resume.data.skills.technical`
- Tool skills from `resume.data.skills.tools`
- Domain skills from `resume.data.skills.domain`

### Roadmap Data
- Completed roadmaps → Skills acquired
- In-progress roadmaps → Skills being learned
- Progress percentage per skill

### Future Data Sources
- Job postings (skill requirements)
- Industry benchmarks
- Peer comparisons

## Data Flow

```
User Navigates to Analytics
    ↓
Fetch Resume Data (Supabase)
  - Extract skills.technical
  - Extract skills.tools
  - Extract skills.domain
    ↓
Fetch Roadmap Data (Backend API)
  - Get completed roadmaps
  - Get in-progress roadmaps
  - Calculate skills gained
    ↓
Process Data
  - Categorize skills
  - Count skills per category
  - Calculate growth over time
  - Identify gaps
    ↓
Render Visualizations
  - Skill distribution chart
  - Growth timeline
  - Gap analysis
  - Recommendations
```

## Dependencies

### External Services
- **Supabase**: Resume data
- **Backend API**: Roadmap data

### JavaScript Libraries
- `React`: UI framework
- `Lucide React`: Icons
- Future: Chart library (Chart.js, Recharts, D3.js)

## Owned Files

### Frontend
- `frontend/src/pages/SkillsAnalytics.jsx` (PRIMARY)
- `frontend/src/features/skills-analytics/**`

## Interaction With Other Features

### Dependencies
- **Auth**: Requires authenticated user
- **Resume**: Primary data source for skills
- **Roadmap**: Skills gained from completed roadmaps

### Provides To
- **Dashboard**: Skill match score
- **Roadmap**: Skill gap identification for recommendations

## Current Implementation Status

### Implemented
- Page structure
- Navigation integration
- Basic layout

### Not Yet Implemented
- Skill visualization charts
- Growth tracking
- Gap analysis
- Career recommendations
- Skill categorization
- Comparison features

## Planned Features

### Skill Distribution
- Pie chart: Technical vs Tools vs Domain
- Bar chart: Skills per category
- Tag cloud: Skill frequency

### Growth Timeline
- Line chart: Skills acquired over time
- Milestone markers: Roadmap completions
- Trend analysis: Learning velocity

### Gap Analysis
- Compare current skills with target role
- Highlight missing skills
- Recommend learning paths
- Estimate time to proficiency

### Career Insights
- Skill demand trends
- Salary correlation
- Job match percentage
- Career path suggestions

## Extension Points

### Adding Visualizations
1. Choose chart library (Chart.js recommended)
2. Create chart components in `features/skills-analytics/components/`
3. Process data for chart format
4. Render in SkillsAnalytics.jsx

### Adding Skill Taxonomy
1. Define skill categories (frontend, backend, devops, etc.)
2. Create mapping function
3. Auto-categorize skills from resume
4. Allow manual categorization

### Adding Benchmarking
1. Collect industry skill data
2. Create comparison algorithm
3. Display user vs industry average
4. Highlight strengths and gaps

## ASCII Architecture

```
┌──────────────────────────────────────────┐
│    Frontend (SkillsAnalytics.jsx)        │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Fetch Resume Data (Supabase)            │
│  - skills.technical                      │
│  - skills.tools                          │
│  - skills.domain                         │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Fetch Roadmap Data (Backend API)        │
│  - Completed roadmaps                    │
│  - In-progress roadmaps                  │
│  - Skills gained                         │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Process & Analyze                       │
│  ┌────────────────────────────────────┐ │
│  │ 1. Categorize skills               │ │
│  │ 2. Count per category              │ │
│  │ 3. Calculate growth                │ │
│  │ 4. Identify gaps                   │ │
│  │ 5. Generate recommendations        │ │
│  └────────────────────────────────────┘ │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│  Render Visualizations                   │
│  ┌────────────┐  ┌────────────┐         │
│  │ Skill Dist │  │ Growth     │         │
│  │ Chart      │  │ Timeline   │         │
│  └────────────┘  └────────────┘         │
│  ┌────────────┐  ┌────────────┐         │
│  │ Gap        │  │ Career     │         │
│  │ Analysis   │  │ Insights   │         │
│  └────────────┘  └────────────┘         │
└──────────────────────────────────────────┘
```

## Performance Considerations
- Data fetching: < 500ms
- Chart rendering: Lazy load on scroll
- Large skill sets: Pagination or virtualization
- Real-time updates: Debounced

## Future Enhancements
- Interactive charts (drill-down)
- Export analytics to PDF
- Share analytics publicly
- Skill endorsements (social feature)
- Skill assessments/quizzes
- Certification tracking
- Learning recommendations based on gaps
- Integration with job boards
- Skill demand forecasting
- Peer skill comparison

---

**Feature Status**: PARTIALLY IMPLEMENTED (Structure only)  
**Implementation Priority**: MEDIUM  
**Last Updated**: 2026-02-22  
**Maintainer**: Development Team
