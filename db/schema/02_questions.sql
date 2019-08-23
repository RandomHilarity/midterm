DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  poll_id INTEGER REFERENCES polls(id) NOT NULL
);