const router = require('express').Router()
const actions = require('../data/helpers/actionModel')

router.get('/', (req, res, next) => {
    actions.get()
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    actions.get(req.params.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/', (req, res, next) => {
    actions.insert(req.body)
        .then((actions) => {
            res.status(201).json(actions)
        })
        .catch((err) => {
            next(err)
        })
})

router.put('/:id', (req, res, next) => {
    actions.update(req.params.id, req.body)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete('/:id', (req, res, next) => {
    actions.remove(req.params.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router