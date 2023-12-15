const Koa = require('koa2');
const TelegramBot = require('node-telegram-bot-api');
const token = '#';

const app = new Koa();
const port = 3002;
const cron = require('node-cron');
const axios = require('axios');
const qs = require('qs');



let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '#',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: null
};


const bot = new TelegramBot(token, {
    polling: true
});

function sendMessage(chatId, message) {
    bot.sendMessage(chatId, message)
        .then(() => {
            console.log('Mesaj başarıyla gönderildi.');
        })
        .catch((error) => {
            console.error('Mesaj gönderirken bir hata oluştu:', error);
        });
}



let message = ""
cron.schedule('*/10 * * * *', async () => {
    const chatId = 'yourChatId';
    await axios.request(config)
        .then((response) => {
            if (response.status == 200)
                message += "Server ------------> Ok \u2705\n"
            else
                message += "Server ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "Server ------------> Down \u274C\n"
        })
    
        
    sendMessage(chatId, message)
    message = ''
});


app.listen(port, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});