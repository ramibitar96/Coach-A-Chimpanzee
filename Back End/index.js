// Imports
const express = require('express');
const socketIO = require('socket.io');          // Socket.io, the framework we use for the chat functionality

const expressRoutes = require('./expressRoutes.js');
const socketIOEvents = require('./socketIOEvents.js');
const dbUtils = require('./dbUtils.js');

var app = express();                            // Create the expressjs app
var server = require('http').Server(app);       // Wrap it up inside a server object so we can use it alongside socket.io
var io = socketIO(server);                      // Tell socket.io that we want it to run on our express.js server


expressRoutes(app);                         // Configure all the URL handlers in the express.js app
app.use(express.static("../frontend"));		// Tell expressjs that we want to serve all static files(.html, images, etc) from this folder.

socketIOEvents.init(io);                    // Configure all the event handlers for socket.io

// Start the server
startServer();
async function startServer()
{
	// Initialize the database, if it hasn't been already.
	await dbUtils.initializeDatabase();

	// Start handling requests
	server.listen(3000, function()
	{
		console.log('Listening on port 3000!');
	});
}
