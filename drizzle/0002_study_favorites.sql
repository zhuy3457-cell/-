CREATE TABLE study_favorite_events (
  owner_id TEXT NOT NULL,
  event_ref TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected INTEGER NOT NULL CHECK (selected IN (0, 1)),
  PRIMARY KEY (owner_id, event_ref)
);

CREATE INDEX study_favorites_by_owner_question
  ON study_favorite_events (owner_id, question_id);
