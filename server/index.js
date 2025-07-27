const env = require("dotenv");
env.config({path: './config.env'});
const dbconfig = require("./model/connect");
const express = require("express");
const authRout = require("./route/auth");
const userRoute = require("./route/user");
const chatRout = require("./route/chat");
const messageRoute = require("./route/message");
const http = require('http');
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = require('socket.io')(server, {cors:{
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}})
app.use("/api/auth",authRout);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRout);
app.use("/api/message", messageRoute);

//testing websocket connection
io.on('connection', socket=>{
   socket.on('joinRoom', id=>{
    socket.join(id);
    console.log('user joined with id', id);
   })
  socket.on('sendMessage', (message)=>{
    console.log(message);
    io.to(message.members[0]).to(message.members[1])
    .emit('receiveMessage', message);
  }) 
  socket.on('clear-unread-message',(data)=>{
    io.to(data.members[0]).to(data.members[1])
    .emit('unread-message-cleard', data);
  })
})
const port = 5000;
server.listen(port,()=>{
    console.log("server started on the port", port);
} )