var jwt = require('jsonwebtoken')
require('dotenv').config()

const questions = require('../models/questions')
const answers = require('../models/answers')
const ObjectId = require('mongodb').ObjectId

const isLogin = (req, res, next) => {
  var decoded = jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=>{
    // console.log('------>', decoded);
    if(err){
      res.send('anda belum login')
    }else {
      req.id = decoded.id
      next()
    }
  })
}

const authByid = (req, res, next) => {
  questions.findById({
    _id: req.params.id
  })
  .then((dataQuestion) => {
    // console.log('---------------------------------');
    console.log(dataQuestion, '<--------dataquestion');
    console.log(dataQuestion.author, 'ini id question')
    console.log(req.id, 'ini req id')
    if(dataQuestion.author == req.id){
      console.log('success');
      next()
    }else {
      res.send('anda tidak boleh meng akses ini')
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

const authAnswer = (req, res, next) => {
  answers.findById({
    _id: req.params.id
  })
  .then((dataAnswer) => {
    // console.log('---------------------------------');
    console.log(dataAnswer, '<--------dataquestion');

    if(dataAnswer.author == req.id){
      console.log('success');
      next()
    }else {
      res.send('anda tidak boleh meng akses ini')
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  isLogin,
  authByid,
  authAnswer
}
