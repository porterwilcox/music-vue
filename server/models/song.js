let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
    userId: {type: ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    albumArt: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    audioPreview: {type: String, required: true},
    vote: {type: Number, default: 0},
    itunesId: {type: String, required: true},
})

module.exports = mongoose.model('Song', schema)