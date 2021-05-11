const express = require("express");
const socketio = require("socket.io");
const http = require("http");


const router= require("./router");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

io.on('connection',(socket)=>{
    console.log("New connection!!");

    socket.on('join',({name,room},callback)=>{
        
    });

    socket.on("disconnect",()=>{
        console.log("sed.. User has left like everyone else..");
    });
})

app.use(router);

server.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})
