DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_unique_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id VARCHAR(255) NOT NULL,
  creator_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  closes_at TIMESTAMP,
  track_ip BOOLEAN DEFAULT FALSE,
  track_voter_name BOOLEAN DEFAULT FALSE,
  voters_can_change BOOLEAN DEFAULT FALSE,
  votes_expected INTEGER DEFAULT 0
);