const babel = require('@babel/core');
const loader = function(inputSource) {
    const config = {
        presets: [ "@babel/preset-env" ],
        sourceMaps: true,
        filename: this.request.split('!')[1].split('/').pop()
    };
    const { code, map, ast } = babel.transform(inputSource, config);
    return this.callback(null, code, map);
}

loader.pitch = function() {
    console.log('babel-loader.pitch');
}

module.exports = loader;