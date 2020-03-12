const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const resolvePath = fileName => path.resolve(__dirname, fileName);
console.log(resolvePath('./flexible-rem/lib'));
module.exports = {
    mode: 'none',
    entry: {
       'flexible-rem': resolvePath('./flexible-rem/lib/index.js'),
       'flexible-rem.min': resolvePath('./flexible-rem/lib/index.js'),
    },
    output: {
        filename: '[name].js',
        path: resolvePath('./flexible-rem/dist'),
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
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                include: [ resolvePath('./flexible-rem/lib') ],
                use: ['babel-loader'],
            }
        ]
    }
};
