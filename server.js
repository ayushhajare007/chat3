const express = require('express');
 const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname)); // Serve the 'index.html'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('new-user', (username) => {
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('chat-message', (data) => {
        io.emit('chat-message', data); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => console.log('Server listening on port 3000'));
