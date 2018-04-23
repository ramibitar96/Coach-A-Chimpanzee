// Imports
const authUtils = require('./authenticationUtils.js');
const ErrorCodeEnum = require('./errorCodes.js');
const cookieParser = require('cookie');
const matchmaking = require('./matchmaking.js');
const dbUtils = require('./dbUtils.js');
const {User} = require('./matchmaking.js');

let userSockets = {};   // A dictionary mapping usernames to their sockets
let socketUsers = {};   // A dictionary mapping sockets to their usernames
let userChatrooms = {}; // A dictionary mapping usernames to their chatrooms
let chatroomUsers = {}; // A dictionary mapping chatrooms to the users in them
let chatrooms = {};     // A dictionary mapping a chatroom's number to the chatroom's chat log

let chatroomCount = 0;

class Chatroom {
    constructor(user1, user2, chatroomNumber) {
        this.user1 = user1;
        this.user2 = user2;
        this.public = true;
        this.chatroomNumber = chatroomNumber;
        this.log = "";
    }
}

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
            console.log("Chatroom: " + chatroomCount);

            userChatrooms[msg] = chatroomCount;
            userChatrooms[partnerName] = chatroomCount;
            chatroomUsers[chatroomCount] = [msg, partnerName];
            room = new Chatroom(msg, partnerName, chatroomCount);
            chatrooms[chatroomCount] = room;

            console.log(room);

            let userObj =
            {
                partner: msg,
                roomid: chatroomCount
            };

            let partnerObj =
            {
                partner: partnerName,
                roomid: chatroomCount
            };

            chatroomCount++;

            userSocket.emit('match_found', userObj);
            partnerSocket.emit('match_found', partnerObj);
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
            if (userChatrooms[username] != undefined && chatroomUsers[userChatrooms[username]] != undefined) {
                var index = chatroomUsers[userChatrooms[username]].indexOf(username);
                chatroomUsers[userChatrooms[username]].splice(index, 1);
            }

            console.log("User " + username + " disconnected.");
        });

        // When a user sends a message, forward it all users in the same chatroom
        socket.on('message', function(msg)
        {
            console.log(authResult.username + ": " + msg);

            if (getPartner(username) == null) {
                // TODO: check if chatroom allows users other than student/coach to chat
                return;
            }

            let partnerList = chatroomUsers[userChatrooms[username]];
            if (partnerList == undefined) {
                return;
            }
            var chatroomSocketList = [];
            for (var i = 0; i < partnerList.length; i++) {
                if (partnerList[i] != username) {
                    chatroomSocketList.push(userSockets[partnerList[i]]);
                }
            }

            // Add chat message to log
            chatrooms[userChatrooms[username]].log += (username + ": " + msg + "\n");

            let msgObj =
            {
                sender: username,
                contents: msg
            };

            for (var i = 0; i < chatroomSocketList.length; i++) {
                chatroomSocketList[i].emit('message_received', msgObj);
            }
        });

        // When a user enters the queue
        socket.on('queueType', async function(msg)
        {
            // 0 = student, 1 = coach, 2 = guest
            console.log(authResult.username + ": " + " QUEUE TYPE: " + msg);

            if (msg.type == 2) {
                console.log("Chatroom number: " + msg.chatroomNumber);
                if (chatroomUsers[msg.chatroomNumber] == undefined || chatrooms[msg.chatroomNumber].public == false) {
                    let userSocket = userSockets[username];
                    userSocket.emit('invalid_chatroom');
                    return;
                }
                userChatrooms[username] = msg.chatroomNumber;
                chatroomUsers[msg.chatroomNumber].push(username);
                return;
            }

            if (getPartner(username) != null) {
                console.log("Returning user to existing chatroom");
                let userSocket = userSockets[username];
                console.log("userChatrooms: " + userChatrooms[username]);
                chatroomUsers[userChatrooms[username]].push(username);
                userSocket.emit('rejoin_chat', chatrooms[userChatrooms[username]].log);
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

            // TODO: Send chat log to database, delete all applicable chatroom dictionary entries
            let chatroomNumber = userChatrooms[username];
            delete userChatrooms[username];
            if (chatroomUsers[chatroomNumber] != undefined) {
                delete chatroomUsers[chatroomNumber];
            }
            if (chatrooms[chatroomNumber] != undefined) {
                delete chatrooms[chatroomNumber];
            }
        });

        socket.on('ask_to_toggle', function(data)
        {
            let partnerName = getPartner(username);
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }
            let partnerSocket = userSockets[partnerName];
            partnerSocket.emit('ask_to_toggle');
        });

        socket.on('toggle_privacy', function(data)
        {
            let partnerName = getPartner(username);
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }

            // Toggle chatroom privacy settings if requested
            if (data == true) {
                chatrooms[userChatrooms[username]].public = !chatrooms[userChatrooms[username]].public;
            }

            let partnerSocket = userSockets[partnerName];
            partnerSocket.emit('toggle_privacy', data);
        });

			//whiteboard
			socket.on('drawing', function(data)
			{
            if (getPartner(username) == null) {
                // TODO: check if chatroom allows users other than student/coach to chat
                return;
            }

            let partnerList = chatroomUsers[userChatrooms[username]];
            if (partnerList == undefined) {
                return;
            }
            var chatroomSocketList = [];
            for (var i = 0; i < partnerList.length; i++) {
                if (partnerList[i] != username) {
                    chatroomSocketList.push(userSockets[partnerList[i]]);
                }
            }

            for (var i = 0; i < chatroomSocketList.length; i++) {
                chatroomSocketList[i].emit('drawing', data);
            }

            /*let partnerName = getPartner(username);
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }
            let partnerSocket = userSockets[partnerName];
            console.log("Partner: " + partnerName);

				partnerSocket.emit('drawing', data);*/
			});
    });
}

// Returns the given user's partner.
function getPartner(username)
{
    // TODO: test
    return matchmaking.findPartner(username);
}
