// Imports
const request = require('request-promise-native');

const API_KEY = "RGAPI-f11b77d1-a7c9-4e32-88b9-2f874d1fd29c";

/**
 * Returns the summonder id of the given user
 * @param {*} username 
 */
async function get_summoner_data(username)
{
    // TODO: Cache the result in the database
    let url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + username;
    let options =
    {
        headers:
        {
            'X-Riot-Token': API_KEY
        },

        json: true
    };

    let results = await request.get(url, options);

    // TODO: Handle errors
    return results;
}

/**
 * Returns the rank of the given user
 * @param {*} username 
 */
function get_rank(username)
{
    // TODO: Cache the result in the database

    // Get
    let url = "";
}


// Exports
module.exports=
{
    get_summoner_data,
    get_rank
}