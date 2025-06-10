const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const { initWebSocket } = require('./websocket');

dotenv.config();

const server = http.createServer(app);
initWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
