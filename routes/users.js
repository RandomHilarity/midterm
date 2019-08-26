/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
});

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
});

app.get('/poll/:poll_unique_id', function (req, res) {
  res.send('GET request to the homepage')
});

app.post('/poll/:poll_unique_id', function (req, res) {
  res.send('POST request to the homepage')
});

app.get('/creator/:creator_id', function (req, res) {
  res.send('GET request to the homepage')
});

app.post('/creator/:creator_id', function (req, res) {
  res.send('POST request to the homepage')
});

app.delete('/creator/:creator_id', function (req, res) {
  res.send('POST request to the homepage')
});