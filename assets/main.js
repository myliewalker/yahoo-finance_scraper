const axios = require('axios');
const cheerio = require('cheerio');
const Excel = require('exceljs/modern.nodejs');

let stocks;

//Calls scrape on all symbols
require('./allStocks').retrieve.then(() => {
    stocks = require('./allStocks').stocks;
    stocks.forEach(stock => getInfo(stock));
});

//Gets name and price of stocks
function getInfo(stock) {
    let symbol = stock.symbol
    var url = `https://finance.yahoo.com/quote/${symbol}?p=${symbol}`;
    if(stock.symbol.includes('-')) console.log(url);
    return false;

    // axios.get(url).then(response => {
    //     const html = response.data;
    //     const $ = cheerio.load(html);

    //     let head = $("title").text();
    //     let pdata = $("span[data-reactid='14']").text();

    //     stocks[stock].name = head.substring(0, head.indexOf('(')-1);
    //     stocks[stock].price = pdata.substring(0, pdata.indexOf('.')+3);
    // }).catch(error => {
    //     console.log('Error ', error);
    // });
}