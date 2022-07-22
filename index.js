const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/indexFile/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message',(msg, username) => {
        console.log('message: ' + username+ " "+ msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
// This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg, username) => {
      io.emit('chat message', msg, username);
    });
});

server.listen(8000, () => {
  console.log('listening on: 8000');
});