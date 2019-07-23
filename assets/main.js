const axios = require('axios');
const cheerio = require('cheerio');

//Calls scrape on all symbols
let symbols;
require('./allStocks').scrape.then(() => {
    symbols = require('./allStocks').symbols;
    symbols.forEach(group => {
        group.forEach(symbol => getInfo(symbol));
    });
});

function getInfo(symbol) {
    var url = `https://finance.yahoo.com/quote/${symbol}?p=${symbol}`;
    console.log(url);
    return false;

    axios.get(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        let head = $("title").text();
        let pdata = $("span[data-reactid='14']").text();

        let stock = {
            name: head.substring(0, head.indexOf('(')-1),
            symbol: head.substring(head.indexOf('(')+1, head.indexOf(')')),
            price: pdata.substring(0, pdata.indexOf('.')+3)
        }

    }).catch(error => {
        console.log('Error ', error);
    });
}