var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    devtool: debug ? "inline-sourcemap" : null,
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
            // { test: /\.(png|jpg|jpeg|svg|gif)$/, loader: 'url-loader!file-loader?limit=1024&name=[path][name].[ext]&outputPath=images/&publicPath=build/' }
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    devServer: {
        contentBase: "./",
        host: "127.0.0.1",
        port: "8080",
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};