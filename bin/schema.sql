CREATE DATABASE offscript;

CREATE TABLE scripts (
  id serial primary key NOT NULL,
  script_text text NOT NULL,
  script_data jsonb NOT NULL,
  script_emotion jsonb NOT NULL,
  script_lang jsonb NOT NULL,
  transcript_id int
);

CREATE TABLE transcripts (
  id serial primary key NOT NULL,
  transcript_text text NOT NULL,
  transcript_data jsonb NOT NULL,
  transcript_emotion jsonb NOT NULL,
  transcript_lang jsonb NOT NULL,
  score_data jsonb NOT NULL,
  comparison jsonb NOT NULL,
  script_id int
);

CREATE TABLE users (
  id serial primary key NOT NULL,
  username varchar(50) UNIQUE,
  password varchar(150),
  script_ids int references scripts,
  transcript_ids int references transcripts
);