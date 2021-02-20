const express = require('express');
const router = express.Router();
const pgController = require('./controllers/pgController');
//const mongoController = require('./controllers/mongoController');

router.post('/psql', 
  pgController.SQLTableData,
  pgController.generateSchema,
  pgController.generateGraphData,
  pgController.writeSchemaToFile,
  (req, res) => {
    res.status(200).json({ dbName: 'psql', schema: res.locals.schema, advice: res.locals.advice, d3Data: res.locals.d3Data });
});

router.put('/psql', 
  // ---- UPDATE SCHEMA MIDDLWARE ----,
  // pgController.generateSchema,
  // pgController.generateGraphData,
  // pgController.writeSchemaToFile,
  (req, res) => {
    res.send('update data');
});

router.post('/mongo', (req, res) => {
  res.status(200).send('mongo');
});

module.exports = router;