const express = require('express');

const router = express.Router();
const questionsCtrl = require('../controllers/questions');
const auth = require('../middlewares/auth').auth;

router.post('/questions', questionsCtrl.createQuestions);
router.get('/all-questions', questionsCtrl.getQuestions);
module.exports = router;