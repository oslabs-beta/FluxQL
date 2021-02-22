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
  `;
};

fileGenerator.readMeFile = () => {
  return `
# Getting Started
## Download
Use Node package manager to install the following packages within your existing file structure:
- graphql
- express-graphql (if you are utilizing an express server)
- graphql-tools
\`\`\` npm i graphql express-graphql graphql-tools \`\`\`

## Post Download
- Include the generated schema.js file within your file structure.
- Import your database connection to schema.js and store as "db".
\`\`\` const db = require('./<insert path with database>'); \`\`\`

- Import your generated graphql schema file within your server file, and require graphqlHTTP from express-graphql.
\`\`\`
const schema = require('../schema.js');
const { graphqlHTTP } = require('express-graphql');
\`\`\`

- Next, using the express-graphlql library, mount a GraphQL API server on the 'graphql' HTTP endoint within your server file, passing in your schema as the first parameter.
* Optional: To access the built-in graphiql playground to manually test queries, include property graphiql and set value to true. (https://github.com/graphql/graphiql)
\`\`\` 
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
\`\`\`

- Your new graphql endpoint is set-up! For further information on queries, see https://graphql.org/learn/queries/ . 
`;
};

export default fileGenerator;
