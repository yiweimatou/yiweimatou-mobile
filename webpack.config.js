const path = require('path');
const webpack = require ('webpack');
const cssnano = require ('cssnano');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

const __DEV__ = process.env.NODE_ENV !== 'production'
const webpackConfig = {
        name: 'client',
        target: 'web',
        devtool: __DEV__ ? 'source-map' : '',
        debug: true,
        resolve: {
            root: path.join(__dirname, 'src'),
            extensions: ['', '.js', '.jsx', '.json', '.css']
        },
        module: {}
    }
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = path.join(__dirname, 'src') + '/client.js'
webpackConfig.entry = {
    app: __DEV__ ? [
        APP_ENTRY_PATH,
        'webpack-hot-middleware/client?path=__webpack_hmr'
    ] : APP_ENTRY_PATH,
    vendor: [
        'react',
        'debug',
        // 'react-router',
        'react-dom',
        // 'history'
    ]
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        hash: false,
        favicon: path.join(__dirname, 'src/static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    })
]

if (__DEV__) {
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    )
} else {
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        })
    )
}

// Don't split bundles during testing, since we only want import one bundle
webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }, new webpack.ProvidePlugin({
        React: 'react',
        'window.React': 'react'
    })))

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.loaders = [{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}, {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, 'src'),
    loader: 'babel',
    query: {
        cacheDirectory: true,
        // plugins: ['transform-runtime'],
        presets: ['es2015', 'react', 'stage-0'],
        // env: {
        //     development: {
        //         plugins: [
        //             ['react-transform', {
        //                 transforms: [{
        //                     transform: 'react-transform-hmr',
        //                     imports: ['react'],
        //                     locals: ['module']
        //                 }, {
        //                     transform: 'react-transform-catch-errors',
        //                     imports: ['react', 'redbox-react']
        //                 }]
        //             }]
        //         ]
        //     },
        //     production: {
        //         plugins: [
        //             'transform-react-remove-prop-types',
        //             'transform-react-constant-elements'
        //         ]
        //     }
        // }
    }
}, {
    test: /\.json$/,
    loader: 'json'
}, {
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
}, {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
}, {
    test: /\.otf(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
}, {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
}, {
    test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]'
}, {
    test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
}, {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=8192'
}]
if (!__DEV__) {
    // webpackConfig.module.loaders.filter((loader) =>
    //     loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
    // ).forEach((loader) => {
    //     const [first, ...rest] = loader.loaders
    //     loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    //     delete loader.loaders
    // })

    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: true
        })
    )
}

module.exports =  webpackConfig