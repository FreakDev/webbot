'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
