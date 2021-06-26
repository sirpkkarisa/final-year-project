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
app.use('/views', express.static(path.resolve('public/src/js/views/')));
app.use('/controllers', express.static(path.resolve('public/src/js/controllers/')));
app.use('/models', express.static(path.resolve('public/src/js/models/')));
app.use('/css', express.static(path.resolve('public/css/')));
app.use('/resources', express.static(path.resolve('public/src/resources/')));

app.use('/auth/login', (req, res) => {
  res.status(201)
    .json({
      status: 'success',
      data: req.body
    })
});
const user = [
  {
    name: 'Pascal Kazungu',
    email: 'pk@yahoo.com',
    type: 'lecturer',
    status: 'active'
  },
  {
    name: 'Pascal Karisa',
    email: 'pkk@yahoo.com',
    type: 'student',
    status: 'active'
  },
  {
    name: 'Karisa Kazungu',
    email: 'kk@yahoo.com',
    type: 'lecturer',
    status: 'inactive'
  },
  {
    name: 'Gustavo Pablo',
    email: 'gp@yahoo.com',
    type: 'student',
    status: 'active'
  }
]
app.use('/auth/all', (req, res) => {

  res.status(201)
    .json({
      status: 'success',
      data: user
    })
});
app.use('/auth/add-user', (req, res) => {
  res.status(201)
    .json({
      status: 'success',
      message: 'User successfully added'
    })
});

module.exports = app;