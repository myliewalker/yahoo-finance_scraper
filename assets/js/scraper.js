const fs = require('fs');
var Crawler = require('crawler');

let stocks;
// Retrieves information for all stocks
require('./all_stocks').retrieve.then(() => {
    stocks = require('./all_stocks').stocks;
    for (let i = 0; i < stocks.length; i++) {
        stocks[i].url = `https://finance.yahoo.com/quote/${stocks[i].symbol}?p=${stocks[i].symbol}`
        c.queue({uri:stocks[i].url, dex:i});
    }
});

// Grabs data
var c = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if (error) {
            console.log(error);
        } 
        else {
            var $ = res.$;
            let dex = res.options.dex;
            let text = $.text();
            // Gets name
            let head = $("title").text();
            stocks[dex].name = head.substring(0, head.indexOf("(")-1);
            if (stocks[dex].name.match(/^[0-9]+$/) != null) {
                let target = `shortName\":\"${stocks[dex].name}\",\"longName\":\"`;
                let ndata = text.substring(text.indexOf(target)+target.length);
                stocks[dex].name = ndata.substring(0, ndata.indexOf('\"'));
                console.log(stocks[dex]);
            }
            // Gets price
            let pdata = text.substring(text.indexOf("Add to watchlistVisitors trend2W10W9M")+37);
            let end = pdata.substring(pdata.indexOf(".")+1);
            stocks[dex].price = pdata.substring(0, pdata.indexOf(".")+end.search(/\D/)+1);
        }
        done();
    }
});

// // Export stocks

// // Export to a text file
// // fs.writeFile('assets/data/latest.txt', new Date(), (err) => {
// //     if (err) {
// //         console.error(err);
// //         return;
// //     }
// //     console.log("File has been created");
// // });