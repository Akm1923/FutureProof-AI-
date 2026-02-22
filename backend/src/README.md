# FutureProof AI - Unified Backend

## Overview

This is the unified FastAPI backend for FutureProof AI, combining resume parsing and learning roadmap generation into a single modular application.

## Architecture

```
backend/src/
├── main.py                      # Single FastAPI application entry point
├── modules/                     # Feature modules (isolated)
│   ├── resume/                  # Resume parsing module
│   │   ├── routes.py            # /api/resume/* endpoints
│   │   ├── services/
│   │   │   └── parser_service.py
│   │   ├── database.py
│   │   └── schemas.py
│   │
│   └── roadmap/                 # Learning roadmap module
│       ├── routes.py            # /api/roadmap/* endpoints
│       ├── services/
│       │   └── roadmap_generator.py
│       ├── database.py
│       └── schemas.py
│
└── shared/                      # Shared resources
    ├── config/
    │   └── settings.py          # Unified configuration
    ├── database/
    │   └── supabase.py          # Shared Supabase client
    ├── middleware/
    └── utils/
```

## API Endpoints

### Resume Module (`/api/resume`)
- `POST /api/resume/parse` - Parse uploaded resume
- `GET /api/resume/{candidate_id}` - Get resume by ID
- `PUT /api/resume/{candidate_id}` - Update resume

### Roadmap Module (`/api/roadmap`)
- `POST /api/roadmap/suggest-techstacks` - Get tech stack suggestions
- `POST /api/roadmap/generate` - Generate learning roadmap
- `GET /api/roadmap/{user_id}` - Get user's roadmap
- `PATCH /api/roadmap/{roadmap_id}/progress` - Update progress
- `GET /api/roadmap/active/{user_id}` - Get active roadmap
- `GET /api/roadmap/calendar/{user_id}` - Get calendar events
- `DELETE /api/roadmap/{roadmap_id}` - Delete roadmap

## Setup

1. Install dependencies:
```bash
cd backend/src
pip install -r requirements.txt
```

2. Configure environment variables in `.env`:
```
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
API_PORT=8000
```

3. Run the server:
```bash
python main.py
```

Or use the unified startup script from project root:
```bash
run_project.bat
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Benefits of Unified Architecture

1. **Single Server** - One FastAPI app instead of two
2. **Unified API Docs** - All endpoints in one place
3. **Shared Resources** - No duplicate code (DB clients, config, middleware)
4. **Module Isolation** - Each feature is self-contained
5. **Easy Deployment** - Deploy one application
6. **Better Maintainability** - Clear structure, easy to find code

## Adding New Modules

To add a new feature module:

1. Create module directory: `modules/your_module/`
2. Add `routes.py`, `services/`, `database.py`, `schemas.py`
3. Register routes in `main.py`:
```python
from modules.your_module.routes import router as your_router
app.include_router(your_router, prefix="/api/your-module", tags=["YourModule"])
```

## Development

- Hot reload is enabled by default
- Logs appear in the terminal
- Use `/health` endpoint to check server status
