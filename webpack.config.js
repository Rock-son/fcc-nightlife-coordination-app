"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


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
			// REGISTER
			Register_MapState: path.join(__dirname, "public/components/register/Register_MapState.jsx"),
			Register_HOC: path.join(__dirname, "public/components/register/Register_HOC.jsx"),
			Register: path.join(__dirname, "public/components/register/Register.jsx"),
			// MISCELLANEOUS - state (actions, action creators, reducers, apis)
			InitialState: path.join(__dirname, "public/state/initialState.js"),
			Api: path.join(__dirname, "public/state/api.js"),
			Actions: path.join(__dirname, "public/state/actions.js"),
			ActionCreators: path.join(__dirname, "public/state/actionCreators.js"),
			RootReducer: path.join(__dirname, "public/state/reducers.js")
		},
		extensions: [".js", ".jsx", ".scss"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: "babel-loader",
				exclude: /(node_modules)/},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: { importLoaders: 1 }
					},
					"resolve-url-loader",
					"postcss-loader",
					"sass-loader"
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css"
		}),
		// extract vendor and webpack's module manifest and inline it in the dist HTML
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"],
			minChunks: Infinity
		}),
		// extract common modules from all the chunks (requires no 'name' property)
		new webpack.optimize.CommonsChunkPlugin({
			async: true,
			children: true,
			minChunks: 4
		}),
		new HtmlWebpackPlugin({
			template: TEMPLATE_IN,
			filename: TEMPLATE_OUT// target path
		}),
		new UglifyJsPlugin({
			cache: true,
			sourceMap: true,
			parallel: true,
			uglifyOptions : {
				ecma: 6,
				warnings: false,
				mangle: true
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
			}
		})
	]
}

module.exports = config;
