const path = require('path');

module.exports = {
    context: process.cwd(),
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {},
    plugins: [],
    devServer: {
        host: "localhost",
        port: 8080,
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        hot: true,
    },
}