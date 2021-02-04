const express = require('express');
const router = express.Router();
const pgController = require('./controllers/pgController');
//const mongoController = require('./controllers/mongoController');

router.post('/psql', 
  //pgController.SQLTableData,
  (req, res) => {
    res.status(200).send('psql')
});

router.post('/mongo', (req, res) => {
  res.status(200).send('mongo')
});

module.exports = router;