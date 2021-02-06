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

  if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
    let byID = toCamelCase(nameSingular);
    if (nameSingular === tableName) byID += 'ByID';
    return (
      `    ${toCamelCase(tableName)}: [${pascalCase(nameSingular)}!]!\n` +
      `    ${byID}(${primaryKey}: ${primaryKeyType}!): ${pascalCase(
        nameSingular
      )}!\n`
    );
  }
  return '';
};

TypeGenerator.mutations = (tableName, tableData) => {
  const { primaryKey, foreignKeys, columns } = tableData;
  if (!foreignKeys || !isJoinTable(foreignKeys, columns))
   {
    return (
      mutationHelper.create(tableName, primaryKey, foreignKeys, columns) +
      mutationHelper.update(tableName, primaryKey, foreignKeys, columns) +
      mutationHelper.destroy(tableName, primaryKey)
    );
  }
  return '';
};

TypeGenerator.custom = (tableName, tables) => {
  const { primaryKey, foreignKeys, columns } = tables[tableName];
  const primaryKeyType = typeSet(columns[primaryKey].dataType);
  if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
    return `${`  type ${pascalCase(singular(tableName))} {\n` + `    ${primaryKey}: ${primaryKeyType}!`}${customHelper.getColumns(
      primaryKey,
      foreignKeys,
      columns
    )}${customHelper.getRelationships(tableName, tables)}\n  }\n\n`;
  }
  return '';
};

module.exports = TypeGenerator;
