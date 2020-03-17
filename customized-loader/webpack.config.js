const path = require('path');
const resolve = (...filenames) => path.resolve(__dirname, ...filenames);

module.exports = mode => ({
    mode,
    entry: resolve('src', 'index.js'),
    output: {
        filename: '[name].js',
        path: resolve('dist'),
    },
    resolveLoader: {
        // alias: {
        //     'babel-loader': resolve('babel-loader'),
        // },
        modules: [resolve('loaders'), resolve('node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ]
    }
})