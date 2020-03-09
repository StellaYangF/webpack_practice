const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    context: process.cwd(),
    mode: 'development',
    entry: {
        index: './src/index.js',
        common: './src/common.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contentHash].js',
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
    module: {
        rules: [
           {
               test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        injectType: 'singletonStyleTag',
                    }
                }, 'css-loader'],
            }, {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    // {
                    //     loader: 'file-loader'
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['common', 'index'],
            chunksSortMode: 'manual',
            hash: true,
        }),
        new CleanWebpackPlugin(),
    ]
}