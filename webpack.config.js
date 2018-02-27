var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }, //下面是使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader!file-loader?limit=8192' }
        ]
    }
};