/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');
const axios = require('axios');
const process = require('process');

function newText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf-8', function read(error, data) {
        if (error) {
            console.log('Cannot read file');
            process.exit(1);
        } else {
            newText(data);
        }
    });
}

async function makeURL(url) {
    let response;
    try {
        response = await axios.get(url);
    } catch (error) {
        console.error('Cannot read url');
        process.exit(1);
    }
    newText(response.data)
}
let [method, path] = process.argv.slice(2);
if (method == 'file') {
    makeText(path);
} else if (method == 'URL') {
    makeURL(path);
} else {
    console.error('Unknown method')
    process.exit(1);
}