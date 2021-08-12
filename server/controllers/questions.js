const {
    IEQ,
    FQ
  } = require('../models/Models');

exports.createQuestions= (req, res) => {
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
};
exports.getQuestions = (req, res) => {
    let questionsObj;

    IEQ.find().then(
        (ieq)=> {
            questionsObj = ieq;
        }
    )
    .catch(
        (error) => {
            res.status(400)
                .json(error);
        }
    );

    FQ.find().then(
        (fq)=> {
            const newobj = questionsObj.concat(fq);

            res.status(200)
                .json({
                    data: newobj,
                });
        }
    )
    .catch(
        (error) => {
            console.log(error);
            res.status(400)
                .json(error);
        }
    );
};
