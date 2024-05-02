const ws = require('ws');
const wss = new ws.Server({port:3030});

// const ws = new WebSocket("ws://localhost:3030")
// ws.send("hello server")

wss.on('connection', (socket) => {
    console.log("New User Connected!");

    socket.on("message", (data) => {
        const msg = data.toString();
        socket.send(msg + " - from server");
    });
});