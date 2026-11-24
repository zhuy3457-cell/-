CREATE TABLE study_attempts (
  owner_id TEXT NOT NULL,
  attempt_ref TEXT NOT NULL,
  question_id TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  term TEXT NOT NULL,
  correct INTEGER NOT NULL CHECK (correct IN (0, 1)),
  study_date TEXT NOT NULL,
  submitted_at INTEGER NOT NULL,
  homework_prompt TEXT,
  PRIMARY KEY (owner_id, attempt_ref)
);

CREATE INDEX study_attempts_by_owner_scope
  ON study_attempts (owner_id, subject_id, term, submitted_at);
