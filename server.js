const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files (adjust the path if needed)
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('new-user', (username) => {
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('chat-message', (data) => {
        io.emit('chat-message', data); 
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Use an allowed port on Fleek (consult their documentation)
const port = process.env.PORT || 8080; // Example 

http.listen(port, () => console.log(`Server listening on port ${port}`));
