-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can insert own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON resumes;

-- Policy: Users can only view their own resumes
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
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own resumes
CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
CREATE TRIGGER update_resumes_updated_at
    BEFORE UPDATE ON resumes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


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


-- Add progress tracking to learning_roadmaps
ALTER TABLE learning_roadmaps ADD COLUMN IF NOT EXISTS progress JSONB DEFAULT '{}';
ALTER TABLE learning_roadmaps ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE learning_roadmaps ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index for active roadmaps
CREATE INDEX IF NOT EXISTS idx_learning_roadmaps_active ON learning_roadmaps(user_id, is_active) WHERE is_active = true;

-- Function to update last_accessed
CREATE OR REPLACE FUNCTION update_roadmap_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_accessed = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update last_accessed
DROP TRIGGER IF EXISTS trigger_update_roadmap_last_accessed ON learning_roadmaps;
CREATE TRIGGER trigger_update_roadmap_last_accessed
    BEFORE UPDATE ON learning_roadmaps
    FOR EACH ROW
    EXECUTE FUNCTION update_roadmap_last_accessed();
