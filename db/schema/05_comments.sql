DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments(
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  comment_text TEXT,
  created_at TIMESTAMP
);