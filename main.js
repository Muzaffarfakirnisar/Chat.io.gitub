let http = require('http');
let fs = require('fs');
let cors = require('cors');
const { Server } = require("socket.io");

let port = process.env.PORT || 8080;
server = http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (er, html) => {
    if (er) {
      res.end('unabel to connect to server');
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });


});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  }
});
let user = {};
let on = 0;
io.on('connection', (socket) => {
  console.log('connection');
  socket.on('send', (message) => {
    socket.broadcast.emit('recive', { message: message, name: user[socket.id] });
    console.log(`${message}`);
  });
});
server.listen(port);
io.attach(server)
