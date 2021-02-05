
const { pascalCase } = require('pascal-case');
const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const  { typeSet }  = require('./helperFunctions');
const  { mutationHelper }  = require('./helperFunctions');


/* 
todo helper functions/imports include:
    typeset, getPrimaryKeyType
*/
const TypeGenerator = {};

TypeGenerator.queries = (tableName, tableData) => {
    /* the result of this function builds the 'query type' string referenced in the generateSchema Middleware -> schemaGenerator.assembleTypes */
    const {primaryKey, foreignKeys, columns} = tableData;
    const nameSingular = singular(tableName);
    const primaryKeyType = typeSet(columns[primaryKey].dataType);

    if (!foreignKeys || Object.keys(columns).length !== Object.keys(foreignKeys).length + 1) {
        /* 
                                    Only non-join tables enter this block 
        There can be no foreign keys OR if there are foreign keys, make sure that you have more than 1 unqiue column. 
        This ensure it is not just a join table. for example a join table will have columns of all its foregin keys and 
        an additional primary key to join those tables. 
        */
       let byID = toCamelCase(nameSingular);
       if (nameSingular === tableName) byID += 'ByID';
       return(
        `    ${toCamelCase(tableName)}: [${pascalCase(nameSingular)}!]!\n` +
        `    ${byID}(${primaryKey}: ${primaryKeyType}!): ${pascalCase(nameSingular)}!\n`
        )
    }
    return ''
};

TypeGenerator.mutations = (tableName, tableData) => {
    const {primaryKey, foreignKeys, columns} = tableData;
    if (!foreignKeys || Object.keys(columns).length !== Object.keys(foreignKeys).length + 1) {
        return (
            mutationHelper.create(tableName, primaryKey, foreignKeys, columns) +
            mutationHelper.update(tableName, primaryKey, foreignKeys, columns) +
            mutationHelper.destroy(tableName, primaryKey)
        );
      }
      return '';
};



module.exports = TypeGenerator;