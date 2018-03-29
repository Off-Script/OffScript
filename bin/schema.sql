CREATE DATABASE offscript;

CREATE TABLE scripts (
  id serial primary key NOT NULL,
  script_text text NOT NULL,
  script_data text array NOT NULL,
  script_emotion text array NOT NULL,
  script_lang text array NOT NULL,
  transcript_id int array
);

CREATE TABLE transcripts (
  id serial primary key NOT NULL,
  transcript_text text NOT NULL,
  transcript_data text array NOT NULL,
  transcript_emotion text array NOT NULL,
  transcript_lang text array NOT NULL,
  score_data text array NOT NULL,
  comparison jsonb NOT NULL,
  script_id int foreign key references scripts(id)
);

CREATE TABLE users (
  id serial primary key NOT NULL,
  username varchar(50) UNIQUE,
  password varchar(150),
  script_ids int array references scripts,
  transcript_ids int array references transcripts
);

WITH new_analysis AS (
  INSERT INTO scripts (script_text, script_data, script_emotion, script_lang) VALUES ($1, $2, $3, $4) RETURNING id, [data.script_text, data.script_data, data.script_emotion, data.script_lang]
)
INSERT INTO transcripts (employee_id, order_id) VALUES
values
( 42 -- employee_id,
  (select id from new_order)
);

WITH data(firstname, lastname, adddetails, value) AS (VALUES (text 'fai55', text 'shaggk', text 'ss', text 'ss2'))
, ins1 AS (
   INSERT INTO sample (firstname, lastname)
   SELECT firstname, lastname FROM data   -- DISTINCT? see below
   ON     CONFLICT DO NOTHING             -- required UNIQUE constraint
   RETURNING firstname, lastname, id AS sample_id
   )
, ins2 AS (
   INSERT INTO sample1 (sample_id, adddetails)
   SELECT sample_id, adddetails
   FROM   data
   JOIN   ins1 USING (firstname, lastname)
   RETURNING sample_id, user_id
   )
INSERT INTO sample2 (user_id, value)
SELECT user_id, value
FROM   data
JOIN   ins1 USING (firstname, lastname)
JOIN   ins2 USING (sample_id);