const csv = require('csv-parser');
const fs = require('fs');

const openFile = data =>{

    fs.createReadStream(data)
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
}
  module.exports = openFile;