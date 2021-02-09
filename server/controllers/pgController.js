const URI = require('./testPSQL.js');
const schemaGenerator = require('../pgGenerators/schemaGenerators.js');
const { isJoinTable } = require('../pgGenerators/helperFunctions.js');
const fs = require ('fs');
const pgQuery = fs.readFileSync('server/queries/tables.sql', 'utf8');
const { Pool } = require('pg');

const pgController = {};

pgController.SQLTableData = (req, res, next) => {
  const { psqlURI } = req.body;
  console.log(psqlURI);
  
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
      message: { err: 'Unable to connect to PG database, please confirm URI' },
    };
    return next(errObj);
  })
};

pgController.generateSchema = (req, res, next) => {
  const { tables } = res.locals;
  try {
    // here we will break apart the larger assemble into types & resolvers
    const { types, queryTypeCount, mutationTypeCount, queryExample, mutationExample } = schemaGenerator.assembleTypes(tables);
    const resolvers  = schemaGenerator.assembleResolvers(tables);

    res.locals.schema = { types, resolvers };
    res.locals.advice = [{ Title: 'Queries', Amount: queryTypeCount, Description: queryExample }, 
                          {Title: 'Mutations', Amount: mutationTypeCount, Description: mutationExample }];
    
    // * TEST ERROR HANDLING; Might need to add statement to check if either function returns undefined, etc
    return next();
  }
  catch (err) {
    const errObj = {
        log: `Error in generateSchema: ${err}`,
        status: 400,
        message: { err: 'Unable to generate schema for database' },
      };
    return next(errObj);
  }
};


pgController.generateGraphData = (req, res, next) => {
  try {
    const { tables } = res.locals;
    const graphData = {};
    Object.keys(tables).forEach(tableName => {
      const { foreignKeys, referencedBy, columns } = tables[tableName];
      if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
        const pointsTo = [];
        if (foreignKeys) {
          Object.keys(foreignKeys).forEach(fk => {
            const { referenceTable } = foreignKeys[fk];
            pointsTo.push(referenceTable);
          })
        };  
        
        const tableData = {};
        tableData['pointsTo'] = pointsTo;
        tableData['referencedBy'] = referencedBy ? Object.keys(referencedBy) : [];
        tableData['columns'] = columns;
        
        graphData[tableName] = tableData;
      }
    });
  
    res.locals.d3Data = graphData;
    return next();
  }
  catch (err) {
    const errObj = {
      log: `Error in generateGraphData: ${err}`,
      status: 400,
      message: { err: 'Unable to generate graph data' },
    };
    return next(errObj);
  }
};


pgController.writeSchemaToFile = (req, res, next) => {
  try {
    return next();
  }
  catch (err) {
    const errObj = {
      log: `Error in writeSchemaToFile: ${err}`,
      status: 400,
      message: { err: '' },
    };
    return next(errObj);
  }
};


module.exports = pgController;