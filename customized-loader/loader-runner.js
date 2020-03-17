const path = require('path');
const resolve = (...filenames) => path.resolve(__dirname, ...filenames);
const fs = require('fs');
const readFile = fs.readFileSync;
const entry = "./src/index.js";

const config = {
    resource: resolve(entry),
    loaders: [
        resolve('loaders', 'a-loader.js'),
        resolve('loaders', 'b-loader.js'),
        resolve('loaders', 'c-loader.js'),
    ]
};

function runLoaders(options, finalCallback) {

}

runLoaders({
    resource: "",
    loader: [],
    context: {},
    readResource: fs.readFile.bind(fs),
}, (error, result) => {
    console.log(result);
})