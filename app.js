const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const mongourl = process.env.MONGODB_URL;

const app = express();

require('./server/models/users').userTable();
const usersRoutes = require('./server/routes/users');

mongoose.connect(mongourl, {useNewUrlParser: true})
  .then(()=> console.log('Connection to mongodb Atlas is successful'))
  .catch(err => console.log(err));

const questionsRoutes = require('./server/routes/questions');
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

app.use('/auth', usersRoutes);
app.use('/auth',questionsRoutes);
module.exports = app;