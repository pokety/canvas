const express=require("express");
const app=express();
const server=require("http").createServer(app);
const path=require('path');
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
    

    var statu=false
    var randF={f_x:getRandom10(0,190),f_y:getRandom10(0,190)}
    

    socket.on("enviar",(locate)=>{
        const randFe={f_x:getRandom10(0,190),f_y:getRandom10(0,190)}
        Object.assign(pos_player,{[socket.id]:locate})

        let id_player=Object.keys(pos_player)
        let id_pos=Object.values(pos_player)

        for(let a=0;a<id_pos.length;a++){

            if(id_pos[a].pos_x == randF.f_x && id_pos[a].pos_y == randF.f_y){
                statu=true
            }
        }
        if(statu==true){
            statu=false
            console.log(randF)
            randF=randFe
            console.log(randF)
        }

        io.emit('all',pos_player,randFe);
        //socket.broadcast.emit('all',pos_player,randF)
    })
    
    socket.on('disconnect',()=>{
        console.log("disconectado: "+socket.id);
        delete pos_player[socket.id]
    })

})

server.listen(process.env.PORT,process.env.HOST,()=>{console.log(`Started on PORT:${process.env.PORT}`)})