
const express = require('express');
const app = express();
const path = require('path');


const PORT = 3000;

// require routers here

app.use(express.json());

// flow check
app.use((req, res, next) => {
  console.log(`
  👻 👻 👻 FLOW METHOD 👻 👻 👻
  URL: ${req.url}\n
  METHOD: ${req.method}\n`);
  return next();
});

// route handlers

// static file for webpack dev-server
app.use(express.static(path.resolve(__dirname, '../dist')))

/*** MAIN PAGE ***/
app.get('/client/v4Data.json', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../client/v4Data.json')));
app.use(express.static(path.resolve(__dirname, '../client')));



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


app.listen(PORT, () => console.log(`App is running on 🚀 ${PORT}... 🚀`))
