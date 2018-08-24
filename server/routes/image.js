const router = require('express').Router()
const fs = require('fs')
const Image = require('../models/Image')
const imgur = require('imgur')
imgur.setCredentials('mernstack.isr@gmail.com', 'isr605222', 'b103b8577a84886')

// test
router.post('/api/image/test', (req, res) => {
   console.log(req.files.img)
   imgurUploader(req.files.img.data).then(data => console.log(data))
})

// get all images
router.get('/api/image/all', (req, res) => {
   Image.find().exec((err, images) => {
      if (err) {
         return res.json({
            msg: 'Error',
            res: err
         })
      }
      res.json({
         msg: 'Success',
         res: images
      })
   })
})

// upload image
router.post('/api/image/upload', (req, res) => {
   const { img } = req.body
   if (img === '') return res.json('error')
   const index = img.base64.indexOf(',') + 1
   const base64 = img.base64.substr(index)
   imgur.uploadBase64(base64).then(json => {
      console.log(json.data)
      const newImage = new Image({
         filename: img.name,
         path: json.data.link
      })

      newImage.save(err => {
         if (err) {
            return res.json({ msg: 'Upload file to Database error.' })
         }
         res.json({ msg: 'Upload success.' })
      })
   })
})

// delete image
router.delete('/api/image/delete/:id', (req, res) => {
   const { id } = req.params
   Image.findById(id).exec((err, image) => {
      if (err) {
         return res.json({ msg: 'Not found image.' })
      }
      try {
         fs.unlinkSync(image.path)
      } catch (err) {
         console.log('Not found file.')
      }
      image.remove(err => {
         if (err) {
            return res.json({ msg: 'Can not delete image.' })
         }
         res.json({ msg: 'Deleted' })
      })
   })
})

module.exports = router
