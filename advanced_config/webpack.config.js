const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'postcss-loader'],
                include: resolvePath('./src'),
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('./src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contentHash].css',
        }),
    ],
});