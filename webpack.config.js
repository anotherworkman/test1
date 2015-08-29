var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './components/App',
    output: { path: './bundle', filename: 'bundle.js' },
    module: {
        loaders: [
            //{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0&loose=es6.classes" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.json$/, loader: "json" }
        ]
    }
};
