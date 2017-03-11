'use strict';

const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

function returnMockJson(req, res) {
  let json;
  try {
    json = JSON.parse(fs.readFileSync(req.filePath, 'utf8'));
  } catch(e) {
    console.log('Unable to read file ', req.filePath)
    return res.status(500).json({error: 'Unable to read file ' + req.filePath});
  }
  res.json(json);
}

app.get('/api/domains', (req, res, next) => {
  req.filePath = './mock-api/domains/domains.json';
  next();
}, returnMockJson);

app.get('/api/domains/:id', (req, res, next) => {
  req.filePath = './mock-api/domains/ids/' + req.params.id + '.json';
  next();
}, returnMockJson);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
