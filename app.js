const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongourl = process.env.MONGODB_URL;

const app = express();

const {
  users, 
  questions,
  IEQ,
  FQ
} = require('./server/models/Models');
mongoose.connect(mongourl)
  .then(()=> console.log('Connection to mongodb Atlas is successful'))
  .catch(err => console.log(err));


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

app.use('/auth/all', (req, res) => {

  res.status(200)
    .json({
      status: 'success',
      data: users
    })
});
app.use('/auth/add-user', (req, res) => {
  res.status(201)
    .json({
      status: 'success',
      message: 'User successfully added'
    })
});
app.use('/auth/examination', (req, res) => {
  const { type } = req.body;
  if (type === 'ieq') {
    // do ieq staff here
    const ieq = new IEQ({
      field: req.body.field,
      passage: req.body.passage,
      questions: req.body.question,
      responses: req.body.response,
      questionWeight: req.body.questionWeight,
    });

    // Save the question
    ieq.save()
      .then(() => {
        console.log('question added');
        res.status(201)
          .json({
            message: 'Question Added!',
          });
      })
      .catch((err) => {
        console.log(err);

        res.status(400)
          .json({
            status: 'Error',
            error: err,
          })
      });
  } else {
      const fq = new FQ({
        field: req.body.field,
        questions: req.body.question,
        responses: req.body.response,
        questionWeight: req.body.questionWeight,
    });
      fq.save()
      .then(() => {
        console.log('question added');

        res.status(201)
          .json({
            message: 'Question Added!',
          });
      })
      .catch((err) => {
        console.log(err);

        res.status(400)
          .json({
            status: 'Error',
            error: err,
          })
      });
  }
});
module.exports = app;