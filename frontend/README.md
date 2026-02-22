# Resume Parser Frontend

Modern SaaS-style frontend for AI-powered resume parsing.

## Features

- 🔐 Supabase Authentication (Sign up/Sign in)
- 📤 Resume Upload with drag & drop
- 🤖 AI-powered parsing via backend API
- ✏️ Editable form fields for all extracted data
- 💾 Save to Supabase database
- 🎨 Modern, responsive UI with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your environment variables to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

4. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Supabase Setup

1. Create a new Supabase project
2. Enable Email authentication in Authentication settings
3. Create the resumes table:

```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own resumes
CREATE POLICY "Users can view own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own resumes
CREATE POLICY "Users can insert own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own resumes
CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id);
```

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.
