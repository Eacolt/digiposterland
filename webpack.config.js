const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const baseConfig = {
	useHash:false
}
const assetsPath = function(_path) {
	return path.posix.join('public', _path)
}
module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: baseConfig.useHash ? 'js/[hash].bundle.js' : 'js/[name].bundle.js'
	},

	plugins: [

		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: './dist'
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			Echarts:'echarts',
			D3:'d3',
			gsap:'gsap'
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
			ReactDOM: 'react-dom',
			PropTypes:'prop-types'
	 
		}),
		new CopyPlugin([
			{
				from:__dirname+'/src/public',
				to:__dirname+'/dist/public'
			}
		]),
	 
		new MiniCssExtractPlugin({
			filename: baseConfig.useHash ? 'css/[hash].bundle.css' : 'css/[name].bundle.css'
		})

	],
	module: {
		rules: [
			{
				test:/\.(jpg|png|gif|jpeg)$/,
				use:[
					{
						loader:'file-loader',
			 
						options:{
					 
							name: baseConfig.useHash ? '[hash].[ext]' : '[name].[ext]',
			 
						    outputPath:'img'
						}
					}
				]
			},

			{
				test: /\.css$/,
			 
				use: [{
					loader:MiniCssExtractPlugin.loader,
						options:{
							publicPath:'../'

						}
					 
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
			'@css': path.resolve(__dirname, 'src/public/css'),
			'@img':path.resolve(__dirname, 'src/public/img')
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
		port: 8081,
		open: true,
		hot: true
	}

}
