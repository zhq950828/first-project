const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
function pathJoin(relatedPath) {
    return path.join(__dirname, relatedPath);
}

function pathReslove(relatedPath) {
    console.log(__dirname, relatedPath);
    console.log(path.resolve(__dirname, relatedPath));
    return path.resolve(__dirname, relatedPath);
}

module.exports = {
    entry: {
        client: pathReslove('../src/index.js'),
    },
    output: {
		path: pathReslove('../dist'),
	},
    resolve: {
        extensions: ['.js', '.less', '.jsx'],
        alias: {
            '@src': pathReslove('../src'),
        }
    },
    resolveLoader: {
		moduleExtensions: ['-loader']
	},
    // context: path.resolve(process.cwd(), './src'),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: [
                    'style',
                    'css',
                    'stylus'
                ],
                include: pathReslove('../src'),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: pathReslove('../src/index.html'),
            inject: true,
            // chunks: htmlWebpackConfig.chunks,
            // chunksSortMode: 'manual'
        }),
    ],
} 