-- DROP TABLE IF EXISTS answers CASCADE;
-- CREATE TABLE answers (
--   id SERIAL PRIMARY KEY NOT NULL,
--   vote_position SMALLINT NOT NULL,
--   ip VARCHAR(255),
--   name VARCHAR(255),
--   choice_id INTEGER REFERENCES choices(id) NOT NULL
-- );

-- -- 4