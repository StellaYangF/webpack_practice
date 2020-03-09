const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    context: process.cwd(),
    mode: 'development',
    entry: {
        index: './src/index.js',
        common: './src/common.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    // devtool: "source-map",
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
                include: path.resolve(__dirname, "./src"),
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'style-loader',
                        // options: {
                        //     injectType: 'singletonStyleTag',
                        // }
                        
                        loader: MiniCssExtractPlugin.loader,
                    }, 'css-loader'],
            }, {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader', 'less-loader'
                ]
            }, {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader', 'sass-loader'
                ]
            },{
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    // {
                    //     loader: 'file-loader'
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            outputPath: 'images',
                            publicPath: '/images',
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
            // hash: true,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new TerserPlugin({
            parallel: true,
            cache: true
       }),
       new OptimizeCSSAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
   })
    ]
}

