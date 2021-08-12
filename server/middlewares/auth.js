const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
   try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401)
        .json({
          status: 'error',
          error: 'Unauthorized',
        });
    } else {
      next();
    }

   } catch (error) {
    return res.status(401)
    .json({
        status: 'error',
        error: 'Unauthorized',
    });
   }
}