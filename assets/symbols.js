const axios = require('axios');

let symbols = [];

//Retrieves a list of all NYSE stocks
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
}

//Searches page for stock symbols
function search (text, exp, sym) {
    let start = text.search(exp)+exp.length;
    if (start < exp.length) {
        console.log(sym);
        symbols.push(sym);
        return false;
    }
    let nText = text.substring(start);
    let current = text.substring(start, nText.indexOf('.')+start);
    if(!sym.includes(current)) sym.push(current);
    search(nText, exp, sym);
}