let express = require('express')
let bp = require('body-parser')
let cors = require('cors')
require('./db/db-config')
let port = 3000
let server = express()

server.use(cors())
server.use(bp.json())
server.use(bp.urlencoded({
    extended: true
}))

let songRoutes = require('./routes/songs')

server.use('/songs', songRoutes)

server.listen(port, () => {
    console.log('server on port', port)
})