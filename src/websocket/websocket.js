const http = require('http')
const WebSocket = require('ws')
const app = require('../app')

const server = http.createServer(app)
server.listen(3001)

const wss = new WebSocket.Server({ server })
const subscriptions = {}

// Обработка подключения WebSocket
wss.on('connection', (ws) => {
  ws.on('close', () => {
    // Отписываемся от всех подписок при закрытии соединения
    Object.values(subscriptions).forEach((sub) => {
      clearInterval(sub);
    });
  });
});

module.exports = {
  wss,
  subscriptions
}