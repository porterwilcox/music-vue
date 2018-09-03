let router = require('express').Router()
let Users = require('../models/user')

router.get('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next)
})
router.post('/', (req, res, next) => {
    Users.create(req.body)
        .then(user => res.send(user))
        .catch(next)
})
router.delete('/:id', (req, res, next) => {
    Users.findByIdAndRemove(req.params.id)
        .then(() => res.send({
            message: 'user deleted'
        }))
})

module.exports = router