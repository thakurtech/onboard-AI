-- Migration: 001_initial_schema
-- Description: Create initial database schema for Onboard AI OS
-- Created: 2025-11-24

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (already exists, but ensuring schema)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'employee',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Onboarding Plans table
CREATE TABLE IF NOT EXISTS onboarding_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  overview TEXT,
  timeline VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Onboarding Plan Phases
CREATE TABLE IF NOT EXISTS onboarding_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES onboarding_plans(id) ON DELETE CASCADE,
  phase_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Onboarding Phase Tasks
CREATE TABLE IF NOT EXISTS onboarding_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase_id UUID REFERENCES onboarding_phases(id) ON DELETE CASCADE,
  task_order INTEGER NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  duration_minutes INTEGER,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Lessons
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  lesson_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  duration VARCHAR(100),
  video_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Lesson Completions
CREATE TABLE IF NOT EXISTS lesson_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_spent_seconds INTEGER,
  UNIQUE(user_id, lesson_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_onboarding_plans_user_id ON onboarding_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_phases_plan_id ON onboarding_phases(plan_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_tasks_phase_id ON onboarding_tasks(phase_id);
CREATE INDEX IF NOT EXISTS idx_courses_user_id ON courses(user_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_course_id ON course_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_user_id ON lesson_completions(user_id);

-- Success message
SELECT 'Migration 001_initial_schema completed successfully' AS message;
