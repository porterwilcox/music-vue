let eSession = require('express-session')
let mongoStore = require('connect-mongodb-session')(eSession)

let store = new mongoStore({
    uri: 'mongodb://porter:samsclass14@ds052819.mlab.com:52819/sams-class',
    collection: 'Sessions'
})

store.on('error', e => {
    console.log('session error:', e)
})

let session = eSession({
    secret: 'Sammy Sammy Fo Fammy',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2
    },
    store,
    resave: true,
    saveUninitialized: true
})

module.exports = session