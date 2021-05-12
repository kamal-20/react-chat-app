const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const {addUser, removeUser, getUsers, getUsersInRoom} = require('./users');

const router= require("./router");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

io.on('connection',(socket)=>{
    console.log("New connection!!");

    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id: socket.id,name,room}) ;
        
        if(error) return callback(error);

        socket.emit('message', {user:'admin',text:`${user.name} welcome to ${user.room}`}
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`})

        socket.join(user.room);

        callback();
    });

    socket.on('sendmessage',{message,callback}=>{
        const user = getUser(socket.id);
        io.to(user.rom).emit('message',{user:user.name,text:message});
        callback();
    });

    socket.on("disconnect",()=>{
        console.log("sed.. User has left like everyone else..");
    });
})

app.use(router);

server.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})

