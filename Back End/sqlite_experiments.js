import sqlite from 'sqlite';

initialize_database();

async function initialize_database()
{
	let dbPromise = sqlite.open('./experiment_database.sqlite', {Promise});
	const db = await dbPromise;

	// Create the table
	let result = await db.get("CREATE TABLE player_scores (playerid int, score int);");
	
	// TODO: Read from the table
}