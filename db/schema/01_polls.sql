DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_unique_id VARCHAR(255) NOT NULL,
  creator_id VARCHAR(255) NOT NULL,
  creator_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT Now(),
  closes_at TIMESTAMP,
  comments_active BOOLEAN DEFAULT FALSE,
  track_voter_name BOOLEAN DEFAULT FALSE
);

-- 5