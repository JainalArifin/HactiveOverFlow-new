const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController')
const auth = require('../helper/jwt')

router.get('/', questionController.findAllQuestion)
// router.post('/', auth.isLogin,  questionController.createQuestion)
// router.get('/:id', auth.isLogin, questionController.findByIdQuestion)
// router.put('/:id', auth.isLogin, auth.authByid, questionController.updateQuestion)
// router.delete('/:id', auth.isLogin, auth.authByid, questionController.removeQuestion)

// router.get('/', questionController.findAllQuestion)
router.post('/',  questionController.createQuestion)
router.get('/:id', questionController.findByIdQuestion)
router.put('/:id', auth.isLogin, questionController.updateQuestion)
router.delete('/:id', auth.isLogin,  auth.authByid, questionController.removeQuestion)


module.exports = router
