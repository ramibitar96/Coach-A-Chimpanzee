module.exports = function(io)
{
    // Called whenever a client connects to socket.io
    io.on('connection', function(socket)
    {
        console.log("A user connected, bearing the cookie " + socket.handshake.headers.cookie);
    });

}