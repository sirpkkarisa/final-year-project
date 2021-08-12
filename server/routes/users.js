const express = require('express');

const router = express.Router();
const usersCtrl = require('../controllers/users');
const admin = require('../middlewares/admin');

router.post('/create-user', (req, res, next) => {
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
      res.status(200)
          .json({
            status: 'success',
            message: 'isAdmin',
          });
      return  next();
    } catch (error) {
      res.status(401)
        .json({
            status: 'error',
            error: 'Unauthorized',
        });
    }
});
router.post('/isAdmin',admin, usersCtrl.createUser);
router.post('/signin', usersCtrl.signIn);
router.patch('/change-password', usersCtrl.changePassword);
router.patch('/forgot-password', usersCtrl.forgotPassword);
router.patch('/reset-password', usersCtrl.resetPassword);

module.exports = router;