const resolverGenerator = require('../pgGenerators/resolverGenerators.js');
const { isJoinTable } = require('./helperFunctions.js');

const schemaGenerator = {};
const { mutations } = require('./typeGenerator');
const TypeGenerator = require('./typeGenerator');

schemaGenerator.assembleTypes = (tables) => {
  let queryType = '';
  let mutationType = '';
  let customType = '';
  let queryExample = '';
  let mutationExample = '';
  let queryTypeCount = 0;
  let mutationTypeCount = 0;
  for (const tableName in tables) {
    const tableData = tables[tableName];
    const { foreignKeys, columns } = tableData;
    if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
      queryType += TypeGenerator.queries(tableName, tableData);
      if (!queryExample.length) queryExample += TypeGenerator.exampleQuery(tableName, tables);
      queryTypeCount += 2
      mutationType += TypeGenerator.mutations(tableName, tableData);
      if (!mutationExample.length) mutationExample += TypeGenerator.exampleMutation(tableName, tables);
      mutationTypeCount += 3
      customType += TypeGenerator.custom(tableName, tables);
    }
    
  }
  console.log(queryExample)
  console.log(mutationExample)
  const types = 
    `${'const typeDefs = `\n' + 
    '  type Query {\n'}${queryType}  }\n\n` +
    `  type Mutation {${mutationType}  }\n\n` +
    `${customType}\`;\n\n`
  
  return {
    types,
    queryTypeCount,
    mutationTypeCount,
    queryExample,
    mutationExample
  };
};

schemaGenerator.assembleResolvers = (tables) => {
  let queryResolvers = '';
  let mutationResolvers = '';
  let customRelationshipResolvers = '';

  for (const currentTable in tables) {
    const tableData = tables[currentTable];
    const { foreignKeys, columns } = tableData;
    if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
      queryResolvers += resolverGenerator.assembleQueries(
        currentTable,
        tableData
      );
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

  return (
    '\n  const resolvers = {\n' +
    '    Query: {' +
    `      ${queryResolvers}\n` +
    '    },\n\n' +
    '    Mutation: {\n' +
    `      ${mutationResolvers}\n` +
    '    },\n' +
    `      ${customRelationshipResolvers}\n  }\n`
  );
};

module.exports = schemaGenerator;
