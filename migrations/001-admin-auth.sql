-- 001-admin-auth: adds admin authentication tables to an existing D1 database.
-- Safe to run on a database that already has courses/materials/announcements
-- (uses IF NOT EXISTS, touches nothing else).

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
