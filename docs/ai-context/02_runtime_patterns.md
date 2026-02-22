# Runtime Patterns - FutureProof AI

## Purpose
Reusable architectural patterns for implementing features.
Use these patterns to maintain consistency across the codebase.

---

## Backend Patterns

### Pattern 1: Request Lifecycle

```
HTTP Request Flow
─────────────────

Client Request
    ↓
FastAPI App (main.py)
    ↓
CORS Middleware
    ↓
Router (module-specific)
    ↓
Route Handler (routes.py)
    ├─ Validate input (Pydantic schema)
    ├─ Extract parameters
    └─ Call service layer
    ↓
Service Layer (services/)
    ├─ Business logic
    ├─ AI processing (if needed)
    ├─ Data transformation
    └─ Call database layer
    ↓
Database Layer (database.py)
    ├─ Supabase operations
    ├─ Query execution
    └─ Error handling
    ↓
Response
    ├─ Serialize with Pydantic
    └─ Return JSON
    ↓
Client receives response
```

**Apply when:** Creating any new API endpoint

---

### Pattern 2: Module Structure

```
modules/<feature>/
├── __init__.py
├── routes.py           # API endpoints
├── services/           # Business logic
│   └── <service>.py
├── database.py         # Data access
└── schemas.py          # Pydantic models
```

**Routes Layer:**
- Define endpoints with decorators (`@router.post`, `@router.get`)
- Validate input with Pydantic schemas
- Handle HTTP concerns (status codes, headers)
- Call service layer
- Return response models

**Services Layer:**
- Pure business logic
- No HTTP concerns
- AI/ML operations
- Data transformation
- External API calls

**Database Layer:**
- Supabase client wrapper
- CRUD operations
- Query building
- Transaction handling
- Error mapping

**Schemas Layer:**
- Request models (input validation)
- Response models (output serialization)
- Internal data models

**Apply when:** Creating new backend module

---

### Pattern 3: AI Processing Pipeline

```
AI Processing Flow
──────────────────

Input Data
    ↓
[Preprocessing]
    ├─ Text extraction (if file)
    ├─ Data cleaning
    └─ Format conversion
    ↓
[AI Service Call]
    ├─ Build prompt (LangChain)
    ├─ Call Groq API
    └─ Stream/await response
    ↓
[Postprocessing]
    ├─ Parse AI output
    ├─ Validate structure
    └─ Transform to schema
    ↓
[Storage]
    ├─ Save to database
    └─ Return result
    ↓
Structured Output
```

**Apply when:** Integrating AI/LLM features

**Example:** Resume parsing, roadmap generation

---

### Pattern 4: Database Operations

```python
# Pattern: Database class wrapper

class FeatureDatabase:
    def __init__(self):
        self.client = get_supabase_client()
    
    def create(self, data: dict, user_id: str):
        """Create new record"""
        result = self.client.table('table_name').insert({
            'user_id': user_id,
            'data': data
        }).execute()
        return result.data[0]
    
    def get(self, record_id: str):
        """Get record by ID"""
        result = self.client.table('table_name').select('*').eq('id', record_id).execute()
        if not result.data:
            raise Exception("Not found")
        return result.data[0]
    
    def update(self, record_id: str, data: dict):
        """Update record"""
        result = self.client.table('table_name').update(data).eq('id', record_id).execute()
        return result.data[0]
    
    def delete(self, record_id: str):
        """Delete record"""
        self.client.table('table_name').delete().eq('id', record_id).execute()
        return True
```

**Apply when:** Creating database access layer

---

### Pattern 5: Error Handling

```python
# Pattern: Consistent error handling

from fastapi import HTTPException

@router.post("/endpoint")
async def endpoint_handler(data: RequestModel):
    try:
        # Business logic
        result = service.process(data)
        return {"success": True, "data": result}
    
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception as e:
        # Log error
        print(f"ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
```

**Apply when:** Implementing route handlers

---

## Frontend Patterns

### Pattern 6: Feature Structure

```
features/<feature>/
├── components/         # Feature-specific components
│   ├── <Component>.jsx
│   └── index.js
├── hooks/              # Custom hooks
│   └── use<Feature>.js
├── services/           # API calls
│   └── <feature>Service.js
└── pages/              # Page components
    └── <Page>.jsx
```

**Apply when:** Creating new frontend feature

---

### Pattern 7: API Communication

```javascript
// Pattern: API service layer

// lib/api.js - Base client
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// features/<feature>/services/<feature>Service.js
import { api } from '@/lib/api'

export const featureService = {
  async create(data) {
    const response = await api.post('/api/feature', data)
    return response.data
  },
  
  async get(id) {
    const response = await api.get(`/api/feature/${id}`)
    return response.data
  },
  
  async update(id, data) {
    const response = await api.put(`/api/feature/${id}`, data)
    return response.data
  }
}
```

**Apply when:** Creating API service layer

---

### Pattern 8: React Component Structure

```javascript
// Pattern: Feature component

import { useState, useEffect } from 'react'
import { featureService } from '../services/featureService'
import toast from 'react-hot-toast'

export default function FeatureComponent() {
  // State
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Effects
  useEffect(() => {
    loadData()
  }, [])
  
  // Handlers
  const loadData = async () => {
    try {
      setLoading(true)
      const result = await featureService.get()
      setData(result)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSubmit = async (formData) => {
    try {
      await featureService.create(formData)
      toast.success('Success!')
      loadData()
    } catch (error) {
      toast.error('Failed to submit')
    }
  }
  
  // Render
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

**Apply when:** Creating feature components

---

### Pattern 9: Protected Routes

```javascript
// Pattern: Authentication wrapper

import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return user ? children : <Navigate to="/login" />
}

// Usage in App.jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

**Apply when:** Creating authenticated routes

---

### Pattern 10: Context Usage

```javascript
// Pattern: React Context for global state

// context/FeatureContext.jsx
import { createContext, useContext, useState } from 'react'

const FeatureContext = createContext()

export function FeatureProvider({ children }) {
  const [state, setState] = useState(initialState)
  
  const value = {
    state,
    updateState: (newState) => setState(newState)
  }
  
  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  )
}

export function useFeature() {
  const context = useContext(FeatureContext)
  if (!context) {
    throw new Error('useFeature must be used within FeatureProvider')
  }
  return context
}
```

**Apply when:** Managing global/shared state

---

## Data Flow Patterns

### Pattern 11: File Upload Flow

```
User selects file
    ↓
Frontend: FormData creation
    ↓
POST /api/endpoint (multipart/form-data)
    ↓
Backend: File reading (await file.read())
    ↓
Processing (text extraction, AI parsing)
    ↓
Database storage
    ↓
Response with structured data
    ↓
Frontend: Display results
```

**Apply when:** Implementing file upload features

---

### Pattern 12: AI Generation Flow

```
User input (form data)
    ↓
Frontend: Validation
    ↓
POST /api/generate
    ↓
Backend: Build AI prompt
    ↓
Groq API call (LangChain)
    ↓
Parse AI response
    ↓
Store in database
    ↓
Return structured data
    ↓
Frontend: Render results
```

**Apply when:** Implementing AI-powered features

---

## Configuration Patterns

### Pattern 13: Environment Variables

```python
# Backend: Pydantic Settings
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    API_PORT: int = 8000
    
    class Config:
        env_file = ".env"

settings = Settings()
```

```javascript
// Frontend: Vite env vars
const apiUrl = import.meta.env.VITE_API_URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
```

**Apply when:** Adding configuration options

---

## Version Info
- Document Version: 1.0
- Last Updated: 2026-02-22
- Update: Only when new patterns emerge
