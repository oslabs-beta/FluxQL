const express = require('express');
const app = express();
const path = require('path');
const router = require('./router');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphQLServer/schema');

const PORT = 3000;

// if (process.env.NODE_ENV === 'production') {
//   console.log(process.env.NODE_ENV)
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   // serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });
// }


app.use(express.json());

app.use((req, res, next) => {
  console.log(`
  *** FLOW METHOD ***\n
  URL: ${req.url}\n
  METHOD: ${req.method}\n`);
  return next();
});


/* DEVELOPMENT MODE */
app.get('/app', (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(express.static(path.resolve(__dirname, '../client')));

/* PRODUCTION MODE */
// app.use('/dist', express.static(path.join(__dirname, '../dist')));
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// });
// // app.get('/app', (req, res) => {
// //   return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// // });


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
