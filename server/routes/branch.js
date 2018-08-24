const router = require('express').Router()
const Branch = require('../models/Branch')

router.get('/api/branch/test', (req, res) => {
   res.json('Test')
})

// get branch
router.get('/api/branch/all', (req, res) => {
   Branch.find().exec((err, result) => {
      res.json({ msg: 'success', res: result })
   })
})

// create branch
router.post('/api/branch/create', (req, res) => {
   const { branch, degree, abbreviation } = req.body
   Branch.findOne({ abbreviation }).exec((err, result) => {
      if (result) {
         return res.json({ msg: 'This branch has already.' })
      }

      const newBranch = new Branch({ branch, degree, abbreviation })

      newBranch.save(err => {
         if (err) {
            return res.json({ msg: 'error', res: err })
         }
         return res.json({ msg: 'saved' })
      })
   })
})

// delete branch
router.delete('/api/branch/delete/:id', (req, res) => {
   const { id } = req.params
   Branch.findByIdAndRemove(id).exec((err, result) => {
      if (err) {
         return res.json({ msg: 'error', res: err })
      }
      return res.json({ msg: 'deleted', res: result })
   })
})

module.exports = router
