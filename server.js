"use strict";

if (process.env.HEROKU_RUN == null) {
      require("dotenv").config();
}

const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
// ROUTES
const axios = require("axios");
// SECURITY
const helmet = require("./security/helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
// LOGGING:  morgan = require("morgan"),  Log = require("./logs/services/morganLog"), accessLogStream = fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {flags: "a"}), // writable stream - for MORGAN logging
// DB
const mongoose = require("mongoose");
const dbUrl = process.env.DBLINK;
// PORT & ROUTER
let port = process.env.PORT || 3000;
const app = express();
// LIMITER
const RateLimiter = require("express-rate-limit");
const limiter = new RateLimiter({
		windowMs: 15*60*1000, // 15 minutes
		max: 200, // limit each IP to 200 requests per windowMs (fonts, jpeg, css)
		delayMs: 0 // disable delaying - full speed until the max limit is reached
	}
);

// APP
app.set("views", path.join(__dirname, "dist"));
app.set("view engine", "pug");
// COOKIES
app.use(cookieParser(process.env.CRYPTO_KEY));
app.use(cookieEncrypter(process.env.CRYPTO_KEY));
// ROUTES
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));
// BODY PARSERS
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.json({ type: ["json", "application/csp-report"] }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(morgan({stream: accessLogStream}));

// SECURITY
helmet(app);
/* app.use(csrf({cookie: true}));
// CSRF ERROR HANDLER
app.use(function (err, req, res, next) {
	if (err.code !== "EBADCSRFTOKEN") return next(err)
	console.log(req._csrf, req.body, req.csrfToken());
	// handle CSRF token errors here 
	res.status(403).send("form tampered with")
});
*/

//LIMITER
app.use(limiter);


// DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

// LOG (Helmet-csp) CSP blocked requests
// app.post("/report-violation", Log.logged);


// CUSTOM ROUTES
app.post("/api/searchBars", (req, res) => {
	
	axios({
		method: "get",
		url: "https://api.yelp.com/v3/businesses/search?location=" + req.body.location,
		timeout: 2000,
  		headers: {"Authorization": "Bearer " + process.env.YELP_KEY},
		validateStatus: status => status < 500 // Reject if the status code < 500
		})
		.then(response => {
			console.log(response);
			res.send(response.data);
		})
		.catch(error => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				res.send(error.response.data, error.response.status, error.response.header);
			}
			if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of http.ClientRequest in node.js
				res.send(error.request);
			}
			res.send(error.message);
		});
	}
);

app.get("/test", (req, res) => {
	res.json({"naj bi delalo": "true"});
});

// PUT ALL ROUTES ABOVE THIS LINE OF CODE!
if (process.env.NODE_ENV !== "production") {
	
	port = 8080;
	const webpackDevMiddleware = require("webpack-dev-middleware");
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpack = require("webpack");
	const webpackConfig  = require("./webpack.config.dev.js");

	const compiler = webpack(webpackConfig);	

	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.path,
		stats: {colors: true}
		})
	);
	app.use(webpackHotMiddleware(compiler, {
    	log: console.log
		})
	);
} else {
	// NEEDED FOR REACT ROUTER HISTORY LIB	
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "dist", "index.html"));
	});
}



// SERVER
http.createServer(app)
	.listen(port, () => console.log("Listening on port: " + port));
