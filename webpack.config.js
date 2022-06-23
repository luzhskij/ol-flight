const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	entry: "./source/main.tsx",
	watch: true,
	watchOptions: {
		aggregateTimeout: 50,
		poll: 50
	},
	output: {
		path: path.join(__dirname, "./release"),
		filename: "main.js"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			}			
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.scss' ],
		alias: {
			"@assets": path.resolve( __dirname, "assets" ),
			"@styles": path.resolve( __dirname, "assets", "styles" ),
			"@core": path.resolve( __dirname, "source", "core" ),
			"@components": path.resolve( __dirname, "source", "components" ),
			"@layers": path.resolve( __dirname, "source", "layers" ),
			"@modules": path.resolve( __dirname, "source", "modules" ),
			"@utility": path.resolve( __dirname, "source", "utility" ),
		}
	},
	devServer: {
		hot: false,
		inline: false,
		port: 7000,
		host: "0.0.0.0",
		historyApiFallback: {
			index: 'index.html'
		}
	}
};