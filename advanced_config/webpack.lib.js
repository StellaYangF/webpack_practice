const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const resolvePath = fileName => path.resolve(__dirname, fileName);

module.exports = {
    mode: 'none',
    entry: {
       'stellaMath': resolvePath('./calculator/src/index.js'),
       'stellaMath.min': resolvePath('./calculator/src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: resolvePath('./calculator/dist'),
        library: 'stellaMath',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js/,
            }),
        ]
    }
};
