const express = require('express');
const app = express();
const path = require('path');
const router = require('../server/router.js');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../server/graphQLServer/schema');


app.use(express.json());

/* route handlers */
app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use('/', router);

/* handles static files */
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// catch all
app.use('*', (req, res, next) => {
  return res.status(404).send('Sorry, wrong page! Try again! 🤪');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'Interal Server Error' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

module.exports = app;
