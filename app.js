const Koa = require('koa2');
const TelegramBot = require('node-telegram-bot-api');
const token = '6173433989:AAHMMu3mErkYBicC74g_cpHkReSHVbsBPSg';
//const token = '6258224178:AAF_cwIW1M6evDlRTAd_82QSgTTEnlAJs44';

const app = new Koa();
const port = 3002;
const cron = require('node-cron');
const axios = require('axios');
const qs = require('qs');



let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://78.135.106.32:3000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: null
};

let config2 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://78.135.106.32:3001',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: null
};

let config3 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://v1.tiko.link/JDD51UgCk2',
    headers: { 
      'token': 'PfokdwBk4nG7blZ6IO2Cz7EssC9mmH8Q'
    },
    data : null
  };

let config4 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://78.135.106.32:9876',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: null
};

let data = qs.stringify({
    'vknTc': '49501688898'
});


let config5 = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://3.73.93.48:3000/vkn2',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
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
//Tarık Id : const chatId = '1393280681';
//const chatId = '6321652234';


let message = ""
cron.schedule('*/10 * * * *', async () => {
    const chatId = '1393280681';
    await axios.request(config)
        .then((response) => {
            if (response.status == 200)
                message += "E-Arsiv ------------> Ok \u2705\n"
            else
                message += "E-Arsiv ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "E-Arsiv ------------> Down \u274C\n"
            //message += "Something went wrong"
        })
    await axios.request(config2)
        .then((response) => {
            if (response.status == 200)
                message += "E-Fatura ------------> Ok \u2705\n"
            else
                message += "E-Fatura ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "E-Fatura ------------> Down \u274C\n"
            // message += error.message
        })
    await axios.request(config3)
        .then((response) => {
            if (response.status == 200)
                message += "UrlShortener ------------> Ok \u2705\n"
            else
                message += "UrlShortener ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "UrlShortener ------------> Down \u274C\n"
            // message += error.message
        })
    await axios.request(config4)
        .then((response) => {
            if (response.status == 200)
                message += "Helper ------------> Ok \u2705\n"
            else
                message += "Helper ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "Helper ------------> Down \u274C\n"
            // message += error.message
        })
    await axios.request(config5)
        .then((response) => {
            if (response.status == 200 && response.data.ad == 'TARIK'){
                message += "Vkn Sorgu ------------> Ok '\u2705'\n"
            }
            else
                message += "Vkn Sorgu ------------> Down \u274C\n"
        })
        .catch((error) => {
            message += "Vkn Sorgu ------------> Down \u274C\n"
            // message += error.message
        })
        
    sendMessage(chatId, message)
    message = ''
});


app.listen(port, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});