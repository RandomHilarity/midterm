/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // temporary route to vote page
  router.get("/", (req, res) => {
    console.log('I got to / in pollRoutes');
    res.render("vote");
  });

  //check if poll exists for creator_id
  const checkIfAdmin = function(pollId) {
    const queryString = `
      SELECT creator_id
        FROM polls
        WHERE creator_id = $1`;
    const values = [pollId];

    return db.query(queryString, values)
      .then(res => {
        console.log("doing the check in promise");
        console.log(res.rows, " res.rows");
        return res.rows;
      })
      .catch(err => console.error('Error:', err.stack));
  };

  //check if poll exists for poll_unique_id
  const checkIfPoll = function(pollId) {
    const queryString = `
      SELECT poll_unique_id
        FROM polls
        WHERE poll_unique_id = $1;`;

    const values = [pollId];
    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.error('Error:', err.stack));
  };

  //get poll data
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

  const getAnswers = function(pollId) {
    const queryString = `
        SELECT 
            answer,
            description,
            times_answered,
            total_count
          FROM choices
          JOIN polls ON polls.id = choices.poll_id
          WHERE poll_id = $1;`;
    const values = [pollId];
    
    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.error('Error:', err.stack));
  };

  router.get('/:pollId', (req, res, next) => {
    const pollId = req.params.pollId;
    console.log(pollId, " pollId");
    checkIfAdmin(pollId)
      .then(res => {
        if (res.length === 0) {
          console.log("no admin found");
          next();
        } else {
          console.log("admin found");
          console.log(res);
          const templateVars = {};
          res.render('vote', templateVars);
        }
      });
  });

  return router;
};