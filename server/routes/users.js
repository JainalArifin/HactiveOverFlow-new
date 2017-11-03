const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const login = require('../helper/jwt')
const FB = require('fb')

var dataFB = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken)
  next()
}

router.post('/loginFb', dataFB, userController.loginFb)

router.post('/register', userController.signUpUser)
router.post('/login', userController.loginUser)

router.get('/', login.isLogin, userController.findAllUsers)
router.delete('/:id', login.isLogin, userController.removeUser)

module.exports = router;
