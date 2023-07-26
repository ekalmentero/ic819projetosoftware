const fs = require("fs");
const readline = require('readline');

function convert(file) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {
            array.push(JSON.parse(line));
        });

        reader.on('close', () => resolve(array));
    });
}

module.exports={convert}


// convert('myJson.txt')
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => console.error(err));