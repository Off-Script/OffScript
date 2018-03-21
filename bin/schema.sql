CREATE DATABASE scripts;

CREATE TABLE script (
  id serial primary key NOT NULL,
  script_text text NOT NULL,
  script_tones jsonb NOT NULL,
  speech_tones jsonb NOT NULL,
  transcript_text text NOT NULL
);