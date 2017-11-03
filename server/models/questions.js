const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  judul: String,
  content: String,
  answerId: [{
    type: Schema.Types.ObjectId,
    ref: 'answers'
  }],
  suka: [{
    type: Schema.Types.ObjectId,
    ref: 'vote'
  }],
  tidakSuka: [{
    type: Schema.Types.ObjectId,
    ref: 'vote'
  }]
})

const questions = mongoose.model('questions', questionSchema)
module.exports = questions
