const path = require('path');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let plugins = [
    new NpmInstallPlugin
];

if (process.env.environment === 'production') {
    plugins.push(new UglifyJsPlugin);
}

module.exports = {
    watch: process.env.environment !== 'production',
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: 'source-map',
    entry: [
        "./src/app.js",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        library: 'NPMPackageStarter',
        libraryTarget: 'umd'
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ["env"]
                   }
                }
            }
       ]
    }
}