let router = require('express').Router()
let Playlists = require('../models/playlist')
let mongoose = require('mongoose')
let ObjectId = mongoose.Types.ObjectId

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
router.delete('/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
        .then(() => res.send({
            message: 'playlist deleted'
        }))
        .catch(next)
})
router.put('/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send({
            message: "song added"
        }))
        .catch(next)
})


module.exports = router