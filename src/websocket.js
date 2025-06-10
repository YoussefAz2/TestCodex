const WebSocket = require('ws');

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ message: 'WebSocket connection established' }));

    ws.on('message', (data) => {
      console.log('Received:', data);
      // TODO: handle incoming messages
    });
  });

  return wss;
}

module.exports = initWebSocket;
