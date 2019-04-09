const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const assetsPath = function(_path) {
	return path.posix.join('public', _path)
}
module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'public/js/[name].bundle.js'
	},

	plugins: [

		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: './dist'
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			D3:'d3'
		}),
		new HtmlWebpackPlugin({
			title: 'icourse',
			template: './index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			}

		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
	 
		}),
		new CopyPlugin([{
			from:'./assets/img',
			to:'public/img'
		},
		{from:'./assets/sound',to:'public/sound'}]),
		new MiniCssExtractPlugin({
			filename: 'public/assets/css/[name].bundle.css'
		})

	],
	module: {
		rules: [

			{
				test: /\.css$/,
			 
				use: [{
					loader: MiniCssExtractPlugin.loader,
					// 						options:{
					// 							publicPath:assetsPath('./')
					// 						}
				}, 'css-loader']
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				include: path.resolve(__dirname, 'src')
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@css': path.resolve(__dirname, 'src/assets/css'),
			'@img':path.resolve(__dirname, 'src/assets/img')
		}
	},
	optimization:{
		splitChunks:{
			cacheGroups:{
				js:{
					name:'vender',
					test:/\.js$/,
					chunks:'initial'
				}
			}
		}
	},
	devServer: {
		host: 'localhost',
		contentBase:'./dist',
		port: 8080,
		open: true,
		hot: true
	}

}
