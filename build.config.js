 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const baseConfig = {
	useHash:false
}
// const assetsPath = function(_path) {
// 	return path.posix.join('public', _path)
// }
module.exports = {
    mode:'production',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: baseConfig.useHash ? 'js/[hash].bundle.js' : 'js/[name].bundle.js'
	},

	plugins: [

		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: './dist'
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
			PropTypes:'prop-types',
			Axios:'axios',
			PIXI:'pixi.js',
		 
	 
			Echarts:'echarts',
			D3:'d3',
			gsap:'gsap'
	 
		}),
		new CopyPlugin([
			{
				from:__dirname+'/src/json',
				to:__dirname+'/dist/json'
			},
			{
				from:__dirname+'/src/spine',
				to:__dirname+'/dist/spine'
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
				test: /\.(css|less)$/,
			 
				use: [{
					loader:MiniCssExtractPlugin.loader,
						options:{
							publicPath:'../'

						}
					 
				}, 'css-loader','less-loader']
			},
			{
				test: /\.(js|jsx)$/,
				use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }

                }
			 
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@css': path.resolve(__dirname, 'src/css'),
			'@img':path.resolve(__dirname, 'src/img')
		}
	},
	optimization:{
        minimizer: [new UglifyJsPlugin({
            exclude: /node_modules/,
            uglifyOptions:{
                compress:{
                    warnings:false,
                    drop_debugger:true,
                    drop_console:true
    
                }
            }
        
        })],
		splitChunks:{
			cacheGroups:{
				js:{
					name:'vender',
					test:/\.js$/,
					chunks:'initial'
				}
			}
		}
	}
 
}
