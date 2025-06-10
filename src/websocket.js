const WebSocket = require('ws');

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ message: 'WebSocket connection established' }));

    ws.on('message', (data) => {
      console.log('Received:', data.toString());
    });
  });

  return wss;
}

function broadcast(data) {
  if (!wss) return;
  const msg = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}

module.exports = { initWebSocket, broadcast };
