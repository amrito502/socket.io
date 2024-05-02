const express = require('express')
const http = require('http')
const app = express()

const expressHTTPServer = http.createServer(app)


const ws = require('ws');
const wss = new ws.Server({server: expressHTTPServer});

// const ws = new WebSocket("ws://localhost:3030")
// ws.send("hello server")


// const sockets = []
wss.on('connection', (socket) => {
    // sockets.push(socket)
    console.log("New User Connected!");

    socket.on("message", (data) => {
        const msg = data.toString();

        wss.clients.forEach(cl => {
            if(cl != socket){
                cl.send(msg)
            }
        })



        // sockets.forEach(st => {
        //     if(st != socket){
        //         st.send(msg)
        //     } 
        // })
    });

    socket.on('close', () => {
        console.log("User Disconnected!!");
    })
});

expressHTTPServer.listen(3030, () => {
    console.log("Server Running @3030")
})
