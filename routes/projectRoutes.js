const router = require('express').Router();
const projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: 'Cannot fetch projects.'});
        });
});

router.get('/:id', (req, res) => {
    projects.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: 'Cannot fetch this project.'});
        });
})

router.post('/', validateProject, (req, res) => {
    projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            res.status(500).json({
                Error: 'There was an error in adding your project data.'
            })
        });
});

router.put('/:id', validateProjectId, (req, res) => {
    projects.update(req.params.id, req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            res.status(500).json({ error: "Error updating user" })
        });
});

router.delete('/:id', validateProjectId, (req, res) => {
projects.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: "Project successfully deleted" });
    })
    .catch(() => {
        res.status(500).json({ error: "Error deleting project" });
    });
});

// Middleware
function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "Missing project data." });
    }
    else if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: "Missing required name and description fields." });
    }
    next();
}

function validateProjectId(req, res, next) {
    projects.get(req.params.id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: "Invalid project ID" });
            }
            })
        .catch(() => {
            res.status(500).json({ message: "Error retrieving project data" });
        });
}

module.exports = router;