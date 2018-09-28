const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const config = {
    entry: ['./src/index.jsx'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                exclude: /node_modules/,
                use: "babel-loader",
                test: /\.js|jsx$/
            },
            {
                loader: ExtractTextPlugin.extract({
                    use: "css-loader"
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new CopyWebpackPlugin([
            {from:"./src/content",to:"./content"},
            {from:"./src/res",to:"./res"},
            {from:"./src/manifest.json",to:"./"},
            {from:"./src/events.js",to:"./"}
        ]),
        new ZipPlugin({
            filename: "readlater.zip"
        })
    ]
}

module.exports = config;