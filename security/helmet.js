module.exports = function(app) {

	const helmet = require("helmet");
	const helmet_csp = require("helmet-csp");


	// SECURITY middleware (Helmet, Helmet-csp)
	app.use(helmet({dnsPrefetchControl: {allow: true}}));
	app.use(helmet.hidePoweredBy());
	app.use(helmet_csp({
		directives: { defaultSrc: ["'self'", "https://fcc-nightlife-coordination-app.herokuapp.com/*", "https://api.yelp.com/*"],
			scriptSrc:	["'self'", "https://cdnjs.cloudflare.com"],
			styleSrc:	["'self'", "https://cdnjs.cloudflare.com"],
			fontSrc:	["'self'", "https://cdnjs.cloudflare.com"],
			connectSrc: ["'self'", "https://api.yelp.com/*"],
			imgSrc:		["'self'", "data:"],
			sandbox:	["allow-forms", "allow-scripts"]
			//reportUri: '/report-violation' // set up a POST route for notifying / logging data to server
		},
		reportOnly: function (req, res) {
			if (req.query.cspmode === "debug") {
				return true;
			} else {
				return false;
			}
		}
	})
	);
	
	app.use(function(req, res, next) {
		res.set({
			"Access-Control-Allow-Origin" : "*",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, content-type, Accept, Authorization"
		});
		app.disable("x-powered-by");
		next();
	});
};