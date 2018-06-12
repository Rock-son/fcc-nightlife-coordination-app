"use strict";


// AUTHENTICATION
require("./auth/services/passport");
const Authentication = require("./auth/controllers/authentication");
const passport = require("passport");
const ensureAuthenticated = passport.authenticate("jwt", { session: false, failureRedirect: "/signin"});
const verifyLoginData = passport.authenticate("local", { session: false });
// FOURSQUARE API
const axios = require("axios");
const getClientIp = require("./db/controllers/modules/getIp").default;
const fsq_version = "1428278400";
const mongoSanitize = require("mongo-sanitize");
// DB
const db = require("./db/controllers/controller");


module.exports = function (app) {

	// AUTHENTICATION - Facebook, Google, Github, Twitter
	app.get("/auth/github", passport.authenticate("github", { session: false }));
	app.get("/auth/github/return", (req, res, next) => {
			passport.authenticate("github", { session: false, failureRedirect: "/" }, function(err, user, info, status) {
				if (err) { return next(err);}

				Authentication.schemaLogin(req, res, user, "github");
			})(req, res);
		}
	);

	app.get("/auth/google", passport.authenticate("google", { session: false }));
	app.get("/auth/google/return", (req, res, next) => {
			passport.authenticate("google", { session: false, failureRedirect: "/" }, function(err, user, info, status) {
				if (err) { return next(err);}

				Authentication.schemaLogin(req, res, user, "google");
			})(req, res);
		}
	);

	app.get("/auth/facebook", passport.authenticate("facebook", { session: false }));
	app.get("/auth/facebook/return", (req, res, next) => {
			passport.authenticate("facebook", { session: false, failureRedirect: "/" }, function(err, user, info, status) {

				if (err) { return next(err);}

				Authentication.schemaLogin(req, res, user, "facebook");
			})(req, res);
		}
	);

	// LOCAL AUTH
	app.post("/auth/localAuth", verifyLoginData, Authentication.login);

	app.post("/auth/register", Authentication.register);

	app.post("/auth/logout", Authentication.logout);

	app.post("/auth/getLoggedUser",  (req, res, next) => {
		passport.authenticate('jwt', {session: false}, function(err, user, info, status) {
			if (err) { return next(err) }
			if (!user) {
				return res.status(401).send({ user: "", authenticated: false });
			}

			return res.status(200).send({ user: user.username || user.displayName, authenticated: true, authType: info });
		})(req, res, next);
	});



	// GOING REDUCER
	app.post("/api/addGoing", (req, res, next) => {
		if (req.body.location.trim() === "") return setTimeout(() => res.status(400).send("You need to input location!"), 300);

		passport.authenticate('jwt', {session: false}, function(err, user, info, status) {
			if (err) { return next(err) }
			if (!user) {
				return res.status(401).send("unauthorized");
			}

			const data = {
				city: mongoSanitize(req.body.location.trim()) || "",
				id: mongoSanitize(req.body.id.trim()) || "",
				user: mongoSanitize(user.username || user.displayName) || ""
			};
			if (!data.city || !data.id) {
				return res.status(200).send({ users: [], id: "" });
			}
			return db.addGoingUsers(req, res, next, data);
		})(req, res, next);
	});

	app.post("/api/removeGoing", (req, res, next) => {
		if (req.body.location.trim() === "") return setTimeout(() => res.status(400).send("You need to input location!"), 300);

		passport.authenticate('jwt', {session: false}, function(err, user, info, status) {
			if (err) { return next(err) }
			if (!user) {
				return res.status(401).send("unauthorized");
			}

			const data = {
				city: mongoSanitize(req.body.location.trim()) || "",
				id: mongoSanitize(req.body.id.trim()) || "",
				user: mongoSanitize(user.username || user.displayName) || ""
			};
			if (!data.city || !data.id) {
				return res.status(200).send({ users: [], id: "" });
			}
			return db.removeGoingUsers(req, res, next, data);
		})(req, res, next);
	});




	// INITIALIZE LOCATION
	app.post("/api/initializeLocation", (req, res, next) => {
		passport.authenticate('jwt', {session: false}, function(err, user, info, status) {
			if (err) { return next(err); }
			if (user) {
				db.getLocation(info, user)
					.then(authedUser => {
						if (authedUser.lastSrcLocation) {
							return res.send({ city: authedUser.lastSrcLocation });
						} else {
							return getIpLocation();
						}
					})
					.catch(error => res.status(400).send({ error }));
			} else {
				return getIpLocation();
			}

				async function getIpLocation() {
					let ip = await getClientIp(req);
					ip = ip === "::1" ? "" : ip; // "" is the same as getting WAN IP (on request)

					axios({
						method: "get",
						url: `http://ip-api.com/json/${ip}`,
						timeout: 2000,
						validateStatus: status => status < 500 // Reject if the status code < 500
						})
						.then(response => res.status(200).send(response.data))
						.catch(error => {
							if (error.response) {
								// The request was made and the server responded with a status code that falls out of the range of 2xx
								return res.status(error.response.status).send(error.response.data, error.response.header);
							}
							if (error.request) {
								// The request was made but no response was received `error.request` is an instance of http.ClientRequest in node.js
								return res.status(400).send(error.request);
							}
							return res.status(400).send(error.message);
					});
				}
		})(req, res, next);
	});



	// SEARCH BARS AND SAVE LAST LOCATION
	app.post("/api/searchBars", (req, res, next) => {
		if (req.body.location.trim() === "") return setTimeout(() => res.status(400).send("You need to input location!"), 300);

		passport.authenticate('jwt', {session: false}, function(err, user, info, status) {
			if (err) { return next(err) }
			if (user) {
				db.saveLastLocation(req, res, next, info, user);
			}
		})(req, res, next);
		const city = mongoSanitize(req.body.location.trim());
		const cityPromise = db.getCityBarUsers(city);
		const foursquarePromise = axios({
			method: "get",
			url: "https://api.foursquare.com/v2/venues/explore",
			timeout: 2000,
			params: {
				client_id: process.env.FSQ_CLIENT_ID,
				client_secret: process.env.FSQ_SECRET,
				near: city,
				section: "drinks",
				venuePhotos: 1,
				v: fsq_version,
				limit: 50
			},
			validateStatus: status => status < 500 // Reject if the status code < 500
			});

		Promise.all([cityPromise, foursquarePromise]).then(response => {
			return res.status(200).send({bars: response[0] || [], businesses: response[1].data.response.groups[0].items});
			})
			.catch(error => {
				if (error.response) {
					// The request was made and the server responded with a status code that falls out of the range of 2xx
					return res.status(error.response.status).send(error.response.data);
				}
				if (error.request) {
					// The request was made but no response was received `error.request` is an instance of http.ClientRequest in node.js
					return res.status(400).send(error.request);
				}
				return res.status(400).send(error.message);
			});
		}
	);
}