const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    context: process.cwd(),
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        host: "localhost",
        port: 8080,
        contentBase: path.resolve(__dirname, './dist'),
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "./src"),
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ]
}

