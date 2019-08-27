DROP TABLE IF EXISTS questions CASCADE;
-- CREATE TABLE questions (
--   id SERIAL PRIMARY KEY NOT NULL,
--   poll_id INTEGER REFERENCES polls(id) NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   description TEXT
-- );

-- -- 3

-- INSERT INTO questions (id, title, description, poll_id)
-- VALUES (1, 'How much wood can a woodchuck chuck?', 'How much wood do you think a woodchuck can chuck?', 1), (2, 'What is the meaning of life?', 'description', 2), (3, 'Whats your favorite food?', 'So we can order it for tomorrow', 3);