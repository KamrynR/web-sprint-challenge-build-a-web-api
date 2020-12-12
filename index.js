const express = require('express')
const server = express()
const port =  8080

const actions = require('./routers/actionRouter')
const projects = require('./routers/projectRouter')

server.use(express.json())

server.use((req, res, next) => {
	const time = new Date().toISOString()
	console.log(`\n*** New Request *** \n Time: [${time}]\n IP address: ${req.ip}\n Method: ${req.method}\n URL: ${req.url}`)
    next()
})

server.use('/api/actions', actions)
server.use('/api/projects', projects)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
    console.log(`\n*** Server running at http://localhost:${port} ***\n`)
})