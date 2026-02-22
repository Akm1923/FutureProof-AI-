-- Run this SQL query in Supabase SQL Editor
-- This creates only the learning_roadmaps table (new addition)

-- Learning Roadmaps Table
CREATE TABLE IF NOT EXISTS learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    roadmaps JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for learning_roadmaps
ALTER TABLE learning_roadmaps ENABLE ROW LEVEL SECURITY;

-- Users can read their own roadmaps
CREATE POLICY "Users can read own roadmaps"
    ON learning_roadmaps FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own roadmaps
CREATE POLICY "Users can insert own roadmaps"
    ON learning_roadmaps FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own roadmaps
CREATE POLICY "Users can update own roadmaps"
    ON learning_roadmaps FOR UPDATE
    USING (auth.uid() = user_id);

-- Service role can do everything (for backend)
CREATE POLICY "Service role full access to roadmaps"
    ON learning_roadmaps FOR ALL
    USING (auth.jwt()->>'role' = 'service_role');

-- Create index for faster queries
CREATE INDEX idx_learning_roadmaps_user_id ON learning_roadmaps(user_id);
CREATE INDEX idx_learning_roadmaps_created_at ON learning_roadmaps(created_at DESC);
