const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const smw = new SpeedMeasureWebpackPlugin();
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
// const
const resolvePath = filePath => path.resolve(__dirname, filePath);

module.exports = env => {
   return  {
        mode: env,
        entry: resolvePath('./src'),
        devtool:'source-map',
        // watch
        // watch: true,
        // watchOptions: {
        //     ignored: /node_modules/,
        //     aggregateTimeout: 300,
        //     poll: 1000,
        // },

        // proxy
        devServer: {
            before(app) {
                app.get('/api/users', function(req, res) {
                    res.json([{ id:1, name: 'Stella' }])
                })
            },
            proxy: {
                "/api": {
                    target: 'http://localhost:8080',
                    pathRewrite: {"^/api": ""},
                }
            },
        },

        output: {
            filename: '[name].js',
            path: resolvePath('./dist'),
            chunkFilename: "[id].[name].js"
        },
        module: {
            noParse: /lodash/,
            rules: [
                {
                    test: /\.css$/,
                    use: [{
                        // extract css
                        loader: MiniCssExtractPlugin.loader,
                        }, 'css-loader', 'postcss-loader', 
                        // {
                        //     loader: 'px2rem-loader',
                        //     options: {
                        //         remUnit: 75,
                        //         remPrecession: 8,
                        //     }
                        // }
                    ],
                    // include: resolvePath('./src'),
                    exclude: /node_modules/,
                },
                {
                    test: /\.js(x?)$/,
                    enforce: 'pre',
                    // include: [resolvePath('src'), resolvePath()],
                    use: [
                    //     {
                    //     loader: 'eslint-loader',
                    //     options: {
                    //         fix: true
                    //     }
                    // }, 
                    'babel-loader'],
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
                filename: 'css/[name].css',
            }),
            new PurgecssPlugin({
                paths: glob.sync(`${resolvePath('src')}/**/*`, { nodir: true }),
            } ),
            // clean output directory
            new CleanWebpackPlugin(),

            // DllPlugin
            new DllReferencePlugin({
                manifest: require("./dll/react.manifest.json"),
            }),

            // scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin(),

            // third-party lib
            // new webpack.ProvidePlugin({
            //     _: 'lodash'
            // }),

            // cdn
            // new HtmlWebpackExternalsPlugin({
            //     externals: [
            //         {
            //             module: 'lodash',
            //             entry: 'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.js',
            //             global: '_'
            //         }
            //     ]
            // }),

            // copyright
            // new webpack.BannerPlugin('乡聚旅游'),

            // DefinePlugin
            // new webpack.DefinePlugin({
            //     PRODUCTION: JSON.stringify(true),
            //     VERSION: '1',
            //     EXPRESSION: "1+2",
            //     COPYRIGHT: {
            //         AUTHOR: JSON.stringify("乡聚旅游"),
            //     }
            // }),

            // new FriendlyErrorsWebpackPlugin(),

            // new BundleAnalyzerPlugin(),

            // purgecss-webpack-plugin
            
        ],
        // externals
        // externals: {
        //     lodash: '_',
        // },

        // resolve
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.css'],
            alias: {
                "@": resolvePath('./src'),
                bootstrap$: resolvePath("./node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css"),
            },
            mainFields: ['browser', 'module', 'main'],
        },

        // friendly-errors
        // stats: 'minimal',
    }
};