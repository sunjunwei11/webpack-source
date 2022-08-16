const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/TestPlugin');
const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin');
const CleanwebpackPlugin = require('./plugins/clean-webpack-plugin');
const AnalyzeWebpackPlugin = require('./plugins/analyze-wbpack-plugin');
const InlinechunkWebpackPlugin = require('./plugins/inlinechunk-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name][chunkhash:10].js',
        chunkFilename: 'js/[name][chunkhash:10].chunk.js',
        assetModuleFilename: 'media/[name][chunkhash:6][ext][query]',
        // clean: true
    },
    devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		historyApiFallback: true,
		compress: true,
		port: 9000,
		// open: true,
		hot: true
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: './loaders/hello2.js',
                        options: {
                            author: 'zhangsan'
                        }
                    },
                    {
                        loader: './loaders/hello1.js',
                        options: {
                            author: 'zhangsan ok'
                        }
                    },
                    './loaders/async.js',
                    {
                        loader: './loaders/babel-loader.js',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: ['./loaders/file-loader.js'],
                type: 'javascript/auto'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template.html'),
            filename: 'index.html'
        }),
        // new TestPlugin(),
        // new BannerWebpackPlugin({
        //     author: 'zhangsan'
        // }),
        new CleanwebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new InlinechunkWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entry => `runtime-${entry.name}.js`
        }
    }
}
