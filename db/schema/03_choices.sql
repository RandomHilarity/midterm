DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  description TEXT,
  times_answered INTEGER DEFAULT 0,
  total_count INTEGER DEFAULT 0
);

-- 6/3