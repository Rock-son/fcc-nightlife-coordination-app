"use strict";

const { LocalUser } = require("../models/users");
const jwt = require("jsonwebtoken");
const mongoSanitize = require("mongo-sanitize");

const cookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: false,
	maxAge: 60 * 60 * 24000// 24 hours
};


/**
 *
 * @param {Object} user object with user data
 * @param {String} type schema type
 */
function tokenForUser(user, type) {
	const timestamp = new Date().getTime();

	return jwt.sign(
		{
			sub: user._id,
			type,
			iat: timestamp,
			exp: timestamp + (3600000 * 24) // 24 hours
		},
		process.env.JWT_SECRET
	);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.login = function a(req, res) {
	const token = (function b(reqT, tokenForUserT) { return tokenForUserT(reqT.user, "local"); }(req, tokenForUser));
	// User has already auth'd their email and password with verifyLogin - local strategy
	res.cookie("t1", token, cookieOptions);
	return res.redirect("/voting-app");
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} user object with user data
 * @param {String} type schema type
 */
exports.schemaLogin = function a(req, res, user, type) {
	const token = (function b(userT, typeT, tokenForUserT) { return tokenForUserT(userT, typeT); }(user, type, tokenForUser));
	// User has already auth'd their email and password with verifyLogin - local strategy
	res.cookie("t1", token, cookieOptions);
	return res.redirect("/voting-app");
};
/**
 * Logs out user, deleting his cookie
 * @param {Object} req
 * @param {Object} res
 */
exports.logout = function a(req, res) {
	res.cookie("t1", "", {
		httpOnly: true,
		secure: false,
		sameSite: true,
		maxAge: -1,
		exp: new Date(1).getTime()
	});
	res.statusCode = 302;
	res.set({ 'Location': req.headers.referer || req.headers.origin || "/voting-app" });
	res.end();
};


// LOCAL
/**
 * Registers user with LOCAL STRATEGY
 * @param { Object } req
 * @param { Object } res
 * @param { Object } next
 */
exports.register = function a(req, res, next) {
	const username = mongoSanitize(req.body.username);
	const password = mongoSanitize(req.body.password);
	const confirmPass = mongoSanitize(req.body.confirmPassword);

	if (!username || !password) {
		return res.status(422).send({ error: "You must provide username and password!" });
	} else if (password !== confirmPass) {
		return res.status(422).send({ error: "Your passwords don't match!" });
	}

	LocalUser.findOne({ username }, (err, existingUser) => {
		if (err) { return next(err); }

		if (existingUser) {
			return res.status(422).send({ error: "Username is in use" });
		}

		const user = new LocalUser({
			username,
			password
		});
		user.save((errU) => {
			if (errU) { return next(errU); }

			// send back a cookie with authentication token
			res.cookie('t1', tokenForUser(user, "local"), cookieOptions);
			res.statusCode = 302;
			res.setHeader('Location', '/voting-app');
			res.end();
		});
	});
};
