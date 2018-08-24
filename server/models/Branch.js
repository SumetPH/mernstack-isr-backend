const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BranchSchema = new Schema({
   branch: {
      type: String,
      required: true
   },
   degree: {
      type: String,
      required: true
   },
   abbreviation: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('branch', BranchSchema)
