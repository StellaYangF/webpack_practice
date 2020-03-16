const path = require('path');
const resolvePath = filename => path.resolve(__dirname, filename);

module.exports = {
    mode: 'development',
    entry: resolvePath('src'),
    output: {
        filename: '[name].js',
        path: resolvePath('dist'),
    },
    // customized loaders
    resolveLoader: {
        // modules: [resolvePath('node_modules'), resolvePath('loaders')],
        alias: {
            "loader1": resolvePath('loaders/loader1.js'),
            "loader2": resolvePath('loaders/loader2.js'),
            "loader3": resolvePath('loaders/loader3.js'),
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 
                // [ loader1 ]  // npm link loader1
                // resolvePath('./loaders/loader1.js') 
                ['loader3' ,'loader2', 'loader1'], // resolveLoader.modules or .alias
            }
        ]
    }
}