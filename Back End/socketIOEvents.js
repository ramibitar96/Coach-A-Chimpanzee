// Imports
const authUtils = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');
const cookieParser = require('cookie');
const matchmaking = require('./matchmaking.js');
const dbUtils = require('./dbUtils.js');
const {User} = require('./matchmaking.js');

let userSockets = {};   // A dictionary mapping usernames to their sockets
let socketUsers = {};   // A dictionary mapping sockets to their usernames

module.exports = function(io)
{
    // Called whenever a client connects to socket.io
    // Associates the socket with the user
    io.on('connection', async function(socket)
    {
        socket.on('matchFound', function(msg)
        {
            console.log("MATCH FOUND: " + msg + "\n\n");
            let partnerName = getPartner(msg);
            let userSocket = userSockets[msg];
            let partnerSocket = userSockets[partnerName];

            console.log("Username: " + msg);
            console.log("Partner name: " + partnerName);

            userSocket.emit('match_found', msg);
            partnerSocket.emit('match_found', partnerName);
        });

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
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }
            let partnerSocket = userSockets[partnerName];
            console.log("Partner: " + partnerName);

            let msgObj =
            {
                sender: username,
                contents: msg
            };

            partnerSocket.emit('message_received', msgObj);
        });

        // When a user enters the queue
        socket.on('queueType', async function(msg)
        {
            // 0 = student, 1 = coach
            console.log(authResult.username + ": " + " QUEUE TYPE: " + msg);

            if (getPartner(username) != null) {
                console.log("Returning user to existing chatroom");
                return;
            } else if (matchmaking.isInQueue(username)) {
                console.log("User is already in queue; returning to empty chatroom");
                return;
            }

            let userPrefs = await dbUtils.getUserPrefs(username);
            user = new User(username, userPrefs.user.current_rank, userPrefs.student.min_coach_rank, userPrefs.coach.max_coachee_rank, authResult.rating,
                userPrefs.coach.skills, userPrefs.student.skills)

            if (msg == 0) {
                matchmaking.addStudent(user);
            } else if (msg == 1) {
                matchmaking.addCoach(user);
            }
        });

        // When a chat is being ended
        socket.on('end_chat', function(msg)
        {
            let partnerName = getPartner(username);
            let userSocket = userSockets[username];
            let partnerSocket = userSockets[partnerName];
            if (partnerSocket != undefined) {
                partnerSocket.emit('end_chat', 1);
            }

            delete userSockets[username];
            delete userSockets[partnerName];
            delete socketUsers[userSocket];
            delete socketUsers[partnerSocket];
            matchmaking.removeMatchedPair(username);
        });
    });
}

// Returns the given user's partner.
function getPartner(username)
{
    // TODO: test
    return matchmaking.findPartner(username);
}