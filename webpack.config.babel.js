
// const DEBUG = !process.argv.includes('--release');
// const VERBOSE = process.argv.includes('--verbose');

import webpack from 'webpack';

export default {
    // cache: DEBUG,
    // debug: DEBUG,

    devtool: 'eval',

    entry: './public/components/index.js',

    output: {
        path: './public',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]
};