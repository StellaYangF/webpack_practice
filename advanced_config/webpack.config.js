const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolvePath = filePath => path.resolve(__dirname, filePath);

module.exports = env => ({
    mode: env,
    entry: resolvePath('./src'),
    output: {
        filename: '[name].js',
        path: resolvePath('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    // extract css
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'postcss-loader'],
                include: resolvePath('./src'),
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                include: [resolvePath('src')],
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }, 'babel-loader'],
            },
            {
                test: /\.(woff|ttf|eot|svg|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                    }
                }],
            }
        ]
    },
    plugins: [
        // generate html
        new HtmlWebpackPlugin({
            template: resolvePath('./src/index.html'),
            filename: 'index.html',
        }),
        // extract css
        new MiniCssExtractPlugin({
            filename: 'css/[name][contentHash].css',
        }),
        // clean output directory
        new CleanWebpackPlugin(),

        // third-party lib
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // }),

        // cdn
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'lodash',
                    entry: 'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.js',
                    global: '_'
                }
            ]
        })
    ],
    externals: {
        lodash: '_',
    }
});