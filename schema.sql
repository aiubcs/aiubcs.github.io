-- Cloudflare D1 Database Schema for AIUB CS PWA

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  credits INTEGER NOT NULL,
  ongoing INTEGER NOT NULL DEFAULT 0,
  completed_topics INTEGER NOT NULL DEFAULT 0,
  total_topics INTEGER NOT NULL DEFAULT 14,
  icon_type TEXT NOT NULL,
  syllabus_json TEXT NOT NULL
);

DROP TABLE IF EXISTS materials;
CREATE TABLE materials (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  course_code TEXT NOT NULL,
  course_title TEXT NOT NULL,
  title TEXT NOT NULL,
  added_time TEXT NOT NULL,
  size TEXT NOT NULL,
  file_type TEXT NOT NULL,
  category TEXT NOT NULL,
  badges_json TEXT NOT NULL,
  is_bookmarked INTEGER DEFAULT 0,
  is_downloaded INTEGER DEFAULT 0,
  pages_count INTEGER DEFAULT 1,
  r2_key TEXT,
  document_content_json TEXT,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

DROP TABLE IF EXISTS announcements;
CREATE TABLE announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  desc TEXT NOT NULL,
  unread INTEGER DEFAULT 1
);
