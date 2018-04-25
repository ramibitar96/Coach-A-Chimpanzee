// Imports
const request = require('request-promise-native');

const API_KEY = "RGAPI-f11b77d1-a7c9-4e32-88b9-2f874d1fd29c";
const REQUEST_OPTIONS = 
{
    headers:
    {
        'X-Riot-Token': API_KEY
    },

    json: true
};

/**
 * Returns the summoner data of the given user
 * output matches that of /lol/summoner/v3/summoners/by-name/{summonerName}
 * @param {*} username 
 */
async function get_summoner_data(username)
{
    // TODO: Cache the result in the database
    let url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + username;
    let results = await request.get(url, REQUEST_OPTIONS);

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
    let results = await request.get(url, REQUEST_OPTIONS);

    // Search for and return their solo queue rank
    for (let i = 0; i < results.length; i++)
    {
        if (results[i].queueType == "RANKED_SOLO_5x5")
            return results[i].tier;
    }

    // We couldn't find their solo queue rank, so return "UNRANKED"
    return "UNRANKED";
}

/**
 * Returns the same output as /lol/spectator/v3/active-games/by-summoner/{summonerId}
 * @param {*} username 
 */
async function get_match_data(username)
{
    // Get the summoner id first, as usual

    let summoner_data = await get_summoner_data(username);

    // Query Riot's servers
    let url = "/lol/spectator/v3/active-games/by-summoner/" + summoner_data.id;
    return await request.get(url, REQUEST_OPTIONS);
}

// Exports
module.exports=
{
    get_summoner_data,
    get_rank,
    get_match_data
}