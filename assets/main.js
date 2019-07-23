const axios = require('axios');
const cheerio = require('cheerio');

let stocks = [];

//Calls scrape on all symbols
let symbols;
require('./allStocks').scrape.then(() => {
    symbols = require('./allStocks').symbols;
    // symbols.forEach(group => {
    //     let current = [];
    //     group.forEach(symbol => getInfo(symbol, current));
    //     stocks.push(current);
    // });
    // console.log(symbols[0][0]);
    let current = []
    for (let i = 0; i < symbols[0].length; i++) {
        getInfo(symbols[0][i], current, symbols[0].length);
    }
});

// urlExists('https://finance.yahoo.com/', function(err, exists) {
//     // if(exists) console.log(exists);
//     // else {
//     //     console.log('no');
//     // }
//     console.log(exists);
// })

//Gets name and price of stocks
let count = 0;
function getInfo(symbol, current, num) {
    var url = `https://finance.yahoo.com/quote/${symbol}?p=${symbol}`;

    axios.get(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        let head = $("title").text();
        let pdata = $("span[data-reactid='14']").text();

        let stock = {
            name: head.substring(0, head.indexOf('(')-1),
            symbol: head.substring(head.indexOf('(')+1, head.indexOf(')')),
            price: pdata.substring(0, pdata.indexOf('.')+3),
        }
        if (stock.name && stock.symbol && stock.price) {
            current.push(stock);
            count++
            if (count == num) console.log(current);
        }
        else console.log('Not found ', url);
    }).catch(error => {
        console.log(url);
        console.log('Error ', error);
    });
}