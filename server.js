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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandom10(min, max) {
    return getRandomInt(min / 10, max / 10) * 10;
}


var pos_player={}
var pos_fruit={f_x:getRandom10(-10,500),f_y:getRandom10(-10,500)}
io.on("connection",(socket)=>{

    
    console.log('connectado: '+socket.id)
    socket.on("eat",(eat)=>{
        console.log(eat)
    })
    socket.on("enviar",(msg)=>{
        Object.assign(pos_player,{[socket.id]:msg})
        io.emit('all',pos_player,pos_fruit);
    })
    socket.on('disconnect',()=>{
        console.log("disconectado: "+socket.id);
        delete pos_player[socket.id]
    })

})

server.listen(process.env.PORT,process.env.HOST,()=>{console.log(`Started on PORT:${process.env.PORT}`)})