const axios = require('axios');

//A list of all NYSE stocks
let symbols = [];

//Retrieves stocks by letter
let all_symbols = new Promise(resolve => {
    for (let i = 0; i < 26; i++) {
        let ch = String.fromCharCode(65+i);
        let url = `http://eoddata.com/stocklist/NYSE/${ch}.htm`;

        axios.get(url).then(response => {
            let text = response.data;
            let exp = '/stockquote/NYSE/';
            search(text, exp, []);
        }).catch(error => {
            console.log('Error ', error);
        })

        setTimeout(function() {
            if (symbols.length == 26) {
                resolve();
            }
        }, 2000 );
    }
});

//Searches each page for stock symbols
function search (text, exp, sym) {
    let start = text.search(exp)+exp.length;
    if (start < exp.length) {
        symbols.push(sym);
        return false;
    }

    let nText = text.substring(start);
    let current = text.substring(start, nText.indexOf('.')+start);
    if(!sym.includes(current)) sym.push(current);

    search(nText, exp, sym);
}

// Exports symbols
module.exports = {
    scrape: all_symbols,
    symbols: symbols
}