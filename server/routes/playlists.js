let router = require('express').Router()
let Playlists = require('../models/playlist')

router.get('/', (req, res, next) => {
    Playlists.find({})
        .then(playlist => {
            return res.send(playlist)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Playlists.create(req.body)
        .then(playlist => {
            return res.send(playlist)
        })
        .catch(next)
})


module.exports = router