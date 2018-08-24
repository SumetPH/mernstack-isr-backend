const router = require('express').Router()
const Question = require('../models/Question')

// get all questions
router.get('/api/question/all', (req, res) => {
   Question.find().exec((err, questions) =>
      res.json({
         msg: 'Success',
         res: questions
      })
   )
})

// get question by id
router.get('/api/question/get/:id', (req, res) => {
   Question.findById(req.params.id).exec((err, question) => {
      if (err) {
         return res.json({ msg: 'Error', res: err })
      }
      res.json({
         msg: 'Success',
         res: question
      })
   })
})

// create post
router.post('/api/question/create/post', (req, res) => {
   const { title, body, created } = req.body
   const newQuestion = new Question({
      title,
      body,
      created
   })

   newQuestion.save(err => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }

      res.json({ msg: 'Saved' })
   })
})

// delete post
router.delete('/api/question/delete/:id', (req, res) => {
   const id = req.params.id
   Question.findOneAndRemove({ _id: id }).exec(err => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }
      res.json({ msg: 'Deleted' })
   })
})

// create answer
router.post('/api/question/create/answer', (req, res) => {
   const { questionId, body, created } = req.body

   Question.findById(questionId).exec((err, question) => {
      if (err || question === null) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }
      const newAnswer = {
         body,
         created
      }
      question.answers.push(newAnswer)
      question.save(err => {
         if (err) {
            return res.json({
               msg: 'Error',
               res: err
            })
         }
         res.json({ msg: 'Saved' })
      })
   })
})

module.exports = router
