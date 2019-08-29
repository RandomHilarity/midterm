-- Users table seeds here (Example)
INSERT INTO polls (poll_unique_id, creator_id, creator_email, question, question_description) VALUES 
  ('123456', 1, 'Light.house@gmail.com', 'How much wood can a woodchuck chuck?', 'This question has perplexed humans for years lets put a final stop to this'),
  ('rshf25', 2, 'malesuada.id@nisidictum.ca', 'What is the meaning of life?', 'description'),
  ('dyr23e' , 3, 'fermentum@cool.co.uk', 'Whats your favorite food?', 'We will order in for tomorrow');


INSERT INTO choices (id, poll_id, answer, description) VALUES 
  (1, 1, 5, 'Does 5 seem reasonable?'),
  (2, 1, 20, 'Does 20 seem reasonable?'),
  (3, 1, 100, 'Does 100 seem reasonable?'),
  (4, 2, 'Waking up and going to bootcamp', 'No description needed'),
  (5, 2, 'Friendship', 'description'),
  (6, 2, 'Memes', 'Do we need anything else?'),
  (7, 3, 'Pizza', 'description'),
  (8, 3, 'Sushi', 'description'),
  (9, 3, 'Pho', 'description');

INSERT INTO comments (id, poll_id, name, comment_text) VALUES 
  (1, 1, 'Devon', 'What a fascinating question!'),
  (2, 1, 'Len', 'None of the above clearly 200!'),
  (3, 2, 'Quentin', 'Clearly bootcamp why are the others even options?'),
  (4, 3, 'Olivia', 'Anything but fish, please!');

INSERT INTO voters (id, name, choice_id) VALUES
  (1, 'Devon B', 1),
  (2, 'John W', 1), (3, 'Len P', 1), (4, 'Quentin', 2), (5, 'Kim', 2), (6, 'Tanya', 2), (7, 'Eden', 3), (8, 'Macey' ,3), (9, 'Faith', 3);

