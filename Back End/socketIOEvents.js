// Imports
const authUtils = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');
const cookieParser = require('cookie');

let userSockets = {};   // A dictionary mapping usernames to their sockets
let socketUsers = {};   // A dictionary mapping sockets to their usernames


module.exports = function(io)
{
    // Called whenever a client connects to socket.io
    // Associates the socket with the user
    io.on('connection', async function(socket)
    {
        console.log("A user connected, bearing the cookie " + socket.handshake.headers.cookie);

        // Check the session token to find out what user this is
        let cookie = cookieParser.parse(socket.handshake.headers.cookie);
        let session_token = cookie.session_token;

        let authResult = await authUtils.checkToken(session_token);

        // Don't do anything if the cookie failed
        // TODO: Send some kind of error message 
        if (authResult.error_code != ErrorCodeEnum.SUCCESS)
        {
            console.log("chatroom: error trying to authenticate token " + session_token + "\n error code " + authResult.error_code);
            return;
        }

        // Associate the socket with the username
        userSockets[authResult.username] = socket;
        socketUsers[socket.id] = authResult.username;

        // TODO: Remove the user from both dicitonaries when they disconnect

        console.log("associated socket " + socket.id + " with username " + authResult.username);
    });
}

// Returns the given user's partner.
function getPartner(username)
{
    // TODO
    return "ceilia";
}