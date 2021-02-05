//Helper functions 
const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');


const typeSet = (str) => {

    switch (str) {
      case 'character varying':
        return 'String';
        break;
      case 'character':
        return 'String';
        break;
      case 'integer':
        return 'Int';
        break;
      case 'text':
        return 'String';
        break;
      case 'date':
        return 'String';
        break;
      case 'boolean':
        return 'Boolean';
        break;
      default:
        return 'Int';
    }
  }

  const mutationHelper = {}

  mutationHelper.create = (tableName, primaryKey, foreignKeys, columns) => {
    return `\n    ${toCamelCase(`create_${singular(tableName)}`)}(\n${mutationHelper.paramType(
        primaryKey,
        foreignKeys,
        columns,
        false
      )}): ${pascalCase(singular(tableName))}!\n`;
};
  
  mutationHelper.update = (tableName, primaryKey, foreignKeys, columns) => {
    return `\n    ${toCamelCase(`update_${singular(tableName)}`)}(\n${mutationHelper.paramType(
      primaryKey,
      foreignKeys,
      columns,
      true
    )}): ${pascalCase(singular(tableName))}!\n`;
  }

  mutationHelper.destroy = (tableName, primaryKey) => {
    return `\n    ${toCamelCase(`delete_${singular(tableName)}`)}(${primaryKey}: ID!): ${pascalCase(
      singular(tableName)
    )}!\n`;
  }

  mutationHelper.paramType = (primaryKey, foreignKeys, columns, isRequired) => {
    let typeDef = '';
    for (const columnName in columns){
        const { dataType, isNullable } = columns[columnName];
        if (!isRequired && columnName === primaryKey){
            continue; // when creating a new SQL ROW, primary keys are autoincrement (serial) so we don't need them in the create statement
        }

        if (isRequired && columnName === primaryKey) {
            typeDef += `      ${columnName}: ${typeSet(dataType)}!,\n`; 
        } else {
            typeDef += `      ${columnName}: ${typeSet(dataType)}`;
            if (isNullable !== 'YES') typeDef += '!';
            typeDef += ',\n';
        }
    }
    if (typeDef !== '') typeDef += '    ';
    return typeDef;
};




  module.exports = {
    typeSet,
    mutationHelper
  };
