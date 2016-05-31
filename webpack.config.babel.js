
const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

export default {
    cache: DEBUG,
    debug: DEBUG,

    entry: './public/components/app.js',

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
    }
};