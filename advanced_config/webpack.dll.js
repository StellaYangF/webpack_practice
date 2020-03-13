const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const resolvePath = filename => path.resolve(__dirname, filename);

module.exports = {
    entry: {
        react: ["react", "react-dom"],
    },
    output: {
        filename: "[name].dll.js",
        path: resolvePath("dll"),
        library: "_dll_[name]",
    },
    plugins: [
        new DllPlugin({
            name: "_dll_react",
            path: resolvePath("dll/[name].manifest.json"),
        })
    ]
}