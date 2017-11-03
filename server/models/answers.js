const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  jawaban: String,
  questionId: { type: Schema.Types.ObjectId, ref: 'questions' },
  suka: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  tidakSuka: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
})

const answers = mongoose.model('answers', answerSchema)

module.exports = answers
