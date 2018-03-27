"use strict";

const webpack = require("webpack"),
	path = require("path"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	DEVELOPMENT = "development",
	isDevEnv = process.env.NODE_ENV === "development" ? true : false,


	// HTML_WEBPACK_PLUGIN
	TEMPLATE_IN = "./public/template.html",
	TEMPLATE_OUT = "./index.html",
	// BUNDLE ENTRY & OUTPUT
	BUNDLE = path.join(__dirname, "public", "index.jsx"),
	OUTPUT = path.join(__dirname, "dist"),
	// LIBS (files that don't change much)
	VENDOR_LIBS = ["react", "react-dom", "redux", "react-redux", "redux-thunk"];




      
const config = { 
	entry: {
		bundle: BUNDLE,
		vendor: VENDOR_LIBS
	},
	output: {
		path: OUTPUT,
		filename: "[name].[chunkhash].js"
	},
	resolve: {
		// using aliases makes components reusable! - with no relative paths, i.e. just "require("App")"
		alias: {
			App: path.join(__dirname, "public/components/App.jsx"),
			Home: path.join(__dirname, "public/components/Home.jsx"),
			Navbar: path.join(__dirname, "public/components/Navbar.jsx"),
			Content: path.join(__dirname, "public/components/Content.jsx"),
			Footer: path.join(__dirname, "public/components/Footer.jsx"),
			StateVariables: path.join(__dirname, "public/state/stateVariables.js"),
			RootReducer: path.join(__dirname, "public/state/reducers.js")
		},
		extensions: [".js", ".jsx", ".scss"]
	},
	devtool: "source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: { importLoaders: 1, sourceMap: isDevEnv }
					},
					{
						loader: "resolve-url-loader",
						options: { sourceMap: isDevEnv }
					},
					{
						loader: "postcss-loader",
						options: { sourceMap: isDevEnv }
					},
					{
						loader: "sass-loader",
						options: { sourceMap: isDevEnv }
					}]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css"
			//disable: isDevEnv
		}),
		
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"]
		}),
		new HtmlWebpackPlugin({ 
			template: TEMPLATE_IN,
			filename: TEMPLATE_OUT// target path
		}),
		/*new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		}),*/					
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
			}
		})
	]
}

module.exports = config;
