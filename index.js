const secret = require('./secret');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(secret.token(), { polling: true });
const poloniexPublicApi = 'https://poloniex.com/public';
const fetchTickerApi = (callback) => {
  fetch(`${poloniexPublicApi}?command=returnTicker`)
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => console.log('Error:', err))
}



// Matches "/btc"
bot.onText(/\/btc/, (msg, match) => {
  const chatId = msg.chat.id;

  fetchTickerApi((json) => {
    bot.sendMessage(chatId, `BTC to USDT: ${json['USDT_BTC']['last']}`);
  })
});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received~');
// });

