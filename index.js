const express = require('express');
const server = express();
const port =  3333;

const actions = require('./routes/actionRoutes');
const projects = require('./routes/projectRoutes');

server.use(express.json());
server.use('/api/actions', actions);
server.use('/api/projects', projects);

server.listen(port, () => {
    console.log(`\n*** Server running at http://localhost:${port} ***\n`)
});