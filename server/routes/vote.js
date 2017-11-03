const express = require('express')
const router = express.Router()
const voteController = require('../controller/voteController')
const auth = require('../helper/jwt')

router.get('/', voteController.findAllVote)
router.post('/like/:id', voteController.likeCreateVote)
router.post('/tidakLike/:id', voteController.tidakLikeVote)

module.exports = router
