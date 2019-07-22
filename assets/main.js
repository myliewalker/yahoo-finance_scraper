const axios = require('axios');
const cheerio = require('cheerio');

var url = 'https://finance.yahoo.com/quote/GOOG?p=GOOG'

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