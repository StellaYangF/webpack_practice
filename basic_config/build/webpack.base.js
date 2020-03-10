const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = env => {
    const isDev = !!env.development;
    const baseConfig = {};
    return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig);
}   