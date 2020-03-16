const path = require('path');
const resolvePath = filename => path.resolve(__dirname, filename);

module.exports = {
    mode: 'development',
    entry: resolvePath('src'),
    output: {
        filename: '[name].js',
        path: resolvePath('dist'),
    },
    resolveLoader: {
        modules: [resolvePath('node_modules'), resolvePath('loaders')],
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['loader3' ,'loader2', 'loader1'],
            }
        ]
    }
}