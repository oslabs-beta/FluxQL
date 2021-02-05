const schemaGenerator = {};
const { mutations } = require('./typeGenerator');
const TypeGenerator = require('./typeGenerator');

schemaGenerator.assembleTypes = (tables) => {
  let queryType = '';
  let mutationType = '';

  for (const tableName in tables){
    const tableData = tables[tableName];
    queryType += TypeGenerator.queries(tableName, tableData);
    mutationType += TypeGenerator.mutations(tableName, tableData)
  }

  return queryType + mutationType;
  
}




schemaGenerator.assembleResolvers = (tables) => {
  return;
};

module.exports = schemaGenerator;