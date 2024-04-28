const express = require('express');
const WebSocket = require('ws');
const currencyByPeriodController = require('../controller/currencyByPeriodController');
const currencyByDateController = require('../controller/currencyByDateController');
const asyncHandler = require('../middleware/asyncHandler');
const { wss, subscriptions } = require('../websocket/websocket')

const router = express.Router();

router.get('/:currency/byPeriod', asyncHandler(async (req, res) => {
  const result = await currencyByPeriodController.getCurrencyByPeriod(req, res)

  // последняя проверка перед отправкой потребителю
  if (!result && result !== '') {
    throw new Error('Request was failed, try again later')
  }

  res.send({ data: result })
}))

router.get('/current', asyncHandler(async (req, res) => {
  const result = await currencyByDateController.getCurrencyByDate(req, res)

  res.send({ data: result })
}))

router.post('/subscribe', asyncHandler(async (req, res) => {
  const { interval = 5000 } = req.body

  const subscriptionId = Date.now().toString()
  subscriptions[subscriptionId] = setInterval(async () => {
    const result = await currencyByDateController.getCurrencyByDate(req, res)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // client.send(JSON.stringify(update))
        client.send(JSON.stringify({ data: result }))
      }
    })
  }, interval)

  res.send({ subscriptionId })
}))

router.post('/unsubscribe', asyncHandler(async (req, res) => {
  const { subscriptionId } = req.body

  if (!subscriptionId || !subscriptions[subscriptionId]) {
    throw new Error('Unsubscribe requiers subscriptionId')
  }

  if (subscriptions[subscriptionId]) {
    clearInterval(subscriptions[subscriptionId])
    delete subscriptions[subscriptionId];
  }

  res.send({ status: 'ok' })
}))

router.get('/')

module.exports = router;
