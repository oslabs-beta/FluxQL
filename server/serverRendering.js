// import React from 'react';
// import { StaticRouter } from 'react-router-dom';
// import App from '../client/App.jsx';
// import { renderToString } from 'ReactDOMServer';

const React = require('react');
const { StaticRouter} = require('react-router-dom');
const App = require('../client/App.jsx');
const ReactDOMServer = require ('react-dom/server');
const { renderToString } = ReactDOMServer;

function renderHtml(url){
  const mark = renderToString(<StaticRouter location ={url} context={{}}>
    <App />
  </StaticRouter>);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DraQLa</title>
    </head>
    <body>
      <div id="root">${mark}</div>
      <script src="dist/bundle.js"></script>
  
    </body>
  </html>`;
};


module.exports = {
  renderHtml
};

/*
app.get('*', (req, res, next) => {
  try {
    const markup = renderToString(<StaticRouter location={req.url} context={{}}><App /></StaticRouter>);
    // const markup = renderToString(
    //   <StaticRouter location={req.url} context={{}}>
    //     <App />
    //   </StaticRouter>
    // );

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DraQLa</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="dist/bundle.js"></script>
    
      </body>
    </html>`;

    res.send(html);
  } catch (e){
    console.log(e);
    return next();
  }

});

*/