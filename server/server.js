const express = require('express');
const app = express();
const path = require('path');
const router = require('./router');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphQLServer/schema');

const PORT = 3000;

app.use(express.json());


// static file for webpack dev-server
app.use(express.static(path.resolve(__dirname, '../dist')));

/*** MAIN PAGE ***/
app.use(express.static(path.resolve(__dirname, '../client')));

// app.get('/*', (req, res, next) => {
//   return res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/* Route for Mongo & PG URI */
app.use('/', router);

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

app.listen(PORT, () => console.log(`App is running on 🚀 ${PORT}... 🚀`));

module.exports = app;
