/*eslint-env jquery*/

const db = require("../../server");

/* $(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (let user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  }).catch(err => console.error('Error:', err.stack)); */

// takes standard UX time and converts to easily readable format
const timeDifference = function(current, previous) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;
    
  let timeElapsed = "";
  let desc = "";
 
  if (elapsed < msPerMinute) {
    return 'less than a minute ago';
  } else {
    if (elapsed < msPerHour) {
      timeElapsed =  Math.round(elapsed / msPerMinute);
      desc = ' minute';
    } else if (elapsed < msPerDay) {
      timeElapsed = Math.round(elapsed / msPerHour);
      desc = ' hour';
    } else if (elapsed < msPerMonth) {
      timeElapsed = Math.round(elapsed / msPerDay);
      desc = ' day';
    } else if (elapsed < msPerYear) {
      timeElapsed = Math.round(elapsed / msPerMonth);
      desc = ' month';
    } else {
      timeElapsed = Math.round(elapsed / msPerYear);
      desc = ' year';
    }
    timeElapsed === 1 ? desc += ' ago' : desc += 's ago';
    return `${timeElapsed} ${desc}`;
  }
};
exports.timeDifference = timeDifference;

//gets a poll from poll_unique_id

const getPoll = function(pollId) {
  const queryString = `
      SELECT 
          poll_unique_id,
          creator_id,
          creator_email,
          created_at,
          closes_at,
          comments_active,
          track_voter name.
          question,
          question_description
        FROM polls
        WHERE poll_unique_id = $1
          OR creator_id =$1;`;
  const values = [pollId];
  
  return db.query(queryString, values)
    .then(res => res.rows)
    .catch(err => console.error('Error:', err.stack));
};
exports.getPoll = getPoll;

const checkIfAdmin = function(pollId) {
  const queryString = `
      SELECT polls.*
        FROM polls
        WHERE creator_id = $1`;

  const values = [pollId];
  return db.query(queryString, values)
    .then(res => res.rows)
    .catch(err => console.error('Error:', err.stack));
};
exports.checkIfAdmin = checkIfAdmin;

//gets questions for a poll
const getPollQuestions = function(pollId) {
  const queryString = `
      SELECT polls.created_at, poll.closes_at, questions.title, questions.description, questions.times_answered, choices.title, choices.description, choices.total_score, voters.name
      FROM polls
      JOIN questions ON poll.id = poll_id
      JOIN choices ON questions.id = question_id
      JOIN voters ON questions.id = question_id 
      WHERE creator_id = $1
        OR poll_unique_id = $1
      GROUP BY questions.id
      ORDER BY questions.id;`;

  const values = [pollId];
  return db.query(queryString, values)
    .then(res => res.rows)
    .catch(err => console.error('Error:', err.stack));
};
exports.getPollQuestions = getPollQuestions;
  
// creates random 6-character key
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
};
console.log(generateUid());

const createPoll = function(poll) {
  const queryString = `INSERT INTO polls (
      poll_unique_id,
      creator_id,
      creator_email,
      created_at,
      closes_at,
      track_voter_name,
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    
  const queryParams = [
    generateUid(),
    generateUid(),
    poll.creator_email,
    poll.created_at,
    poll.closes_at,
    poll.track_voter_name,
  ];
    
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.createPoll = createPoll;

const makeVote = function(choiceId, choicePosition) {
  const queryString = `
      UPDATE choices
        SET total_score = total_score + $2,
          times_answered = times_answered + 1
        WHERE choices.id = $1
        RETURNING *;`;
    
  const queryParams = [
    choiceId,
    choicePosition
  ];
    
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.makeVote = makeVote;
