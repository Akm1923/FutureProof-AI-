# Resume Feature

## Purpose
AI-powered resume parsing and management system that extracts structured data from PDF/image resumes and stores it in a user-editable format.

## Responsibilities
- Accept resume file uploads (PDF, DOC, DOCX, PNG, JPG)
- Extract text from documents using OCR (Tesseract) and PDF parsing (PyMuPDF)
- Parse extracted text using Groq AI to structure data
- Store parsed resume data in Supabase with RLS
- Retrieve and update resume data
- Provide editable form interface for manual corrections

## User Flows Supported
1. **First-time Upload**: User uploads resume → AI parses → User reviews/edits → Save to profile
2. **Update Resume**: User uploads new version → Replaces existing data
3. **Manual Edit**: User directly edits resume fields without upload
4. **View Resume**: Retrieve and display stored resume data

## Backend Components

### Location
`backend/src/modules/resume/`

### Structure
```
resume/
├── routes.py              # API endpoints
├── services/
│   └── parser_service.py  # AI parsing logic
├── database.py            # Supabase operations
└── schemas.py             # Pydantic models
```

### Key Classes
- `ResumeParser`: Handles file processing and AI extraction
- `ResumeDatabase`: Manages Supabase CRUD operations

### Services
- **parser_service.py**: Text extraction (PyMuPDF, Tesseract) + AI parsing (Groq + LangChain)

## Frontend Components

### Location
`frontend/src/features/resume/`
`frontend/src/pages/ResumeUpload.jsx`
`frontend/src/pages/ResumeForm.jsx`

### Structure
```
features/resume/
├── components/    # Resume-specific UI components
├── hooks/         # Custom hooks for resume operations
├── services/      # API communication
└── pages/         # Page components
```

### Key Pages
- **ResumeUpload.jsx**: Drag-and-drop file upload interface
- **ResumeForm.jsx**: Editable form for resume data

## API Endpoints

### POST /api/resume/parse
Parse uploaded resume file
- **Input**: multipart/form-data (file, user_id)
- **Output**: Structured JSON + candidate_id
- **Process**: File → Text extraction → AI parsing → DB storage

### GET /api/resume/{candidate_id}
Retrieve resume by ID
- **Input**: candidate_id (UUID)
- **Output**: Resume data object

### PUT /api/resume/{candidate_id}
Update existing resume
- **Input**: candidate_id + updated data (JSON)
- **Output**: Success confirmation

## Data Flow

```
User Upload
    ↓
File (PDF/Image)
    ↓
[Text Extraction]
  - PyMuPDF (PDF)
  - Tesseract (Image)
    ↓
Raw Text String
    ↓
[AI Parsing - Groq]
  - LangChain prompt
  - Structured extraction
    ↓
Structured JSON
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "skills": {
    "technical": [...],
    "tools": [...],
    "domain": [...]
  },
  "experience": [...],
  "education": [...]
}
    ↓
[Supabase Storage]
  - resumes table
  - JSONB column
  - RLS policies
    ↓
Frontend Display
```

## Dependencies

### External Services
- **Groq AI**: LLM for intelligent parsing
- **LangChain**: AI orchestration framework
- **Supabase**: Database + Auth

### Python Libraries
- `PyMuPDF`: PDF text extraction
- `Tesseract`: OCR for images
- `Pillow`: Image processing
- `FastAPI`: API framework
- `Pydantic`: Data validation

### JavaScript Libraries
- `Axios`: HTTP client
- `React`: UI framework
- `React Hot Toast`: Notifications

## Database Schema

### Table: resumes
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  data JSONB NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### RLS Policies
- Users can only view/edit their own resumes
- Service role has full access

## Owned Files

### Backend
- `backend/src/modules/resume/__init__.py`
- `backend/src/modules/resume/routes.py`
- `backend/src/modules/resume/database.py`
- `backend/src/modules/resume/schemas.py`
- `backend/src/modules/resume/services/__init__.py`
- `backend/src/modules/resume/services/parser_service.py`
- `backend/src/modules/resume/schemas_data/` (schema definitions)

### Frontend
- `frontend/src/features/resume/**`
- `frontend/src/pages/ResumeUpload.jsx`
- `frontend/src/pages/ResumeForm.jsx`
- `frontend/src/lib/api.js` (parseResume, getResume, updateResume functions)

### Database
- `database/migrations/supabase-setup.sql` (resumes table section)

## Interaction With Other Features

### Dependencies
- **Auth**: Requires user authentication (user_id for RLS)
- **Dashboard**: Dashboard checks if user has resume to show appropriate UI

### Provides Data To
- **Roadmap**: User skills extracted from resume feed into roadmap generation
- **Skills Analytics**: Resume data used for skill visualization
- **Dashboard**: Resume completeness metrics

## Extension Points

### Adding New Resume Fields
1. Update AI parsing prompt in `parser_service.py`
2. Update Pydantic schemas in `schemas.py`
3. Update frontend form in `ResumeForm.jsx`
4. No database migration needed (JSONB is flexible)

### Supporting New File Formats
1. Add file type handler in `parser_service.py`
2. Update file validation in `ResumeUpload.jsx`
3. Add appropriate parsing library

### Improving Parsing Accuracy
1. Refine LangChain prompts in `parser_service.py`
2. Add post-processing validation
3. Implement confidence scoring

## ASCII Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (ResumeUpload)         │
│  - Drag & drop interface                │
│  - File validation                      │
└──────────────┬──────────────────────────┘
               │ POST /api/resume/parse
               │ (multipart/form-data)
┌──────────────▼──────────────────────────┐
│         Backend (routes.py)             │
│  - Receive file upload                  │
│  - Validate file type                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    ResumeParser (parser_service.py)     │
│  ┌─────────────────────────────────┐   │
│  │  1. Text Extraction             │   │
│  │     - PyMuPDF (PDF)             │   │
│  │     - Tesseract (Image)         │   │
│  └──────────┬──────────────────────┘   │
│             │                           │
│  ┌──────────▼──────────────────────┐   │
│  │  2. AI Parsing (Groq)           │   │
│  │     - LangChain prompt          │   │
│  │     - Structured extraction     │   │
│  └──────────┬──────────────────────┘   │
└─────────────┼───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│   ResumeDatabase (database.py)          │
│  - store_resume()                       │
│  - get_resume()                         │
│  - update_resume()                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Supabase (PostgreSQL)              │
│  - resumes table (JSONB)                │
│  - RLS policies                         │
│  - Automatic timestamps                 │
└─────────────────────────────────────────┘
```

## Performance Considerations
- File size limit: 10MB
- Parsing time: 5-15 seconds (depends on file size and AI response)
- OCR processing: CPU-intensive for images
- Database: JSONB allows flexible schema but slower queries than normalized tables

## Error Handling
- Invalid file format → 400 Bad Request
- Parsing failure → 500 Internal Server Error with details
- Missing user_id → RLS blocks insert
- File too large → Client-side validation
- **CORS errors** → Ensure frontend port is in CORS_ORIGINS (backend/src/shared/config/settings.py)

## Troubleshooting

### CORS Errors
If you see "Network Error" or CORS policy errors in browser console:

1. **Check frontend port**: Note which port your frontend is running on (e.g., 3001, 5173)
2. **Update backend CORS**: Add your port to `CORS_ORIGINS` in `backend/src/shared/config/settings.py`
3. **Restart backend**: Changes require backend restart
4. **Verify**: Check browser console - CORS errors should be gone

**Common ports:**
- `http://localhost:5173` - Vite default
- `http://localhost:3000` - Create React App default
- `http://localhost:3001` - Alternative port

## Future Enhancements
- Batch resume processing
- Resume comparison/diff
- Export to standard formats (JSON, XML)
- Resume scoring/completeness metrics
- Multi-language support
- Resume templates

---

**Feature Status**: FULLY IMPLEMENTED  
**Last Updated**: 2026-02-22  
**Maintainer**: Development Team
