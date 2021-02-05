const URI = require('./testPSQL.js');
const schemaGenerator = require('../pgGenerators/schemaGenerators.js');
const fs = require ('fs');
const pgQuery = fs.readFileSync('server/queries/tables.sql', 'utf8');
const { Pool } = require('pg');

const pgController = {};

pgController.SQLTableData = (req, res, next) => {
  const db = new Pool({ connectionString: URI }); // ! change to request body uri in future

  db.query(pgQuery)
  .then(data => {
      res.locals.tables = data.rows[0].tables;
      return next();
  })
  .catch(err => {
    const errObj = {
      log: `Error in SQLTableData: ${err}`,
      status: 400,
      message: { err: 'Error in SQLTableData middleware' },
    };
    return next(errObj);
  })
};

pgController.generateSchema = (req, res, next) => {
  const { tables } = res.locals;
  try {
    res.locals.types = schemaGenerator.assembleTypes(tables); // here we will break apart the larger assemble into types & resolvers
    res.locals.resolvers = schemaGenerator.assembleResolvers(tables); 
    console.log('RESOLVERS----->', res.locals.resolvers);
    // * TEST ERROR HANDLING; Might need to add statement to check if either function returns undefined, etc
    return next();
  }
  catch (err) {
    const errObj = {
        log: `Error in generateSchema: ${err}`,
        status: 400,
        message: { err: 'Error in generateSchema middleware' },
      };
    return next(errObj);
  }
};

module.exports = pgController;