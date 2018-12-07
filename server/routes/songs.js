let router = require('express').Router()
let Songs = require('../models/song')

router.get('/', (req, res, next) => {
    Songs.find({userId: req.session.uid})
        .then(playlist => {
            return res.send(playlist)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    req.body.userId = req.session.uid
    Songs.create(req.body)
        .then(song => {
            return res.send(song)
        })
        .catch(next)
})
router.delete('/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then(() => res.send({
            message: 'song deleted'
        }))
        .catch(next)
})
router.put('/', (req, res, next) => {
    Songs.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
        .then(song => {res.send(song)})
        .catch(next)
})
// router.put('/:id', (req, res, next) => {
//     Songs.findByIdAndUpdate(req.params.id, req.body)
//         .then(() => res.send({
//             message: "playlist updated"
//         }))
//         .catch(next)
// })
// router.put('/modify/:id', (req, res, next) => {
//     Songs.findByIdAndUpdate(req.params.id, req.body)
//         .then(() => res.send({
//             message: "song removed"
//         }))
//         .catch(next)
// })

module.exports = router