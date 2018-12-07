let router = require('express').Router()
let Users = require('../models/user')
let session = require('./session')

router.get('/authenticate', (req, res, next) => {
    Users.findById(req.session.uid)
        .then(user => {
            if (!user) {return res.status(401).send("please login to continue")}
            delete user._doc.hash
            res.send(user)
        })
        .catch(e => res.status(500).send(e))
})

router.post('/register', (req, res, next) => {
    // @ts-ignore
    req.body.hash = Users.generateHash(req.body.password)
    Users.create(req.body)
        .then(user => {
            delete user._doc.hash
            req.session.uid = user._id
            res.send(user)
        })
        .catch(e => {
            console.log(e)
        })
})

router.post('/login', (req, res, next) => {
    Users.findOne({email: req.body.email})
        .then(user => {
            if (!user) {return res.status(400).send('Invalid email or password')}
            if (!user.validatePassword(req.body.password)) {
                return res.status(400).send('Invalid email or password')
            }
            delete user._doc.hash
            req.session.uid = user._id
            res.send(user)
        })
        .catch(e => {
            console.log(e)
        })
})

router.delete('/logout', (req, res, next) => {
    req.session.destroy(e => {
        if (e) {return res.send(e)}
        return res.send({
            message: 'Successful Logout'
        })
    })
})

module.exports = { router, session }