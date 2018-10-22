let linebot = require('linebot'),
    express = require('express');
const config = require('./config.json');
let bot = linebot(config);
const linebotParser = bot.parser(),
    app = express();
bot.on('message', function(event) {
    // 把收到訊息的 event 印出來
    console.log(event);
    // 重複 client 輸入的內容
    if (event.message.type = 'text') {
        var msg = event.message.text;
        if (msg === 'qrcode') {
            msg = 'qrcode:https://qr-official.line.me/M/ueAj794M_E.png';
        }else if (msg === '水粉比' || msg === 'grinds') {
            msg = `水跟咖啡粉的比例：\n`;
            msg += `Normal：  1 : 16 => c ...\n`;
            msg += `Taste ：  1 : 10 => t ...\n`;
            msg += `Espresso single   ：  9 : 30 => es...\n`;
            msg += `Espresso Double   ： 18 : 60 => ed...\n`;
            msg += `Espresso Ristretto： 15 : 30 => er...\n`;
        } else if (msg.match(new RegExp('^[C|c]{1}[0-9]+$'))) {
            let grinds = msg.substr(1, msg.length);
            msg = `Normal 粉水比１:16 g => ${grinds} : ${grinds * 16}`;
        } else if (msg.match(new RegExp('^[T|t]{1}[0-9]+$'))) {
            let grinds = msg.substr(1, msg.length);
            msg = `Taste  粉水比１:10 g => ${grinds} : ${Math.floor(grinds * 10 - grinds/1.5)} :沖後純水（${Math.floor(grinds/1.5)}）`;
        } else if (msg.toLowerCase().match('^es\\d+$')) {
            let grinds = msg.substr(2, msg.length);
            msg = `Espresso single 粉水比  9 : 30 g => ${grinds} : ${Math.floor(grinds * 30 / 9)}`;
        } else if (msg.toLowerCase().match('^ed\\d+$')) {
            let grinds = msg.substr(2, msg.length);
            msg = `Espresso Double粉水比 18 : 60 g => ${grinds} : ${Math.floor(grinds * 60 / 18)}`;
        } else if (msg.toLowerCase().match('^er\\d+$')) {
            let grinds = msg.substr(2, msg.length);
            msg = `Espresso Ristretto粉水比 15 : 30 g => ${grinds} : ${Math.floor(grinds * 30 / 15)}`;
        }
        event.reply(msg).then(function(data) {
            // success
            console.log(msg);
        }).catch(function(error) {
            // error
            console.log('error');
        });
    }
});
app.post('/webhook', linebotParser);
// 在 localhost 走 8080 port
let server = app.listen(process.env.PORT || 8080, function() {
    let port = server.address().port;
    console.log("My Line bot App running on port", port);
});