const babel = require('@babel/core');
const loader = function(inputSource) {
    console.log(this.request);
    const config = {
        presets: [ "@babel/preset-env" ],
    };
    const { code, map, ast } = babel.transform(inputSource, config);
    console.log(source);
    return this.async(null, code);
}

module.exports = loader;