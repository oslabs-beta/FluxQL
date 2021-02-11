const fileGenerator = {};

fileGenerator.schemaFile = (types, resolvers) => {
  return `
  const { makeExecutableSchema } = require('graphql-tools');

  ${types}

  ${resolvers}

  const schema = makeExecutableSchema({    
    typeDefs,    
    resolvers,
    });

    module.exports = schema;
  `
};

fileGenerator.readMeFile = () => {
  return 'readme';
};

export default fileGenerator;
