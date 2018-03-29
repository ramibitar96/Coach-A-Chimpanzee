// Imports
const authUtils = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');
const cookieParser = require('cookie');
const matchmaking = require('./matchmaking.js');
const {User} = require('./matchmaking.js')

let userSockets = {};   // A dictionary mapping usernames to their sockets
let socketUsers = {};   // A dictionary mapping sockets to their usernames


module.exports = function(io)
{
    // Called whenever a client connects to socket.io
    // Associates the socket with the user
    io.on('connection', async function(socket)
    {
        debugger;
        console.log('ASDF');
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

        let username = authResult.username;

        // Associate the socket with the username
        userSockets[username] = socket;
        socketUsers[socket.id] = authResult.username;
        console.log("associated socket " + socket.id + " with username " + authResult.username);

        // When a user disconnects, remove them from both dictionaries
        socket.on('disconnect', function()
        {
            let username = socketUsers[socket.id];
            delete userSockets[username];
            delete socketUsers[socket.id];

            console.log("User " + username + " disconnected.");
        });

        // When a user sends a message, forward it to their partner.
        socket.on('message', function(msg)
        {
            console.log(authResult.username + ": " + msg);

            let partnerName = getPartner(username);
            let partnerSocket = userSockets[partnerName];

            let msgObj =
            {
                sender: username,
                contents: msg
            };

            partnerSocket.emit('message_received', msgObj);
        });

        socket.on('queueType', function(msg)
        {
            console.log(authResult.username + ": " + msg);

            // 0 = student, 1 = coach
            console.log("QUEUE TYPE: " + msg);

            user = new User(authResult.username, authResult.rank, authResult.coachRanks, authResult.studentRanks, authResult.rating,
                authResult.strengths, authResult.weaknesses)
            if (msg == 0) {
                console.log('test1');
                matchmaking.addStudent(user);
            } else if (msg == 1) {
                console.log('test2');
                matchmaking.addCoach(user);
            }
            console.log('test3');
        });

        socket.on('matchFound', function(msg)
        {
            console.log("MATCH FOUND: " + msg + "\n\n");
            let partnerName = findPartner(username);
            let userSocket = userSockets[username];
            let partnerSocket = userSockets[partnerName];

            let userObj =
            {
                partner: partnerName,
            };

            let partnerObj =
            {
                partner: username
            };

            debugger;
            userSocket.emit('match_found', username);
            partnerSocket.emit('match_found', partnerName);
        });
    });
}

// Returns the given user's partner.
function getPartner(username)
{
    // TODO: test
    return matchmaking.findPartner(username);
}