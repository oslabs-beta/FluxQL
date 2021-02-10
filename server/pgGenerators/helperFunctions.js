const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');
const mutationHelper = {};
const customHelper = {};

const typeSet = (str) => {
  switch (str) {
    case 'character varying':
      return 'String';
    case 'character':
      return 'String';
    case 'integer':
      return 'Int';
    case 'text':
      return 'String';
    case 'date':
      return 'String';
    case 'boolean':
      return 'Boolean';
    default:
      return 'Int';
  }
};

const typeConversion = {
  'character varying': 'String',
  character: 'String',
  integer: 'Int',
  text: 'String',
  date: 'String',
  boolean: 'Boolean',
  numeric: 'Int',
}; // return 'Int' if undefined;

mutationHelper.create = (tableName, primaryKey, foreignKeys, columns) => {
  return `\n    ${toCamelCase(
    `create_${singular(tableName)}`
  )}(\n${mutationHelper.paramType(
    primaryKey,
    foreignKeys,
    columns,
    false
  )}): ${pascalCase(singular(tableName))}!\n`;
};

mutationHelper.update = (tableName, primaryKey, foreignKeys, columns) => {
  return `\n    ${toCamelCase(
    `update_${singular(tableName)}`
  )}(\n${mutationHelper.paramType(
    primaryKey,
    foreignKeys,
    columns,
    true
  )}): ${pascalCase(singular(tableName))}!\n`;
};

mutationHelper.destroy = (tableName, primaryKey) => {
  return `\n    ${toCamelCase(
    `delete_${singular(tableName)}`
  )}(${primaryKey}: ID!): ${pascalCase(singular(tableName))}!\n`;
};

mutationHelper.paramType = (primaryKey, foreignKeys, columns, isRequired) => {
  let typeDef = '';
  for (const columnName in columns) {
    const { dataType, isNullable } = columns[columnName];
    if (!isRequired && columnName === primaryKey) {
      continue; // when creating a new SQL ROW, primary keys are autoincrement (serial) so we don't need them in the create statement
    }

    if (isRequired && columnName === primaryKey) {
      typeDef += `      ${columnName}: ${
        typeConversion[dataType] ? typeConversion[dataType] : 'Int'
      }!,\n`; //see if this breaks it
    } else {
      typeDef += `      ${columnName}: ${
        typeConversion[dataType] ? typeConversion[dataType] : 'Int'
      }`; // SEE IF THIS BREAKS TOO
      if (isNullable !== 'YES') typeDef += '!';
      typeDef += ',\n';
    }
  }
  if (typeDef !== '') typeDef += '    ';
  return typeDef;
};

const isJoinTable = (foreignKeys, columns) => {
  return Object.keys(columns).length === Object.keys(foreignKeys).length + 1;
};

customHelper.getColumns = (primaryKey, foreignKeys, columns) => {
  let columnsStr = '';
  for (const columnName in columns) {
    if (
      !(foreignKeys && foreignKeys[columnName]) &&
      columnName !== primaryKey
    ) {
      const { dataType, isNullable, columnDefault } = columns[columnName];
      columnsStr += `\n    ${columnName}: ${
        typeConversion[dataType] ? typeConversion[dataType] : 'Int'
      }`;
      if (isNullable === 'NO' && columnDefault === null) columnsStr += '!';
    }
  }

  return columnsStr;
};

//modularize get relationship to return a type of relationship, route of that response
customHelper.getRelationships = (tableName, tables) => {
  let relationships = '';
  const alreadyAddedType = [];
  for (const refTableName in tables[tableName].referencedBy) {
    const {
      referencedBy: foreignRefBy,
      foreignKeys: foreignFKeys,
      columns: foreignColumns,
    } = tables[refTableName];

    if (foreignRefBy && foreignRefBy[tableName]) {
      if (!alreadyAddedType.includes(refTableName)) {
        alreadyAddedType.push(refTableName);
        const refTableType = pascalCase(singular(refTableName));
        relationships += `\n    ${toCamelCase(
          singular(refTableName)
        )}: ${refTableType}`;
      }
    } else if (
      Object.keys(foreignColumns).length !==
      Object.keys(foreignFKeys).length + 1
    ) {
      if (!alreadyAddedType.includes(refTableName)) {
        alreadyAddedType.push(refTableName);
        const refTableType = pascalCase(singular(refTableName));

        relationships += `\n    ${toCamelCase(
          refTableName
        )}: [${refTableType}]`;
      }
    }

    for (const foreignFKey in foreignFKeys) {
      if (tableName !== foreignFKeys[foreignFKey].referenceTable) {
        if (!alreadyAddedType.includes(refTableName)) {
          alreadyAddedType.push(refTableName);
          const manyToManyTable = toCamelCase(
            foreignFKeys[foreignFKey].referenceTable
          );
          relationships += `\n    ${manyToManyTable}: [${pascalCase(
            singular(manyToManyTable)
          )}]`;
        }
      }
    }
  }

  // ---------------- CHECK LOGIC--------------------------- //
  for (const FKTableName in tables[tableName].foreignKeys) {
    const object = tables[tableName].foreignKeys[FKTableName];
    const refTableName = object.referenceTable;
    if (refTableName) {
      const refTableType = pascalCase(singular(refTableName));
      relationships += `\n    ${toCamelCase(refTableName)}: [${refTableType}]`;
    }
  }

  return relationships;
};

const schemaImport = (uri) => {
  return (
    `const { makeExecutableSchema } = require('graphql-tools');\n` +
    `const { Pool } = require('pg');\n` +
    `const PG_URI = '${uri}';\n\n` +
    `const pool = new Pool({\n` +
    `  connectionString: PG_URI\n` +
    `});\n\n` +
    `const db = {};\n` +
    `db.query = (text,params, callback) => {
  console.log('executed query:', text)
  return pool.query(text, params, callback) \n};\n\n`
  );
};

const schemaExport = () => {
  return `  const schema = makeExecutableSchema({    
    typeDefs,    
    resolvers,
    });

    module.exports = schema;`;
};

const queryDescription = `A GraphQL query is composed of fields and is used to read or fetch values . In the example query below, we are querying for the field "people" and within that, querying for the fields: "gender, height, mass, etc". You can test out this query by copying the code and clicking "Playground."`;
const mutationDescription = `A GraphQL mutation is used to write/post, update, or delete values . `;

module.exports = {
  customHelper,
  typeSet,
  mutationHelper,
  isJoinTable,
  schemaImport,
  schemaExport,
  queryDescription,
  mutationDescription,
};
