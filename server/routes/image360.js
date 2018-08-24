const router = require('express').Router()
const Image360 = require('../models/Image360')
const fs = require('fs')

// get all image360
router.get('/api/image360/all', (req, res) => {
   Image360.find().exec((err, image360s) => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }
      res.json({
         msg: 'Success',
         res: image360s
      })
   })
})

// create or update image360
router.post('/api/image360/create', (req, res) => {
   const { branch } = req.body

   if (!req.files) {
      return res.json({ msg: 'File not found.' })
   }

   Image360.findOne({ branch }).exec((err, img) => {
      // file from client
      const { file } = req.files
      const path = `static/360/${branch + file.name}`
      if (!img) {
         // create
         file.mv(path, err => {
            if (err) {
               return res.json({ mas: 'Can not upload image360.' })
            }

            const newImage360 = new Image360({
               branch,
               filename: branch + file.name,
               path: path
            })

            newImage360.save((err, newImg) => {
               if (err) {
                  return res.json('Can not save image360.')
               }
               res.json({
                  msg: 'Saved',
                  res: newImg
               })
            })
         })
      } else {
         // update
         try {
            fs.unlinkSync(img.path)
         } catch (err) {
            console.log('Not found file.')
         }
         file.mv(path, err => {
            if (err) {
               return res.json({ mas: 'Can not update image360.' })
            }

            img.update({
               $set: { filename: branch + file.name, path: path }
            }).exec((err, newImg) => {
               if (err) {
                  return res.json('Error')
               }
               res.json({
                  msg: 'Updated',
                  res: newImg
               })
            })
         })
      }
   })
})

module.exports = router
