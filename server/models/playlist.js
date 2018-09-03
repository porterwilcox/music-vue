let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
    name: {
        type: String,
        default: "Your Playlist"
    },
    songs: {
        type: Array,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Playlist', schema)