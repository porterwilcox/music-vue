let mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    name: {
        type: String,
        default: "Your Playlist"
    },
    songs: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Playlist', schema)