let mongoose = require('mongoose')
const connectionStr = `mongodb://porter:music1@ds133762.mlab.com:33762/music-vue`
let connection = mongoose.connection

mongoose.connect(connectionStr, {
    useNewUrlParser: true
})

connection.on('error', err => {
    console.log('DB ERROR', err)
})

connection.once('open', () => {
    console.log("Watson i do believe we're connected to db")
})