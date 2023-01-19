const express=require("express");
const app=express();
const server=require("http").createServer(app);
const path=require('path');
const { emit } = require("process");
const io=require("socket.io")(server);
require("dotenv").config()
app.use('public',express.static('/public'))

app.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandom10(min, max) {
    return getRandomInt(min / 10, max / 10) * 10;
}


var pos_player={}

io.on("connection",(socket)=>{
    console.log('connectado: '+socket.id)
   
    socket.on("enviar",(locate)=>{
        
        var pos_fruit={f_x:50,f_y:50}
        Object.assign(pos_player,{[socket.id]:locate})


        let id=Object.values(pos_player)
            let a;

        for(a=0;a<id.length;a++){                 
            if(id[a].pos_x == pos_fruit.f_x && id[a].pos_y == pos_fruit.f_y){
                console.log(pos_fruit)
                io.emit('eat',{f_x:getRandom10(0,490),f_y:getRandom10(0,490)})
            }
            
        }
        
        //socket.broadcast.emit('all',pos_player,pos_fruit)
        io.emit('all',pos_player,pos_fruit);
    })
    socket.on('disconnect',()=>{
        console.log("disconectado: "+socket.id);
        delete pos_player[socket.id]
    })

})

server.listen(process.env.PORT,process.env.HOST,()=>{console.log(`Started on PORT:${process.env.PORT}`)})