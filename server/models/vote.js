const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

const vote = mongoose.model('vote', voteSchema)

module.exports = vote
