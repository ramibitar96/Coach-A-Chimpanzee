// Imports
const sqlite = require('sqlite');
const fs = require('fs');
const strip = require('sql-strip-comments');


// Initializes the database, creating all the tables.
// If the database has already been initialized, does nothing.
async function initialize_database()
{
	// Connect to the database
	const db = await sqlite.open('./database_contents/database.sqlite', {Promise});;

	// Create the tables
	await execute_sql_script("./sql_scripts/initialize_database.sql", db);
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

// Exports
module.exports = 
{
	initialize_database
}