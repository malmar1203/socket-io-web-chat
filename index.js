
const express = require ('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get ('/', (req, res) => {
  //res.send('<h1>hello</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', ()=>{
    console.log("user dc'ed");
  });
  socket.on('chat message', (msg)=>{
    console.log('msg : ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(4002, () => {
  console.log('listen on 4002');
});
