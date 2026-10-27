-- Cameroon LinguaConnect database schema (PostgreSQL). Safe to run more than once.

CREATE TABLE IF NOT EXISTS languages (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  region      TEXT NOT NULL,
  speakers    TEXT NOT NULL,
  difficulty  TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  greeting    TEXT NOT NULL,
  meaning     TEXT NOT NULL,
  description TEXT NOT NULL,
  position    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS culture_items (
  id          SERIAL PRIMARY KEY,
  image       TEXT NOT NULL CHECK (image IN ('dance', 'food', 'textile')),
  tag         TEXT NOT NULL,
  title       TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  position    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS proverbs (
  id       SERIAL PRIMARY KEY,
  lang     TEXT NOT NULL,
  text     TEXT NOT NULL UNIQUE,
  meaning  TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0
);

-- Learner profile (a demo learner until authentication is added)
CREATE TABLE IF NOT EXISTS learners (
  id             SERIAL PRIMARY KEY,
  name           TEXT NOT NULL UNIQUE,
  daily_goal_xp  INTEGER NOT NULL DEFAULT 20
);

CREATE TABLE IF NOT EXISTS learner_stats (
  learner_id INTEGER NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  key        TEXT NOT NULL CHECK (key IN ('streak', 'xp', 'lessons', 'rank')),
  label      TEXT NOT NULL,
  value      TEXT NOT NULL,
  position   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (learner_id, key)
);

CREATE TABLE IF NOT EXISTS learner_lessons (
  id         SERIAL PRIMARY KEY,
  learner_id INTEGER NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  lang       TEXT NOT NULL,
  title      TEXT NOT NULL,
  progress   INTEGER NOT NULL CHECK (progress BETWEEN 0 AND 100),
  position   INTEGER NOT NULL DEFAULT 0,
  UNIQUE (learner_id, title)
);

CREATE TABLE IF NOT EXISTS learner_badges (
  id         SERIAL PRIMARY KEY,
  learner_id INTEGER NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  description TEXT NOT NULL,
  position   INTEGER NOT NULL DEFAULT 0,
  UNIQUE (learner_id, name)
);
