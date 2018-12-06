let express = require('express')
let bp = require('body-parser')
let cors = require('cors')
require('./db/db-config')
let port = 3000
let server = express()

server.use(bp.json())
server.use(bp.urlencoded({
    extended: true
}))

let whitelist = ['http://localhost:8080']
let corsOptions = {
    origin: function (origin, callback) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
}
server.use(cors(corsOptions))

let auth = require('./auth/routes')
server.use(auth.session)
server.use('/auth', auth.router)

let songsRoutes = require('./routes/songs')
server.use('/songs', songsRoutes)



server.use('*', (req, res, next) => {
    res.status(404).send('this is not the page you are looking for')
})
server.listen(port, () => {
    console.log('server on port', port)
})