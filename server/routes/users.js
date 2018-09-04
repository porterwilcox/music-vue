let router = require('express').Router()
let Users = require('../models/user')

router.get('/:name/:password', (req, res, next) => {
    Users.find({username: req.params.name, password: req.params.password})
        .then(user => res.send(user))
        .catch(next)
})
router.get('/exists/now/:name', (req, res, next) => {
    Users.find({username: req.params.name})
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