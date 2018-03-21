CREATE DATABASE scripts;

CREATE TABLE script (
  id serial primary key NOT NULL,
  script_text text NOT NULL,
  script_tones jsonb NOT NULL,
  script_usage jsonb NOT NULL
);

CREATE TABLE transcript (
  id serial primary key NOT NULL,
  transcript_text text NOT NULL,
  transcript_tones jsonb NOT NULL,
  transcript_usage jsonb NOT NULL,
);