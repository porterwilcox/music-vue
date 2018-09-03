let router = require('express').Router()
let Playlists = require('../models/playlist')
let mongoose = require('mongoose')
let ObjectId = mongoose.Types.ObjectId

router.get('/:id', (req, res, next) => {
    Playlists.find({userId: req.params.id})
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
            message: "playlist updated"
        }))
        .catch(next)
})
router.put('/modify/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send({
            message: "song removed"
        }))
        .catch(next)
})

module.exports = router