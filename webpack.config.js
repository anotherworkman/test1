var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './components/App',
    output: { path: './', filename: 'bundle.js' },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.json$/, loader: "json" }
        ]
    }
};
