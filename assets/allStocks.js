const Excel = require('exceljs/modern.nodejs');

let workbook = new Excel.Workbook();

let stocks = [];
let names = [];
let retrieve = new Promise(resolve => {
    let completed = false;
    workbook.xlsx.readFile('assets/data/stocks.xlsx').then(function() {
        let worksheet = workbook.getWorksheet('NYSE Company List');

        worksheet.eachRow(function(row, rowNumber) {
            let stock = {
                symbol: worksheet.getCell(`A${rowNumber}`).value,
                sector: worksheet.getCell(`F${rowNumber}`).value,
                industry: worksheet.getCell(`G${rowNumber}`).value
            }

            let name = worksheet.getCell(`B${rowNumber}`).value;
            if(!names.includes(name)) {
                names.push(name);
                stocks.push(stock);
            }
        });
        
        stocks.shift();
        completed = true;
    });

    setTimeout(function() {
        if (completed == true) {
            resolve();
        }
    }, 2000);
});

module.exports = {
    retrieve: retrieve,
    stocks: stocks
}