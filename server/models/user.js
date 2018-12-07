let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcryptjs')
const SALT = 10

let schema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
})

schema.statics.generateHash = password => {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

module.exports = mongoose.model('User', schema)