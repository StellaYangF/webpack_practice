const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');

const loader = function(inputSource) {
    const callback = this.async();
    this.cacheable && this.cacheable();
    const schema  =　{
        type: 'object',
        properties: {
            filename: {
                type: 'string',
            },
            text: {
                type: 'string',
            }
        }
    };
    const options = loaderUtils.getOptions(this);
    validateOptions(schema, options);
    let { filename } = options;
    fs.readFile(filename, 'utf8', (err, text) => {
        callback(err, text + inputSource)
    })
}

loader.pitch = function() {
    console.log('banner-loader.pitch');
}

module.exports = loader;