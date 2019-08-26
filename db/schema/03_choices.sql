DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  times_answered INTEGER DEFAULT 0,
  total_count INTEGER DEFAULT 0
);

-- 3