const router = require('express').Router();
const projects = require('../data/helpers/projectModel');

router.get('/', (req, res, next) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    projects.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/', validateProject(), (req, res, next) => {
    projects.insert(req.body)
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch((err) => {
            next(err)
        })
})

router.put('/:id', validateProjectId(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete('/:id', validateProjectId(), (req, res, next) => {
    projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project successfully deleted" })
        })
        .catch((err) => {
            next(err)
        })
})

// Middleware

function validateProject() {
    return (req, res, next) => {
        if(!req.body) {
            res.status(400).json({ message: "Missing project data." })
        }
        else if(!req.body.name || !req.body.description) {
            res.status(400).json({ message: "Missing required name and description fields." })
        }
        next()
    }
}

function validateProjectId() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if(project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({ message: "Invalid project ID" })
                }
                })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = router