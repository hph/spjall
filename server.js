'use strict';

const express = require('express');
const server = require('http').createServer();
const WebSocketServer = require('ws').Server;

const app = express();
const wss = new WebSocketServer({ server: server })

app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client => client.send(message));
  });
});

server.on('request', app);
server.listen(process.env.PORT || 4000);
