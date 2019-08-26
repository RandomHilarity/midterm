-- Users table seeds here (Example)
INSERT INTO polls (id, poll_unique_id, creator_id, creator_email)
VALUES (1, 1, 1, 'Light.house@gmail.com');


INSERT INTO questions (id, title, description, poll_id)
VALUES (1, 'How much wood can a woodchuck chuck?', 'How much wood do you think a woodchuck can chuck?', 1);


INSERT INTO choices (id, title, description, question_id)
VALUES (1 , 5, 'Does 5 seem reasonable?', 1), (2, 20, 'Does 20 seem reasonable?', 1), (3, 100, 'Does 100 seem reasonable?', 1);


INSERT INTO comments (poll_id, name, comment_text)
VALUES (1, 'Devon Blake', 'What a fascinating question!');