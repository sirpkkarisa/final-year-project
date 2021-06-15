const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname,'public')));
app.use('/js', express.static(path.resolve('public/src/js/')));
app.use('/css', express.static(path.resolve('public/css/')));
app.use('/resources', express.static(path.resolve('public/src/resources/')));


module.exports = app;