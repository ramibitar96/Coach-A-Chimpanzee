// Imports
const express = require('express');
const dbUtils = require('./dbUtils.js');

var app = express();

// Whenever someone requests any file, we respond with "Hello World"
app.get('/', function (req, res)
{
	res.send('Hello World!');
});

main();
async function main()
{
	// Initialize the database, if it hasn't been already.
	await dbUtils.initialize_database();

	// Start handling requests
	app.listen(3000, function()
	{
		console.log('Listening on port 3000!');
	});
}