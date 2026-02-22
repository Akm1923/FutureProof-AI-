# FutureProof AI

AI-powered career development platform combining intelligent resume parsing with personalized learning roadmap generation.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.129-green.svg)](https://fastapi.tiangolo.com/)

---

## Features

🤖 **AI-Powered Resume Parsing**
- Upload PDF or image resumes
- Extract structured data (name, email, skills, experience, education)
- Powered by Groq AI for fast, accurate parsing

📚 **Personalized Learning Roadmaps**
- Get tech stack suggestions based on interests
- Generate day-by-day learning plans
- Track progress with calendar integration
- Milestone-based learning paths

📊 **Skills Analytics**
- Visualize skill progression
- Career trajectory insights
- Gap analysis and recommendations

🔐 **Secure Authentication**
- Supabase-powered auth
- Row-level security (RLS)
- User data isolation

---

## 🚀 Requesting New Features

Want to add a feature or report a bug? Just describe what you want!

```
"Add export to PDF feature for learning roadmaps"
```

The AI will automatically:
- Create a task
- Load context
- Implement changes
- Update documentation
- Complete in minutes!

**[📖 Read the Complete Guide →](docs/HOW_TO_REQUEST_FEATURES.md)**

---

## 🧠 Working with AI in New Sessions

This project uses a **Pyramidal Context System** for efficient AI collaboration.

### Quick Start (Every New Session)

**Load these 3 files first**:
```
1. docs/ai-context/00_rules.md
2. docs/ai-context/01_system_memory.md
3. docs/ai-context/03_feature_registry.md
```

### Example Prompts

**Bug Fix**:
```
Fix 404 error in calendar component.

Load:
- docs/ai-context/00_rules.md
- docs/ai-context/01_system_memory.md
- docs/ai-context/03_feature_registry.md
- docs/ai-context/features/roadmap.md

Error: Calendar calling /api/calendar/ instead of /api/roadmap/calendar/
```

**New Feature**:
```
Add PDF export to resume.

Load:
- docs/ai-context/00_rules.md
- docs/ai-context/01_system_memory.md
- docs/ai-context/03_feature_registry.md
- docs/HOW_TO_REQUEST_FEATURES.md
- docs/ai-context/features/resume.md

Create task and implement.
```

**📚 Complete Guides**:
- [Context Loading Guide](docs/ai-context/CONTEXT_LOADING_GUIDE.md) - How to efficiently load context
- [Example Prompts](docs/ai-context/EXAMPLE_PROMPTS.md) - Real-world examples

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase account
- Groq API key

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd FutureProof-AI
```

2. **Setup backend**
```bash
cd backend/src
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python main.py
```

3. **Setup frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

4. **Setup database**
- Create Supabase project
- Run migrations from `database/migrations/supabase-setup.sql`

For detailed setup instructions, see [SETUP_GUIDE.md](docs/SETUP_GUIDE.md)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│         Vite + React Router + Tailwind CSS          │
└────────────────────┬────────────────────────────────┘
                     │ REST API
┌────────────────────▼────────────────────────────────┐
│              Backend (FastAPI)                      │
│  ┌──────────────┐         ┌──────────────────┐    │
│  │Resume Module │         │ Roadmap Module   │    │
│  └──────────────┘         └──────────────────┘    │
└────────────────────┬────────────────────────────────┘
                     │ Supabase SDK
┌────────────────────▼────────────────────────────────┐
│         Supabase (PostgreSQL + Auth)                │
└─────────────────────────────────────────────────────┘
```

For detailed architecture, see [ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios
- Supabase Client

**Backend**
- FastAPI + Uvicorn
- Pydantic
- Groq AI + LangChain
- PyMuPDF + Tesseract OCR
- Supabase Python SDK

**Database**
- Supabase (PostgreSQL)
- Row Level Security (RLS)
- JSONB for flexible schema

---

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

For complete API reference, see [API_REFERENCE.md](docs/API_REFERENCE.md)

---

## Project Structure

```
FutureProof-AI/
├── frontend/              # React application
│   ├── src/
│   │   ├── features/      # Feature modules
│   │   ├── pages/         # Page components
│   │   ├── components/    # Shared components
│   │   └── lib/           # API client, Supabase
│   └── package.json
├── backend/               # FastAPI application
│   └── src/
│       ├── main.py        # App entry point
│       ├── modules/       # Feature modules
│       │   ├── resume/    # Resume parsing
│       │   └── roadmap/   # Roadmap generation
│       └── shared/        # Shared resources
├── database/              # SQL migrations
│   └── migrations/
└── docs/                  # Documentation
    ├── ARCHITECTURE.md
    ├── API_REFERENCE.md
    ├── SETUP_GUIDE.md
    └── ai-context/        # AI development workflow
```

---

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Setup Guide](docs/SETUP_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- **[How to Request Features](docs/HOW_TO_REQUEST_FEATURES.md)** ⭐ NEW
- [AI Development Workflow](docs/ai-context/README.md)

---

## Development

### Running Locally

**Backend:**
```bash
cd backend/src
python main.py
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Both (Windows):**
```bash
run_project.bat
```

### AI-Assisted Development

This project uses a pyramidal AI development workflow for efficient AI-assisted coding:

1. Read `docs/ai-context/00_rules.md` first
2. Follow the mandatory workflow
3. Load only relevant context
4. Make localized changes
5. Update feature documentation

See [AI Context README](docs/ai-context/README.md) for details.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## Roadmap

- [x] Resume parsing (PDF/Image)
- [x] Learning roadmap generation
- [x] Progress tracking
- [x] Calendar integration
- [ ] Skills analytics dashboard
- [ ] Export roadmaps (PDF/iCal)
- [ ] Mobile app
- [ ] Real-time collaboration
- [ ] Job board integration
- [ ] Gamification (badges, streaks)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Groq](https://groq.com) - Fast LLM inference
- [Supabase](https://supabase.com) - Backend-as-a-Service
- [FastAPI](https://fastapi.tiangolo.com) - Modern Python API framework
- [React](https://react.dev) - UI library
- [LangChain](https://langchain.com) - AI orchestration

---

## Support

- **Documentation**: Check `docs/` folder
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

