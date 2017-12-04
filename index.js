const express = require('express');
const Chance = require('chance');
const morgan = require('morgan');

const config = require('./config');

const app = express();

app.get('/healthz', (req, res) => {
  res.sendStatus(200);
  res.end();
});

app.use(morgan('tiny'));

app.get('/config', (req, res) => {
  res.send(config);
});

app.get('/:type', (req, res) => {
  const chance = new Chance();
  const { type } = req.params;
  if (typeof chance[type] !== 'function' || config.allowed.indexOf(type) < 0) {
    res.sendStatus(404);
    return res.end();
  }
  res.send(chance[type]());
});

app.listen(config.port, () => {
  console.log(`up and running on port ${config.port}`);
});