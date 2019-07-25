const axios = require('axios');
const cheerio = require('cheerio');
const sleep = require('util').promisify(setTimeout);
const fs = require('fs');

const section = 125;
let stocks;
let count = 0;

//Calls scrape on all symbols
require('./all_stocks').retrieve.then(() => {
    stocks = require('./all_stocks').stocks;
    iterate(0);
});

//Partitions stocks into 125 at a time
function iterate(start) {
    if (start < stocks.length + section) end = start + section;
    else end = stocks.length;
    for (let i = start; i < end; i++) {
        getInfo(stocks[i], i, end);
    }
}

//Gets name and price of stocks
function getInfo(stock, dex, end) {
    let symbol = stock.symbol
    var url = `https://finance.yahoo.com/quote/${symbol}?p=${symbol}`;

    // Grabs data
    axios.get(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        let head = $("title").text();
        let pdata = $("span[data-reactid='14']").text();
        stocks[dex].name = head.substring(0, head.indexOf('(')-1);
        stocks[dex].price = pdata.substring(0, pdata.indexOf('.')+3);

        count++;
        console.log(count);
        if (count == section) {
            count = 0;
            setTimeout(function() {
                if(end < stocks.length) iterate(end);
            }, 3000);
        }
    }).catch(error => {
        count++;
        console.log(error);
    });
}

// Export stocks

// Export to a text file
// fs.writeFile('assets/data/latest.txt', new Date(), (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("File has been created");
// });