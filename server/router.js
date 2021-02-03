const express = require('express');
const router = express.Router();
//const pgController = require('./controllers/pgControllers');

router.post('/psql', (req, res) => {
  res.status(200).send('psql')
});

router.post('/mongo', (req, res) => {
  res.status(200).send('mongo')
});

module.exports = router;