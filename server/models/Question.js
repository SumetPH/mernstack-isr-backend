const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  },
  answers: [
    {
      body: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: new Date()
      }
    }
  ]
})

module.exports = mongoose.model('question', QuestionSchema)
