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

-- Seed Initial Core Courses
INSERT INTO courses (id, code, title, category, credits, ongoing, completed_topics, total_topics, icon_type, syllabus_json)
VALUES 
('csc-2108', 'CSC 2108', 'Introduction to Database', 'Core CS', 3, 1, 8, 14, 'database', '["Relational Model", "SQL Queries", "ER Diagrams", "Normalization", "Indexing"]'),
('csc-3112', 'CSC 3112', 'Software Engineering', 'Software Engineering', 3, 1, 5, 12, 'code', '["SDLC", "Agile & Scrum", "Requirements", "UML Diagrams", "Testing"]'),
('coe-3204', 'COE 3204', 'Computer Networks', 'Computer Hardware & COE', 3, 0, 14, 14, 'network', '["OSI Model", "TCP/IP Architecture", "IP Subnetting", "Routing Protocols"]'),
('csc-4232', 'CSC 4232', 'Machine Learning', 'Data Science & AI', 3, 0, 14, 14, 'ai', '["Linear Regression", "Decision Trees", "SVM", "Neural Networks"]');

-- Seed Initial Materials
INSERT INTO materials (id, course_id, course_code, course_title, title, added_time, size, file_type, category, badges_json, is_bookmarked, is_downloaded, pages_count, r2_key)
VALUES 
('mat-1', 'csc-2108', 'CSC 2108', 'Introduction to Database', 'Midterm 2024.pdf', 'Added 2 weeks ago', '1.8 MB', 'pdf', 'Mid', '["Official", "Question"]', 1, 1, 12, 'csc-2108/midterm-2024.pdf'),
('mat-2', 'csc-2108', 'CSC 2108', 'Introduction to Database', 'Midterm 2023 (Solution).pdf', '3 months ago', '2.4 MB', 'pdf', 'Mid', '["Official", "Solution"]', 0, 0, 8, 'csc-2108/midterm-2023-solution.pdf'),
('mat-3', 'csc-2108', 'CSC 2108', 'Introduction to Database', 'Important Topics.docx', '4 months ago', '420 KB', 'docx', 'Notes', '["Notes", "Summary"]', 1, 0, 5, 'csc-2108/important-topics.docx'),
('mat-4', 'csc-2108', 'CSC 2108', 'Introduction to Database', 'ER Model Summary.pptx', '6 months ago', '2.1 MB', 'pptx', 'Notes', '["Slides", "Lecture"]', 0, 0, 24, 'csc-2108/er-model-summary.pptx'),
('mat-5', 'csc-2108', 'CSC 2108', 'Introduction to Database', 'SQL Practice.xlsx', '1 year ago', '580 KB', 'xlsx', 'Final', '["Lab", "Practice"]', 0, 1, 3, 'csc-2108/sql-practice.xlsx');

-- Seed Announcements
INSERT INTO announcements (id, title, date, desc, unread)
VALUES 
('ann-1', 'Fall 2024 Midterm Exam Schedule Published', 'Aug 03, 2026', 'Midterm exams start next week. Check VUE portal for room allocations.', 1),
('ann-2', 'Cloudflare D1 & R2 Backend Active', 'Aug 03, 2026', 'Cloudflare Workers API connected with D1 database and R2 object storage.', 0);
