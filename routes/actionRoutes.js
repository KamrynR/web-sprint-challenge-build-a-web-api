const router = require('express').Router();
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    actions.get().then(actions => {
        res.status(200).json(actions);
    });
});

router.get('/:id', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(actions => {
        if (actions.length > 0) {
            res.status(200).json(actions);
        } else {
            res.status(400).json({ Error: 'Project ID does not exist.' });
        }
    })
    .catch(() => {
        res.status(500).json({
            Error: 'Server failure.'
        })
    });
});

module.exports = router;