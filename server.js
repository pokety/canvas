const express=require("express");
const app=express();
const server=require("http").createServer(app);
const path=require('path');
const io=require("socket.io")(server);
require("dotenv").config()
// app.use('public',express.static('/public'))

app.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname + "/index.html"))
})

var pos_player={}
io.on("connection",(socket)=>{
    console.log('connectado: '+socket.id)
    
    socket.on("enviar",(msg)=>{
        Object.assign(pos_player,{[socket.id]:msg})
        io.emit('all',pos_player);
    })
    socket.on('disconnect',()=>{
        console.log("disconectado: "+socket.id);
        delete pos_player[socket.id]
    })

})

server.listen(process.env.PORT,process.env.HOST,()=>{console.log(`Started on PORT:${process.env.PORT}`)})