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
	port = process.env.PORT || 8080,
	app = express(),
	// LIMITER
	RateLimiter = require("express-rate-limit"),
	limiter = new RateLimiter({
		windowMs: 15*60*1000, // 15 minutes
		max: 200, // limit each IP to 200 requests per windowMs (fonts, jpeg, css)
		delayMs: 0 // disable delaying - full speed until the max limit is reached
	}
);


// COOKIES
app.use(cookieParser(process.env.CRYPTO_KEY));
app.use(cookieEncrypter(process.env.CRYPTO_KEY));

// BODY PARSERS
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

app.post("/api/searchBars", (req, res) => {
	
	const key = req.body.location || null;

	console.log(req.body, req.params, req, query);
	res.json({"data": "sent"});

});
app.get("/api/searchBars", (req, res) => {
	console.log("hello");
	//https://api.yelp.com/v3/businesses/search?location=london
	res.send([{"data": "sent"}]);
});
app.get("/test", (req, res) => {
		res.json({"naj bi delalo": "true"});
	}
);
// WEBPACK MIDDLEWARE || EXPRESS STATIC for production   -   IMPORTANT!!!  PUT ALL ROUTES ABOVE THIS LINE OF CODE (because of app.get("*") route!!!!!)
if (process.env.NODE_ENV !== "development") { //production
	
	const webpackMiddleware = require("webpack-dev-middleware");
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpack = require("webpack");
	const webpackConfig  = require("./webpack.config.js");

	const compiler = webpack(webpackConfig );
	

	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig .output.path,
		stats: {colors: true}
		}
	));

	app.use(webpackHotMiddleware(compiler, {
    	log: console.log
		}
	));
} else {
	app.use(express.static(path.join(__dirname, "dist")));
	app.use(express.static(path.join(__dirname, "public")));
	// IMPORTANT!!!  - NEEDED FOR REACT ROUTER HISTORY LIB??????????????????? - NOT ABLE TO GET IMAGE & OTHER ROUTES
	
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "dist/index.html"));
	});
}



// SERVER
http.createServer(app)
	.listen(port, () => console.log("Listening on port: " + port));



module.exports.app = app;