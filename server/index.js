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

let userRoutes = require('./routes/users')
let songRoutes = require('./routes/songs')
let playlistRoutes = require('./routes/playlists')

server.use('/users', userRoutes)
server.use('/songs', songRoutes)
server.use('/playlists', playlistRoutes)

server.use('/songs/*', (error, req, res, next) => {
    res.send(error)
})
server.use('*', (req, res, next) => {
    res.status(404).send('this is not the page you are looking for')
})
server.listen(port, () => {
    console.log('server on port', port)
})