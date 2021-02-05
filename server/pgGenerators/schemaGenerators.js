const resolverGenerator = require('../pgGenerators/resolverGenerators.js');
const isJoinTable = require('./helperFunctions.js');

const schemaGenerator = {};

schemaGenerator.assembleTypes = (tables) => {
    return '';
}


schemaGenerator.assembleResolvers = (tables) => {
  let queryResolvers = '';
  let mutationResolvers = '';
  let customRelationshipResolvers = '';

  for (const currentTable in tables) {
    const tableData = tables[currentTable];
    const { foreignKeys, columns } = tableData;
    if (!foreignKeys || !isJoinTable(foreignKeys, columns)) {
      queryResolvers += resolverGenerator.assembleQueries(currentTable, tableData);
      mutationResolvers += resolverGenerator.assembleMutations(currentTable, tableData);
      customRelationshipResolvers += resolverGenerator.assembleCustomRelationships(currentTable);
    }
  }

  return (
    `\n  const resolvers = {\n` +  
    `    Query: {` + 
    `      ${queryResolvers}\n` + 
    `    },\n\n` +
    `    Mutation: {\n` + 
    `      ${mutationResolvers}\n` +
    `    },\n` +
    `      ${customRelationshipResolvers}\n  }\n`
  );
};

module.exports = schemaGenerator;