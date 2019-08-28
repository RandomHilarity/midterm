/* eslint-disable camelcase */
/*eslint-env jquery, browser*/

/*
 * All routes for polls are defined here
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

  //check if poll exists for creator_id
  const getAdminPoll = function(pollId) {
    const queryString = `
      SELECT
          id, 
          created_at,
          closes_at,
          comments_active,
          track_voter_name,
          question,
          question_description
        FROM polls
        WHERE creator_id = $1`;
    const values = [pollId];

    return db.query(queryString, values)
      .then(res => {
        return res.rows;
      })
      .catch(err => console.error('Error:', err.stack));
  };

  //get poll data
  const getPoll = function(pollId) {
    const queryString = `
      SELECT
          id, 
          created_at,
          closes_at,
          comments_active,
          track_voter_name,
          question,
          question_description
        FROM polls
        WHERE poll_unique_id = $1`;
    const values = [pollId];

    return db.query(queryString, values)
      .then(res => {
        return res.rows;
      })
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
          WHERE polls.id = $1;`;
    const values = [pollId];
    
    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.error('Error:', err.stack));
  };

  //checks for creator_id and renders Admin version of page
  router.get('/:pollId', (req, res, next) => {
    const pollId = req.params.pollId;
    console.log(pollId, " pollId");
    getAdminPoll(pollId)
      .then(data => {
        if (data.length === 0) {
          console.log("no admin found");
          next();
        } else {
          const templateVars = {poll:{
            created_at: data[0].created_at,
            closes_at: data[0].closes_at,
            comments_active: data[0].comments_active,
            track_voter_name: data[0].track_voter_name,
            question: data[0].question,
            question_description: data[0].question_description
          }};
          console.log("admin found");
          getAnswers(data[0].id)
            .then(data => {
              const dataObj = {answers: data};
              const pollAnsObj = Object.assign(templateVars, dataObj);
              console.log(pollAnsObj);
              res.render('vote', pollAnsObj);
            });
        }
      });
  });

  // checks for poll_unique_id and renders Voter version of page
  router.get('/:pollId', (req, res, next) => {
    const pollId = req.params.pollId;
    console.log(pollId, " pollId");
    getPoll(pollId)
      .then(data => {
        if (data.length === 0) {
          console.log("no poll found");
          next();
        } else {
          const templateVars = {poll:{
            created_at: data[0].created_at,
            closes_at: data[0].closes_at,
            comments_active: data[0].comments_active,
            track_voter_name: data[0].track_voter_name,
            question: data[0].question,
            question_description: data[0].question_description
          }};
          console.log("admin found");
          getAnswers(data[0].id)
            .then(data => {
              const dataObj = {answers: data};
              const pollAnsObj = Object.assign(templateVars, dataObj);
              res.render('vote', pollAnsObj);
            });
        }
      });
  });

  router.get('/:pollId', (req, res) => {
    // get an error message or alert here
    res.redirect('/');
  });

  return router;
};