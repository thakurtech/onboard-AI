-- Migration: 002_add_interviews_table
-- Description: Add tables for AI Voice Interview feature
-- Created: 2025-11-24

-- Interview Sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  domain VARCHAR(255) NOT NULL,
  tech_stack TEXT[] NOT NULL,
  status VARCHAR(50) DEFAULT 'in_progress',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interview Messages (conversation history)
CREATE TABLE IF NOT EXISTS interview_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'interviewer' or 'candidate'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interview Feedback (final results)
CREATE TABLE IF NOT EXISTS interview_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 1 AND score <= 10),
  overall_feedback TEXT,
  strengths TEXT[],
  improvements TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_messages_session_id ON interview_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_feedback_session_id ON interview_feedback(session_id);

-- Success message
SELECT 'Migration 002_add_interviews_table completed successfully' AS message;
