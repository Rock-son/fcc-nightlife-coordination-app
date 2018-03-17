"use strict";

if (process.env.HEROKU_RUN == null) {
      require("dotenv").config();
}

const express = require("express"),
	http = require("http"),
	path = require("path"),
	fs = require("fs"),
	bodyParser = require("body-parser"),
	// ROUTES

	// SECURITY
	helmet = require("./security/helmet"),
	csrf = require("csurf"),
	cookieParser = require("cookie-parser"),
	cookieEncrypter = require("cookie-encrypter"),
	// LOGGING:  morgan = require("morgan"),  Log = require("./logs/services/morganLog"), accessLogStream = fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {flags: "a"}), // writable stream - for MORGAN logging
	// DB
	mongoose = require("mongoose"),      
	dbUrl = process.env.DBLINK,
	// PORT & ROUTER
	port = process.env.PORT || 3000,
	app = express(),
	// LIMITER
	RateLimiter = require("express-rate-limit"),
	limiter = new RateLimiter({
		windowMs: 15*60*1000, // 15 minutes
		max: 200, // limit each IP to 200 requests per windowMs (fonts, jpeg, css)
		delayMs: 0 // disable delaying - full speed until the max limit is reached
	}
);


// COOKIE & BODY PARSERS
app.use(cookieParser(process.env.CRYPTO_KEY));
app.use(cookieEncrypter(process.env.CRYPTO_KEY));


app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.json({ type: ["json", "application/csp-report"] }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// app.use(morgan({stream: accessLogStream}));

// SECURITY
app.use(csrf({cookie: true}));
helmet(app);
// CSRF ERROR HANDLER
app.use(function (err, req, res, next) {
	if (err.code !== "EBADCSRFTOKEN") return next(err)

	// handle CSRF token errors here 
	res.status(403).send("form tampered with")
});


//LIMITER
app.use(limiter);


// DB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);


// ROUTES
// no need - React does the routing!
	
// LOG (Helmet-csp) CSP blocked requests
// app.post("/report-violation", Log.logged);



// WEBPACK MIDDLEWARE || EXPRESS STATIC for production   -   IMPORTANT!!!  PUT ALL ROUTES ABOVE THIS LINE OF CODE (because of app.get("*") route!!!!!)
if (process.env.NODE_ENV !== "production") {
	
	const webpackMiddleware = require("webpack-dev-middleware"),
		webpack = require("webpack"),
		webpackConfig = require("./webpack.config.js");

	app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
	app.use(express.static(path.join(__dirname, "dist")));
	// IMPORTANT!!!  - NEEDED FOR REACT ROUTER HISTORY LIB
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "dist/index.html"));
	});
}



// SERVER
http.createServer(app)
	.listen(port, () => console.log("Listening on port: " + port));



module.exports.app = app;