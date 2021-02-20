const sampleURI = require('./testPSQL.js');
const schemaGenerator = require('../pgGenerators/schemaGenerators.js');
const {
  validateURIFormat,
  isJoinTable,
  schemaImport,
  schemaExport,
  typeDescription,
  resolverDescription,
} = require('../pgGenerators/helperFunctions.js');
const fs = require('fs');
const path = require('path');
const pgQuery = fs.readFileSync('server/queries/tables.sql', 'utf8');
const { Pool } = require('pg');

const pgController = {};

pgController.SQLTableData = (req, res, next) => {
  let psqlURI;

  //checking if sample URI is needed
  req.body.sample ? (psqlURI = sampleURI) : (psqlURI = req.body.psqlURI);
  res.locals.dbURI = psqlURI;

  //checking if manually entered URI is valid format
  if (!validateURIFormat(psqlURI)) {
    const errObj = {
      log: 'Error in SQLTableData: Invalid URI Format',
      status: 400,
      message: {
        err: 'Unable to connect to PG database, please confirm URI',
      },
    };
    return next(errObj);
  }
 
  const db = new Pool({ connectionString: psqlURI });

  db.query(pgQuery)
    .then((data) => {
      res.locals.tables = data.rows[0].tables;
      return next();
    })
    .catch((err) => {
      const errObj = {
        log: `Error in SQLTableData: ${err}`,
        status: 400,
        message: {
          err: 'Unable to connect to PG database, please confirm URI',
        },
      };
      return next(errObj);
    });
};

pgController.generateSchema = (req, res, next) => {
  const { tables } = res.locals;
  try {
    // here we will break apart the larger assemble into types & resolvers
    const {
      types,
      queryTypeCount,
      mutationTypeCount,
      queryExample,
      mutationExample,
      typeExample,
    } = schemaGenerator.assembleTypes(tables);
    const { resolvers, resolverExample } = schemaGenerator.assembleResolvers(
      tables
    );

    res.locals.schema = { types, resolvers };
    res.locals.advice = [
      {
        Type: 'Queries',
        Amount: queryTypeCount,
        Description: queryExample[1],
        Example: queryExample[0],
      },
      {
        Type: 'Mutations',
        Amount: mutationTypeCount,
        Description: mutationExample[1],
        Example: mutationExample[0],
      },
      {
        Type: 'Types',
        Amount: 10,
        Description: typeDescription,
        Example: typeExample,
      },
      {
        Type: 'Resolvers',
        Amount: 10,
        Description: resolverDescription,
        Example: resolverExample,
      },
    ];
    // * TEST ERROR HANDLING; Might need to add statement to check if either function returns undefined, etc
    return next();
  } catch (err) {
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
    const children = [];
    const graphData = { name: 'Your Database', children };

    Object.keys(tables).forEach((tableName) => {
      const { foreignKeys, referencedBy, columns } = tables[tableName];
      if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
        const pointsTo = [];
        if (foreignKeys) {
          Object.keys(foreignKeys).forEach((fk) => {
            const { referenceTable } = foreignKeys[fk];
            pointsTo.push(referenceTable);
          });
        }

        const tableChildren = [];
        Object.keys(columns).forEach((columnName) => {
          const child = {};
          child['name'] = columnName;
          child['type'] = columns[columnName].dataType;
          child['columnDefault'] = columns[columnName].columnDefault;
          child['isNullable'] = columns[columnName].isNullable;
          child['charMaxLength'] = columns[columnName].charMaxLength;

          tableChildren.push(child);
        });

        const tableData = {};
        tableData['name'] = tableName;
        tableData['foreignKeys'] = pointsTo;
        tableData['referencedBy'] = referencedBy
          ? Object.keys(referencedBy)
          : [];
        tableData['children'] = tableChildren;

        children.push(tableData);
      }
    });

    res.locals.d3Data = graphData;
    return next();
  } catch (err) {
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
    const { dbURI } = res.locals;
    const schemaImportText = schemaImport(dbURI);
    const schemaExportText = schemaExport();

    const schemaFile =
      schemaImportText +
      '\n' +
      res.locals.schema.types +
      '\n' +
      res.locals.schema.resolvers +
      '\n' +
      schemaExportText;

    fs.writeFileSync(
      path.resolve(__dirname, '../graphQLServer/schema.js'),
      schemaFile
    );

    return next();
  } catch (err) {
    const errObj = {
      log: `Error in writeSchemaToFile: ${err}`,
      status: 400,
      message: { err: 'Unable to generate graphQL playground server' },
    };
    return next(errObj);
  }
};

module.exports = pgController;
