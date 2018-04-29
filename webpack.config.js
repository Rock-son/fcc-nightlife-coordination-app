"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;/* webpack --json > stats.json */
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isDevEnv = process.env.NODE_ENV === "development" || false;


// HTML_WEBPACK_PLUGIN
const TEMPLATE_IN = "./public/template.html";
const TEMPLATE_OUT = "./index.html";
// BUNDLE ENTRY & OUTPUT
const BUNDLE = path.join(__dirname, "public", "index.jsx");
const OUTPUT = path.join(__dirname, "dist");
// LIBS (files that don't change much)
const VENDOR_LIBS = ["react", "react-dom", "redux", "react-redux", "react-router", "react-router-dom", "redux-thunk"];





const config = {
	entry: {
		bundle: BUNDLE,
		vendor: VENDOR_LIBS
	},
	output: {
		path: OUTPUT,
		filename: "[name].[hash].js"
	},
	resolve: {
		// using aliases makes components reusable! - with no relative paths, i.e. just "require("Home")"
		alias: {
			// HOME
			Home_MapState: path.join(__dirname, "public/components/home/Home_MapState.jsx"),
			Home_HOC: path.join(__dirname, "public/components/home/Home_HOC.jsx"),
			Navbar: path.join(__dirname, "public/components/home/Navbar.jsx"),
			Content: path.join(__dirname, "public/components/home/Content.jsx"),
			Footer: path.join(__dirname, "public/components/home/Footer.jsx"),
			// LOGIN
			Login_MapState: path.join(__dirname, "public/components/login/Login_MapState.jsx"),
			Login_HOC: path.join(__dirname, "public/components/login/Login_HOC.jsx"),
			Login: path.join(__dirname, "public/components/login/Login.jsx"),
			// MISCELLANEOUS - state (actions, action creators, reducers, apis)
			InitialState: path.join(__dirname, "public/state/initialState.js"),
			Api: path.join(__dirname, "public/state/api.js"),
			Actions: path.join(__dirname, "public/state/actions.js"),
			ActionCreators: path.join(__dirname, "public/state/actionCreators.js"),
			RootReducer: path.join(__dirname, "public/state/reducers.js")
		},
		extensions: [".js", ".jsx", ".scss"]
	},
	devtool: "#source-map",
	devServer: {
		contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
		hot: true,
		quiet: true
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: "babel-loader",
				exclude: /(node_modules)/
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
		new FriendlyErrorsWebpackPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"]
		}),
		new HtmlWebpackPlugin({
			template: TEMPLATE_IN,
			filename: TEMPLATE_OUT// target path
		}),
		() => {
			if(isDevEnv) {
				return new BundleAnalyzerPlugin()
			}
			return new UglifyJsPlugin({
				cache: true,
				sourceMap: true,
				parallel: true,
				uglifyOptions : {
					ecma: 6,
					warnings: false,
					mangle: true
				}
			});
		},
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
			}
		})
	]
}

module.exports = config;
