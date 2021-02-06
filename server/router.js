const express = require('express');
const router = express.Router();
const pgController = require('./controllers/pgController');
//const mongoController = require('./controllers/mongoController');

router.post('/psql', 
  pgController.SQLTableData,
  pgController.generateSchema,
  (req, res) => {
    res.status(200).json({ types: res.locals.types, resolvers: res.locals.resolvers });
});

router.post('/mongo', (req, res) => {
  res.status(200).send('mongo')
});

module.exports = router;