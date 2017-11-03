const Vote = require('../models/vote')
const Question = require('../models/questions')
const ObjectId = require('mongoose').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const findAllVote = (req, res) => {
  Vote.find()
  .populate('author')
  .then((dataVote) => {
    res.send(dataVote)
  })
  .catch((err) => {
    console.error(err)
  })
}

const likeCreateVote = (req, res) => {
  let vote = jwt.verify(req.headers.token, process.env.SECRET, (err, vote) => {
    console.log(vote.id, '<---- ini vote like -----')
    Question.findById(req.params.id)
    .then((dataQuestion) => {
      Vote.create({
        author: vote.id
      })
      .then((dataVote) => {
        dataQuestion.suka.push(dataVote)
        res.send(dataVote)

        dataQuestion.save((err, updateQuestion) => {
          if (err) {

          } else {

          }
        })
      })
      .catch((err) => console.error(err))
    })
    .catch((err) => {
      console.error(err);
    })
  })
}

const tidakLikeVote = (req, res) => {
  let vote = jwt.verify(req.headers.token, process.env.SECRET, (err, vote) => {
    console.log(vote.id, '<---- ini vote like -----')
    Question.findById(req.params.id)
    .then((dataQuestion) => {
      Vote.create({
        author: vote.id
      })
      .then((dataVote) => {
        dataQuestion.tidakSuka.push(dataVote)
        res.send(dataVote)

        dataQuestion.save((err, updateQuestion) => {
          if (err) {

          } else {

          }
        })
      })
      .catch((err) => console.error(err))
    })
    .catch((err) => {
      console.error(err);
    })
  })
}

module.exports = {
  findAllVote,
  likeCreateVote,
  tidakLikeVote
}
