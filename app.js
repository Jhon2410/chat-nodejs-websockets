const express  = require("express")
const cors  = require("cors")
var WebSocketServer = require('websocket').server;
var http = require('http');

let app =  express()
app.set("puerto" , process.env.PORT || 5000)
app.use(cors())
app.use(express.static("public"))

const servidor2 = http.createServer(app)

servidor2.listen(app.get("puerto"),()=>{
    console.log(app.get("puerto")+ ' port listening')
})

const miSocket = new WebSocketServer({
    httpServer : servidor2,
    autoAcceptConnections : false
}) 

const keys  =  [ ]
const mensajes = []
miSocket.on("request", (request)=>{

    let conn = request.accept("a" , request.origin);
    keys.push(conn)
    conn.send(JSON.stringify({"texto" : mensajes , "pc" : true}))
        
    conn.on("message", (message)=>{
        mensajes.push(message.utf8Data)
        console.log(mensajes)

        keys.map(c=>{
            if(c!==conn){
            c.send(JSON.stringify({"texto" : mensajes}))
            }
           })

    })

    


})
