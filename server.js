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
io.on("connection",(socket)=>{
    console.log('connectado: '+socket.id)
    
    socket.on("enviar",(msg)=>{
        console.log(socket.id)
    })
    socket.on('disconnect',()=>{console.log("disconectado: "+socket.id)})

})

server.listen(process.env.PORT,process.env.HOST,()=>{console.log(`Started on PORT:${process.env.PORT}`)})