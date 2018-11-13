//
// if (msg.match(new RegExp('^[C|c]{1}[0-9]+$'))) {
//     let grinds = msg.substr(1, msg.length);
//     msg = `Normal 粉水比１:16 g => ${grinds} : ${grinds * 16}`;
// } else if (msg.match(new RegExp('^[T|t]{1}[0-9]+$'))) {
//     let grinds = msg.substr(1, msg.length);
//     msg = `Taste  粉水比１:10 g => ${grinds} : ${Math.floor(grinds * 10 - grinds/1.5)} :沖後純水（${Math.floor(grinds/1.5)}）`;
// } else if (msg.toLowerCase().match('^es\\d+$')) {
//     let grinds = msg.substr(2, msg.length);
//     msg = `Espresso single 粉水比  9 : 30 g => ${grinds} : ${Math.floor(grinds * 30 / 9)}`;
// } else if (msg.toLowerCase().match('^ed\\d+$')) {
//     let grinds = msg.substr(2, msg.length);
//     msg = `Espresso Double粉水比 18 : 60 g => ${grinds} : ${Math.floor(grinds * 60 / 18)}`;
// } else if (msg.toLowerCase().match('^er\\d+$')) {
//     let grinds = msg.substr(2, msg.length);
//     msg = `Espresso Ristretto粉水比 15 : 30 g => ${grinds} : ${Math.floor(grinds * 30 / 15)}`;
// }
module.exports.getGrindsFromWater = function (nickname, water) {
    let coffee = coffees.find(obj => obj.nickname == nickname);
    if(coffee===undefined)
        return 'Its an Illegal param.';
    return `${coffee.name}粉水比 ${coffee.grindsWaterRatio} g => ${coffee.grindsWater(water)} : ${water}`;
};

module.exports.getWaterFromGrinds = function (nickname, grinds) {
    let coffee = coffees.find(obj => obj.nickname == nickname);
    if(coffee===undefined)
        return 'Its an Illegal param.';
    return `${coffee.name}粉水比 ${coffee.grindsWaterRatio} g => ${grinds} : ${coffee.waterGrinds(grinds)}`;
};

function splitNum(text) {
    var result="";
    for(var i=0;i<text.length;i++){
        let x = text.charAt(i);
        if(x!=""&&x.match(/\d+$/gi))
            result += text.charAt(i);
    }
    return result;
}
function splitLetter(text) {
    var result="";
    for(var i=0;i<text.length;i++){
        let x = text.charAt(i);
        if(x!=""&&x.match(/^[a-z|A-Z]+/gi))
            result += text.charAt(i);
    }
    return result;
}
module.exports.getCoffeeRatio = function (coffeeReq) {
    let letters = splitLetter(coffeeReq);
    let numbers = splitNum(coffeeReq);
    console.log(letters,numbers);
    // if(coffeeReq.charAt(0).match(/\d+$/gi)){
    //     numbers = coffeeReq.match(/\d+$/gi);
    //     letters = coffeeReq.match(/^[a-z|A-Z]+/gi);
    // }
    let result = "It's illegal paramters.";
    if (coffeeReq.length > 0) {
        if (coffeeReq.charAt(0).match(/[a-z]/i)) {
            result = this.getGrindsFromWater(letters, numbers);
        } else {
            result = this.getWaterFromGrinds(letters, numbers);
        }
    }
    return result;
}

const coffees = [{
    name: 'Normal',
    nickname: 'c',
    grindsWaterRatio: '  1 : 16 g ',
    grindsWater: function (water) {
        return Math.floor(water * 1 / 16);
    },
    waterGrinds: function (grinds) {
        return Math.floor(grinds * 16 / 1);
    }
},
    {
        name: 'Taste',
        nickname: 't',
        grindsWaterRatio: '  1 : 10 g ',
        grindsWater: function (water) {
            return Math.floor(water * 1 / 10);
        },
        waterGrinds: function (grinds) {
            return Math.floor(grinds * 10 / 1);
        }
    },
    {
        name: 'Espresso single',
        nickname: 'es',
        grindsWaterRatio: '  9 : 30 g ',
        grindsWater: function (water) {
            return Math.floor(water * 9 / 30);
        },
        waterGrinds: function (grinds) {
            return Math.floor(grinds * 30 / 9);
        }
    },
    {
        name: 'Espresso double',
        nickname: 'ed',
        grindsWaterRatio: ' 18 : 60 g ',
        grindsWater: function (water) {
            return Math.floor(water * 18 / 60);
        },
        waterGrinds: function (grinds) {
            return Math.floor(grinds * 60 / 18);
        }
    },
    {
        name: 'Normal Ristretto', grindsWaterRatio: ' 15 : 30 g ',
        nickname: 'nr',
        grindsWater: function (water) {
            return water * 15 / 30;
        }, waterGrinds: function (grinds) {
            return Math.floor(grinds * 30 / 15);
        }
    }]