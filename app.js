const socket = io(); // Connect to the Socket.IO server

const form = document.getElementById('message-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const chatWindow = document.getElementById('chat-window');

// Ask for username
let username = prompt('Please enter your username:');
if (username) {
    socket.emit('new-user', username);
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const message = messageInput.value;
    if (message) { // Don't send empty messages
        socket.emit('chat-message', { username, message });
        messageInput.value = ''; // Clear input field
    }
});

socket.on('chat-message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    chatWindow.appendChild(messageElement);
});

socket.on('user-connected', (username) => {
    // Add a notification about a user joining (optional)
});
