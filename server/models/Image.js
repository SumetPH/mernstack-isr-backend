const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('image', ImageSchema)
