const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image360Schema = new Schema({
  branch: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('image360', Image360Schema)
