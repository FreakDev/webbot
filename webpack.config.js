'use strict';

const path = require('path');

module.exports = {
    mode: 'development',

    target: "node",

    entry: {
        main: path.resolve('./src/main.js')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ]
    }
};
