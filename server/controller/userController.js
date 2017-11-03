const User = require('../models/users')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const FB = require('fb')


const loginFb = (req, res) => {
  FB.api('/me', {fields: ['id','name','email']}, (response) => {
    console.log('ini response dari fb /me', response)
    User.find({
      fb_id: response.id
    })
    .then(dataUser => {
      if (dataUser.length == 0) {
        User.create({
          fb_id: response.id,
          name: response.name,
          email: response.email
        })
        .then(userCreated => {
          console.log('ini hasil user create: ', userCreated);

          let token = jwt.sign({
            id: userCreated._id,
            fb_id: userCreated.fb_id,
            name: userCreated.name,
            email: userCreated.email
          }, process.env.SECRET)

          res.send({
            message: 'login success',
            token: token
          })
        })
        .catch(err => {
          res.send(err)
        })
      } else {
        console.log('ini hasil find user:', dataUser);
        let token = jwt.sign({
          id: dataUser[0]._id,
          fb_id: dataUser[0].fb_id,
          name: dataUser[0].name,
          email: dataUser[0].email
        }, process.env.SECRET)

        res.send({
          message: 'login success',
          token: token
        })
      }
    })
    .catch(err => {
      res.send(err)
    })
  })
}





const findAllUsers = (req, res) => {
  User.find({})
  .then((dataUser) => {
    res.send(dataUser)
  })
  .catch((err) => {
    res.send(err)
  })
}

const signUpUser = (req, res) => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(`${req.body.password}`, salt)
  User.create({
    username: req.body.username,
    password: hash
  })
  .then((dataUser) => {
    res.send(dataUser)
  })
  .catch((err) => {
    res.send(err)
  })
}

const loginUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then((dataUser) => {
    if(dataUser == null){
      // console.log('--ini kalo null--->', dataUser);
      res.send({
        msg: 'username not found'
      })
    }
    else {
      if(bcrypt.compareSync(req.body.password, dataUser.password)){
        // console.log('----->', dataUser.password);
        var token = jwt.sign({
          id: dataUser.id,
          username: dataUser.username
        },process.env.SECRET)
        res.send(token)
      }else{
        res.send('anda belum register')
      }
    }
  })
  .catch((err) => {
    res.send(err)
  })
}

const removeUser = (req, res) => {
  User.findByIdAndRemove({
    _id: ObjectId(req.params.id)
  })
  .then((dataUser) => {
    res.send({
      msg: 'user berhasil di hapus',
      dataUser: dataUser
    })
  })
}

module.exports = {
  findAllUsers,
  signUpUser,
  loginUser,
  removeUser,
  loginFb
}
