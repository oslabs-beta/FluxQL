const resolverGenerator = require('../pgGenerators/resolverGenerators.js');
const { isJoinTable } = require('./helperFunctions.js');

const schemaGenerator = {};
const { mutations } = require('./typeGenerator');
const TypeGenerator = require('./typeGenerator');

schemaGenerator.assembleTypes = (tables) => {
  let queryType = '';
  let mutationType = '';
  let customType = '';
  let queryExample;
  let mutationExample;
  let typeExample ='';
  let queryTypeCount = 0;
  let mutationTypeCount = 0;
  for (const tableName in tables) {
    const tableData = tables[tableName];
    const { foreignKeys, columns } = tableData;
    if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
      queryType += TypeGenerator.queries(tableName, tableData);
      if (!queryExample)
        queryExample = TypeGenerator.exampleQuery(tableName, tables);
      queryTypeCount += 2;
      mutationType += TypeGenerator.mutations(tableName, tableData);
      if (!mutationExample)
        mutationExample = TypeGenerator.exampleMutation(tableName, tables);
      mutationTypeCount += 3;
      customType += TypeGenerator.custom(tableName, tables);
      if (!typeExample) typeExample += customType;
    }
  }

  const types =
    `${'const typeDefs = `\n' + '  type Query {\n'}${queryType}  }\n\n` +
    `  type Mutation {${mutationType}  }\n\n` +
    `${customType}\`;\n\n`;

  return {
    types,
    queryTypeCount,
    mutationTypeCount,
    queryExample,
    mutationExample,
    typeExample,
  };
};

schemaGenerator.assembleResolvers = (tables) => {
  let queryResolvers = '';
  let mutationResolvers = '';
  let customRelationshipResolvers = '';
  let resolverExample = '';

  for (const currentTable in tables) {
    const tableData = tables[currentTable];
    const { foreignKeys, columns } = tableData;
    if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
      queryResolvers += resolverGenerator.assembleQueries(
        currentTable,
        tableData
      );
      if (!resolverExample) resolverExample += queryResolvers.split('},')[0] + '}';
      mutationResolvers += resolverGenerator.assembleMutations(
        currentTable,
        tableData
      );
      customRelationshipResolvers += resolverGenerator.assembleCustomRelationships(
        currentTable,
        tables
      );
    }
  }
  console.log(resolverExample)
  const resolvers = 
    '\n  const resolvers = {\n' +
    '    Query: {' +
    `      ${queryResolvers}\n` +
    '    },\n\n' +
    '    Mutation: {\n' +
    `      ${mutationResolvers}\n` +
    '    },\n' +
    `      ${customRelationshipResolvers}\n  }\n`;
  
    return {
      resolvers,
      resolverExample
    }
};

module.exports = schemaGenerator;




/*

[
  '\n' +
    '\n' +
    '      book: (parent, args) => {\n' +
    "        const query = 'SELECT * FROM books WHERE id = $1';\n" +
    '        const values = [args.id];\n' +
    '        return db.query(query, values)\n' +
    '          .then(data => data.rows[0])\n' +
    '          .catch(err => new Error(err));\n' +
    '      ',
  '\n' +
    '\n' +
    '      books: () => {\n' +
    "        const query = 'SELECT * FROM books';\n" +
    '        return db.query(query)\n' +
    '          .then(data => data.rows)\n' +
    '          .catch(err => new Error(err));\n' +
    '      ',
  ''
]
*/