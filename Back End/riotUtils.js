// Imports
const request = require('request-promise-native');

const API_KEY = "RGAPI-f11b77d1-a7c9-4e32-88b9-2f874d1fd29c";

/**
 * Returns the summoner data of the given user
 * output matches that of /lol/summoner/v3/summoners/by-name/{summonerName}
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
 * Returns the given user's solo queue rank
 * If they don't have a solo queue rank, returns "UNRANKED"
 * @param {*} username 
 */
async function get_rank(username)
{
    // TODO: Cache the result in the database

    let summoner_data = await get_summoner_data(username);

    // Query Riot's servers
    let url = "https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + summoner_data.id;
    let options =
    {
        headers:
        {
            'X-Riot-Token': API_KEY
        },

        json: true
    };

    let results = await request.get(url, options);

    // Search for and return their solo queue rank
    for (let leagueInfo in results)
    {
        if (leagueInfo.queueType == "RANKED_SOLO_5x5")
            return leagueInfo.tier;
    }

    // We couldn't find their solo queue rank, so return "UNRANKED"
    return "UNRANKED";
}


// Exports
module.exports=
{
    get_summoner_data,
    get_rank
}