module.exports = (req, res, next) => {
    try {
       const token = req.headers.authorization.split(' ')[1];
       let decodedToken = new Buffer.from(token, 'base64').toString();
       decodedToken = JSON.parse(decodedToken)
       const username = decodedToken.name;
       const password = decodedToken.password;
       if (password !== process.env.ADM_PASSWORD || username !== process.env.USERS) {
        return res.status(401)
           .json({
             status: 'error',
             error: 'Unauthorized',
           });
       }
       return  next();
     } catch (error) {
       res.status(401)
         .json({
             status: 'error',
             error: 'Unauthorized',
         });
     }
 
   };