const QuickPaperLoaderPlugin = require('quick-paper/loader-plug/index.js');
const pkg = JSON.parse(require('fs').readFileSync('./package.json'));

module.exports = {
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'dist/' + pkg.name + '@v' + pkg.version + '.js',
        chunkFilename: 'dist/' + pkg.name + '@v' + pkg.version + '-bundle[name].js'
    },
    module: {
        rules: [{
            test: /\.paper$/,
            loader: ['quick-paper/loader/index.js'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ['quick-paper/style-loader/index.js', 'css-loader', 'postcss-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: [{
                loader: "url-loader",
                options: {
                    name: "dist/[name].[ext]",
                    context: "src/asset",
                    limit: 5000
                }
            }]
        }]
    },
    plugins: [
        new QuickPaperLoaderPlugin()
    ]
};
