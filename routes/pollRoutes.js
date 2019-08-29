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
  router.get("/make", (req, res) => {
    console.log('I got to / in pollRoutes');
    res.render("index");
  });

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

  // creates random 6-character key
  const generateUid = function() {
    return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
  };

  const makePoll = function(poll) {

    const userId = generateUid();
    const creatorId = generateUid();

    console.log(userId, "userId");
    console.log(creatorId, "creatorId");

    const queryString = `INSERT INTO polls (
      poll_unique_id,
      creator_id,
      creator_email,
      question) 
      VALUES ($1, $2, $3, $4) RETURNING *;`;
    
    const queryParams = [
      userId,
      creatorId,
      poll.creatorEmail,
      poll.question
    ];
    return db.query(queryString, queryParams)
      .then(res => res.rows)
      .catch(err => console.error('query error', err.stack));
  };

  const makeChoices = function(choice, pollId) {
    const queryString = `INSERT INTO choices (
      poll_id,
      answer,
      description)
      VALUES ($1, $2, $3) RETURNING *;`;

    const queryParams = [
      pollId,
      choice.answer,
      choice.description
    ];
    return db.query(queryString, queryParams)
      .then(res => res)
      .catch(err => console.error('query error', err.stack));
  };

  //handles post requests for new polls
  router.post("/make", (req, res) => {
    let count = 0;

    for (let key in req.body) {
      if (key.match(/choice/i)) {
        count ++;
      }
    }

    const finalArray = [];
    const formVariable = req.body;

    for (let i = 0; i < count; i++) {
      const obj = {};

      const choiceText  = "choice" + i;
      const choiceDescription = "choice" + i + "desc";
      const formChoiceValue = formVariable[choiceText];
      const formDescriptionValue = formVariable[choiceDescription];

      obj["answer"] = formChoiceValue;
      obj["description"] = formDescriptionValue;
      obj["answer"] !== "" && obj["answer"] !== undefined ? finalArray.push(obj) : "";
    }

    console.log(finalArray, " finalArray");

    makePoll(req.body)
      .then(res => {
        for (let choice of finalArray) {
          makeChoices(choice, res[0].id);
        }
        return res[0].creator_id;
      })
      .then(data => {
        console.log(data, "data");
        res.redirect(`/poll/${data}`);
      })
      .catch(err => console.error('query error', err.stack));
  });

  return router;
};