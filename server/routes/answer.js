const express = require('express')
const router = express.Router()
const answerController = require('../controller/answerController')
const auth = require('../helper/jwt')

// router.get('/', auth.isLogin, answerController.findAllAnswer)
router.get('/', answerController.findAllAnswer)
router.post('/:id', answerController.createAnswer)
router.get('/:id', answerController.findByAnswer)
router.put('/:id', auth.isLogin, auth.authAnswer,  answerController.updateANswer)
router.delete('/:id', auth.isLogin, auth.authAnswer,  answerController.removeAnswer)

module.exports = router
