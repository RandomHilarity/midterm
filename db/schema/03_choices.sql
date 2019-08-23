DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  question_id INTEGER REFERENCES questions(id) NOT NULL
);