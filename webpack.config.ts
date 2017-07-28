import * as path from 'path';
import * as webpack from 'webpack';
import { AureliaPlugin } from 'aurelia-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const config: webpack.Configuration = {
    entry: {
        app: 'aurelia-bootstrapper'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
        modules: [
            'src',
            'node_modules'
        ]
    },
    module: {
        rules: [{
            test: /\.ts$/i,
            use: 'ts-loader',
            include: /src/
        },
        {
            test: /\.css$/i,
            issuer: /\.html?$/i,
            use: 'style-loader'
        },
        {
            test: /\.html$/i,
            use: 'html-loader'  
        }]
    },
    plugins: [
        new AureliaPlugin({
            aureliaApp: 'main'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/manifest.json'
            },
            {
                from: 'index.html'
            }
        ])
    ]
}

export default config;