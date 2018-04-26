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

let publicChatrooms = [];
let amaRooms = [];

let chatroomCount = 0;

class Chatroom {
    constructor(user1, user2, isPublic, chatroomNumber) {
        this.user1 = user1;
        this.user2 = user2;
        this.publicRoom = isPublic;
        this.chatroomNumber = chatroomNumber;
        this.log = "";
        this.drawLog = [];
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
            room = new Chatroom(msg, partnerName, false, chatroomCount);
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

       socket.on('request_amas', function(msg)
        {
            console.log("Number of AMA rooms: " + amaRooms.length);
            var amaList = "";
            for (var i = 0; i < amaRooms.length; i++) {
                if (i != 0)
                    amaList += "\n";
                amaList += (amaRooms[i] + ": " + chatrooms[amaRooms[i]].user1);
            }

            socket.emit('ama_list', amaList);
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
                if (index != -1) {
                    chatroomUsers[userChatrooms[username]].splice(index, 1);
                }
            }

            console.log("User " + username + " disconnected.");
        });

        // When a user sends a message, forward it all users in the same chatroom
        socket.on('message', function(msg)
        {
            console.log(authResult.username + ": " + msg);

            if (getPartner(username) == null && chatrooms[userChatrooms[username]].user2 != null) {
                // TODO: check if chatroom allows users other than student/coach to chat
                console.log("ERROR: no partner found");
                return;
            }

            let partnerList = chatroomUsers[userChatrooms[username]];
            console.log("Partner list: " + partnerList);
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

            if (getPartner(username) != null) {
                console.log("Returning user to existing chatroom");
                let userSocket = userSockets[username];
                console.log("userChatrooms: " + userChatrooms[username]);
                chatroomUsers[userChatrooms[username]].push(username);
                userSocket.emit('rejoin_chat', chatrooms[userChatrooms[username]]);
                return;
            } else if (matchmaking.isInQueue(username)) {
                console.log("User is already in queue; returning to empty chatroom");
                return;
            }

            if (msg == null && userChatrooms[username] != undefined) {
                chatroomUsers[userChatrooms[username]].push(username);
                userSockets[username].emit('rejoin_chat', chatrooms[userChatrooms[username]]);
                return;
            } else if (msg.type == 2) {
                console.log("Chatroom number: " + msg.chatroomNumber);
                let userSocket = userSockets[username];
                if (chatroomUsers[msg.chatroomNumber] == undefined || chatrooms[msg.chatroomNumber].publicRoom == false) {
                    userSocket.emit('invalid_chatroom');
                    return;
                }
                userChatrooms[username] = msg.chatroomNumber;
                chatroomUsers[msg.chatroomNumber].push(username);
                userSocket.emit('rejoin_chat', chatrooms[userChatrooms[username]]);
                return;
            } else if (msg == 3) {
                if (userChatrooms[username] != undefined) {
                    chatroomUsers[userChatrooms[username]].push(username);
                    userSockets[username].emit('rejoin_chat', chatrooms[userChatrooms[username]]);
                    return;
                }

                // Create AMA room
                userChatrooms[username] = chatroomCount;
                chatroomUsers[chatroomCount] = [username];
                room = new Chatroom(username, null, true, chatroomCount);
                chatrooms[chatroomCount] = room;
                amaRooms.push(chatroomCount);
                console.log(room);

                userSockets[username].emit('ama_created', chatrooms[chatroomCount]);
                chatroomCount++;
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
            var index = publicChatrooms.indexOf(chatroomNumber);
            if (index != -1) {
                publicChatrooms.splice(index, 1);
            }
            index = amaRooms.indexOf(chatroomNumber);
            if (index != -1) {
                amaRooms.splice(index, 1);
            }

            delete userChatrooms[username];
            if (chatroomUsers[chatroomNumber] != undefined) {
                delete chatroomUsers[chatroomNumber];
            }
            if (chatrooms[chatroomNumber] != undefined) {
                delete chatrooms[chatroomNumber];
            }
        });

        socket.on('end_ama', function(msg)
        {
            if (chatrooms[userChatrooms[username]].user1 != username) {
                return;
            }

            let userSocket = userSockets[username];

            delete userSockets[username];
            delete socketUsers[userSocket];

            // TODO: Send chat log to database, delete all applicable chatroom dictionary entries
            let chatroomNumber = userChatrooms[username];
            var index = amaRooms.indexOf(chatroomNumber);
            console.log("Chatroom number (end): " + chatroomNumber);
            console.log("Index (end): " + index);
            console.log("AMA rooms: " + amaRooms);
            if (index != -1) {
                amaRooms.splice(index, 1);
            }

            delete userChatrooms[username];
            if (chatroomUsers[chatroomNumber] != undefined) {
                delete chatroomUsers[chatroomNumber];
            }
            if (chatrooms[chatroomNumber] != undefined) {
                delete chatrooms[chatroomNumber];
            }
        });
        
		  socket.on('game_data', function(data)
        {
            let partnerName = getPartner(username);
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }
            let partnerSocket = userSockets[partnerName];
				console.log("passing game_data to partner");
            partnerSocket.emit('game_data', data);
        });

        socket.on('match_over', function(data)
        {
            let partnerName = getPartner(username);
            if (partnerName == undefined) {
                console.log("ERROR: no match for this user");
                return;
            }
            let partnerSocket = userSockets[partnerName];
				console.log("emitting match_over to partner");
            partnerSocket.emit('match_over', data);
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
                chatrooms[userChatrooms[username]].publicRoom = !chatrooms[userChatrooms[username]].publicRoom;
                if (chatrooms[userChatrooms[username]].publicRoom) {
                    publicChatrooms.push(userChatrooms[username]);
                } else {
                    var index = publicChatrooms.indexOf(userChatrooms[username]);
                    publicChatrooms.splice(index, 1);
                    var chatroomNumber = userChatrooms[username];
                    for (var i = 0; i < chatroomUsers[chatroomNumber].length; i++) {
                        if (chatroomUsers[chatroomNumber][i] != username && chatroomUsers[chatroomNumber][i] != partnerName) {
                            userSockets[chatroomUsers[chatroomNumber][i]].emit('end_chat_guest');
                        }
                    }
                    chatroomUsers[chatroomNumber] = [username, partnerName];
                }
            }

            let partnerSocket = userSockets[partnerName];
            partnerSocket.emit('toggle_privacy', data);
        });

			//whiteboard
			socket.on('drawing', function(data)
			{
            if (getPartner(username) == null && chatrooms[userChatrooms[username]].user2 != null) {
                // TODO: check if chatroom allows users other than student/coach to draw
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

            // Store drawing data in chatroom
            chatrooms[userChatrooms[username]].drawLog.push(data);

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
