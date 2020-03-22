const WebSocket = require("ws");
const messages = require("./ws.messages.json");

const wss = new WebSocket.Server({
    port: 8579
});

let messageNum = 0;
let intervalId = 0;
wss.on("connection", (ws) => {
    console.log("Connection!");
    clearInterval(intervalId);
    messageNum = 0;
    console.log("Sending message", messageNum);
    ws.send(JSON.stringify(messages[messageNum++]));
    intervalId = setInterval(() => {
        if (messageNum >= messages.length) {
            messageNum = 0;
            clearInterval(intervalId);
        } else {
            console.log("Sending message", messageNum);
            ws.send(JSON.stringify(messages[messageNum++]));
        }
    }, 1000);
});