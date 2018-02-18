// Imports
const sqlite = require('sqlite');
const fs = require('fs');						// Used by execute_sql_script
const strip = require('sql-strip-comments');	// Used by execute_sql_script
const express = require('express');


// Whenever someone requests any file, we respond with "Hello World"
var app = express();
app.get('/', function (req, res)
{
	res.send('Hello World!');
});

// Start handling requests
app.listen(3000, function()
{
	console.log('Listening on port 3000!');
});


// TODO: move these functions off to a separate file.
// will do this once I learn how.

// Initializes the database, creating all the tables and stuff.
async function initialize_database()
{
	let dbPromise = sqlite.open('./database_contents/experiment_database.sqlite', {Promise});
	const db = await dbPromise;

	// Create the table
	await execute_sql_script("./sql_scripts/initialize_database.sql", db);

	// Read data from the table
	let result = await db.get("SELECT * FROM player_scores;");

	// Print the read data
	console.log(result);
}

// Executes the SQL script specified by filePath.
// Returns a Promise<sqlite.Statement> when it's done.
// filePath's type is string.  db's type is sqlite.Database
async function execute_sql_script(filePath, db)		
{
	let sqlText = fs.readFileSync(filePath, 'utf8');	// Read the SQL file into a string
	let noComments = strip(sqlText);					// Remove all comments so sqlite can execute it.

	// Execute it.
	return db.exec(noComments);
}