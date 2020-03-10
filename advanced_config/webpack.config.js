const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                use: 'babel-loader',
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
    ],
});