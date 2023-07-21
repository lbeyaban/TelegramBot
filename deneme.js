const axios = require('axios');
const qs = require('qs');



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

let message = ''
axios.request(config5)
.then((response) => {
    if (response.status == 200){
        if(response.data.ad == 'TARIK')
            console.log("Kontrol Dogru");
    }
    else
        message += "Vkn Sorgu ------------> Down\n"
})
.catch((error) => {
    message += "Vkn Sorgu ------------> Down\n"
    // message += error.message
})