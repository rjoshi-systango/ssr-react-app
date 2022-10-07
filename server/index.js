import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import App, { FirstPage, SecondPage } from '../src/App';
import { StaticRouter } from 'react-router-dom';

const PORT = process.env.PORT || 3006;
const app = express();
app.get('/', (req, res) => {
  console.log("**********Insideeee");
  console.log("req", req.url);
  let indexFile = null;

  console.log("case 1");
  const app = ReactDOMServer.renderToString(<StaticRouter><App /></StaticRouter>)
  indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });

});

app.get('/first-page', (req, res) => {
  console.log("**********First page");
  console.log("req", req.url);
  let indexFile = null;

  console.log("case 1");
  const app = ReactDOMServer.renderToString(<StaticRouter><FirstPage /></StaticRouter>)
  indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });

});

app.get('/second-page', (req, res) => {
  console.log("**********First page");
  console.log("req", req.url);
  let indexFile = null;

  console.log("case 1");
  const app = ReactDOMServer.renderToString(<StaticRouter><SecondPage /></StaticRouter>)
  indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });

});



app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});