"use strict";

const { LocalUser } = require("../models/users");
const jwt = require("jsonwebtoken");
const mongoSanitize = require("mongo-sanitize");
// TODO: change httpOnly & secure: true
const cookieOptions = {
	httpOnly: false,
	secure: false,
	sameSite: false,
	maxAge: 60 * 60 * 24000// 24 hours
};

/* eslint-disable no-underscore-dangle */
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
/* eslint-enable */

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
	/*
	req.session.valid = true;
	res.redirect('/');
	var passedVariable = req.session.valid;
	  */
	return res.send({ user: req.user.username });
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
	return res.send({ user: req.user.username });
};
/**
 * Logs out user, deleting his cookie
 * @param {Object} req
 * @param {Object} res
 */
exports.logout = function a(req, res) {
	res.cookie("t1", "", { ...cookieOptions, maxAge: -1 }); // delete a cookie with 'max-age'= -{any digit}!!!
	return res.send();
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

	return LocalUser.findOne({ username }, (err, existingUser) => {
		if (err) { return next(err); }

		if (existingUser) {
			return res.status(422).send({ error: "Username is in use" });
		}

		const user = new LocalUser({
			username,
			password
		});
		return user.save((errU) => {
			if (errU) { return next(errU); }

			// send back a cookie with authentication token
			res.cookie('t1', tokenForUser(user, "local"), cookieOptions);
			return res.send({ user: username });
		});
	});
};
