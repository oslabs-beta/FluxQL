const { pascalCase } = require('pascal-case');
const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { typeSet } = require('./helperFunctions');
const { mutationHelper } = require('./helperFunctions');
const { isJoinTable } = require('./helperFunctions.js');
const { customHelper } = require('./helperFunctions.js');

/* 
todo helper functions/imports include:
    typeset, getPrimaryKeyType
*/


const TypeGenerator = {};

TypeGenerator.queries = (tableName, tableData) => {
  const { primaryKey, foreignKeys, columns } = tableData;
  const nameSingular = singular(tableName);
  const primaryKeyType = typeSet(columns[primaryKey].dataType);
  let byID = toCamelCase(nameSingular);
  if (nameSingular === tableName) byID += 'ByID';
  return (
    `    ${toCamelCase(tableName)}: [${pascalCase(nameSingular)}!]!\n` +
    `    ${byID}(${primaryKey}: ${primaryKeyType}!): ${pascalCase(nameSingular)}!\n`
    );
};

TypeGenerator.mutations = (tableName, tableData) => {
  const { primaryKey, foreignKeys, columns } = tableData;

  return (
    mutationHelper.create(tableName, primaryKey, foreignKeys, columns) +
    mutationHelper.update(tableName, primaryKey, foreignKeys, columns) +
    mutationHelper.destroy(tableName, primaryKey)
  );
  
};

TypeGenerator.custom = (tableName, tables) => {
  const { primaryKey, foreignKeys, columns } = tables[tableName];
  const primaryKeyType = typeSet(columns[primaryKey].dataType);
  return `${`  type ${pascalCase(singular(tableName))} {\n` + `    ${primaryKey}: ${primaryKeyType}!`}${customHelper.getColumns(
    primaryKey,
    foreignKeys,
    columns
  )}${customHelper.getRelationships(tableName, tables)}\n  }\n\n`;
};

TypeGenerator.exampleQuery = (tableName, tables) => {
  const { primaryKey, foreignKeys, columns } = tables[tableName];  
  const queryColumns = [];
  Object.keys(columns).forEach(columnName => {
    if (!(foreignKeys && foreignKeys[columnName]) && columnName !== primaryKey) {
      queryColumns.push(`      ${columnName},`);
    }
  });
  
  return (
`  query: {
    ${tableName} {\n${queryColumns.join('\n')}
     <insert additional column names here>
    }
  }`
  );
 
};

TypeGenerator.exampleMutation = (tableName, tables) => {
  const { primaryKey, foreignKeys, columns } = tables[tableName];
  const mutationName = toCamelCase('delete_' + singular(tableName));
  const queryColumns = [];
  Object.keys(columns).forEach(columnName => {
    if (!(foreignKeys && foreignKeys[columnName]) && columnName !== primaryKey) {
      queryColumns.push(`      ${columnName},`);
    }
  });
  
  return (
`  mutation: {
    ${mutationName} (${primaryKey}: <insert value here> ) {\n${queryColumns.join('\n')}
     <insert additional column names here>
    }
  }`
  );
};




module.exports = TypeGenerator;
