/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const axios = require('axios');
const process = require("process")

function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function readFile(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Invalid file", path, err)
            process.exit(1);
        } else {
            makeText(data);
        }
    })
}

async function readURL(URL) {
    let res

    try {
        res = await axios.get(URL)
    } catch (err) {
        console.error("Invalid URL", URL, err)
        process.exit(1);
    }
    makeText(res.data)
}

let [method, path] = process.argv.slice(2)

if (method === "file") {
    readFile(path)
} else if (method === "url") {
    readURL(path)
} else {
    console.error("Cannot do", method)
    process.exit(1);
}