# Database Setup

This folder contains all database-related SQL files for FutureProof AI.

## Migrations

The `migrations/` folder contains SQL scripts to set up your Supabase database.

### Required Setup

Run these SQL scripts in your Supabase SQL Editor in order:

1. **supabase-setup.sql** - Main database setup
   - Creates `resumes` table
   - Creates `learning_roadmaps` table
   - Sets up Row Level Security (RLS) policies
   - Configures service role access

2. **learning-roadmap-table-only.sql** - Additional roadmap table setup (if needed)
   - Extended roadmap table configuration
   - Progress tracking columns
   - Calendar integration fields

## How to Use

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `migrations/supabase-setup.sql`
4. Click "Run" to execute
5. Verify tables are created in the Table Editor

## Database Schema

### Tables

**resumes**
- `id` - UUID primary key
- `user_id` - UUID (references auth.users)
- `data` - JSONB (parsed resume data)
- `created_at` - Timestamp

**learning_roadmaps**
- `id` - UUID primary key
- `user_id` - UUID (references auth.users)
- `roadmaps` - JSONB (roadmap data)
- `progress` - JSONB (completion tracking)
- `is_active` - Boolean
- `start_date` - Date
- `last_accessed` - Timestamp
- `created_at` - Timestamp

## Environment Variables

Make sure your `.env` file has:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
```

## Troubleshooting

**RLS Policies Blocking Inserts:**
- Ensure you're using the service role key (not anon key)
- Check RLS policies are correctly configured

**Tables Not Created:**
- Verify SQL syntax in Supabase SQL Editor
- Check for error messages
- Ensure you have proper permissions
