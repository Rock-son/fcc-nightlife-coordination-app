"use strict";

const passport = require("passport");
const {
	LocalUser, GitHubUser, FacebookUser, GoogleUser
} = require("../models/users");

const GOOGLE = "google";
const FACEBOOK = "facebook";
const GITHUB = "github";
const LOCAL = "local";
const CALLBACK = `http://localhost:${process.env.PORT || 8080}/auth`;
const JwtStrategy = require("passport-jwt").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require("passport-local");
// SANITIZATION
const mongoSanitize = require("mongo-sanitize");
const xssFilters = require("xss-filters");


// LOCAL strategy - REGISTER with a password
const localOptions = { usernameField: "username" };

const localLogin = new LocalStrategy(localOptions, ((username, password, done) => {
	const userName = xssFilters.inHTMLData(mongoSanitize(username));
	const pass = xssFilters.inHTMLData(mongoSanitize(password));

	LocalUser.findOne({ username: userName }, (err, user) => {
		if (err) { return done(err, false); }

		if (!user || user == null) {
			return done(null, false);
		}
		return user.comparePassword(pass, (errC, isMatch) => {
			if (errC) { return done(errC); }
			if (!isMatch) { return done(null, false); }
			return done(null, user);
		});
	});
}));


// JWT token strategy
const jwtOptions = {
	jwtFromRequest(req) {
		if (req && (req.cookies || {}).t1 != null) {
			return req.cookies.t1;
		}
		return null;
	},
	// jwtFromRequest: ExtractJwt.fromHeader("authorization"), // returns extracted JWT token
	secretOrKey: process.env.JWT_SECRET
};

// JWT Strategy
/**
 * @param { Object } jwtOptions options for extracting token
 * @param { Object } payload returned object payload of JWT TOKEN
 * @param { Object } done function callback which appends req.user and makes a response
 */
const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
	switch (payload.type || "") {
	case LOCAL:
		return LocalUser.findById(payload.sub, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user, "local"); }
			return done(null, false);
		});
	case FACEBOOK:
		return FacebookUser.findById(payload.sub, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user, "facebook"); }
			return done(null, false);
		});
	case GITHUB:
		return GitHubUser.findById(payload.sub, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user, "github"); }
			return done(null, false);
		});
	case GOOGLE:
		return GoogleUser.findById(payload.sub, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user, "google"); }
			return done(null, false);
		});
	default:
		return done(null, false);
	}
}));

// GITHUB STRATEGY
const gitHubStrategy = new GitHubStrategy(
	{
		scope: "user:email",
		clientID: process.env.GITHUB_ID,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: `${CALLBACK}/github/return`
	},
	((accessToken, refreshToken, profile, done) => {
		GitHubUser.findOne({ userID: profile.id }, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user); }


			return GitHubUser.create({ userID: profile.id, displayName: profile.displayName }, (errU, userU) => {
				if (errU) return done(errU, false);
				return done(null, userU);
			});
		});
	})
);
// GOOGLE STRATEGY
const googleStrategy = new GoogleStrategy(
	{
		scope: "profile",
		clientID: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: `${CALLBACK}/google/return`
	},
	((accessToken, refreshToken, profile, done) => {
		GoogleUser.findOne({ userID: profile.id }, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user); }


			return GoogleUser.create({ userID: profile.id, displayName: profile.displayName }, (errG, userG) => {
				if (errG) return done(errG, false);
				return done(null, userG);
			});
		});
	})
);

// FACEBOOK STRATEGY
const facebookStrategy = new FacebookStrategy(
	{
		scope: "public_profile",
		clientID: process.env.FACEBOOK_ID,
		clientSecret: process.env.FACEBOOK_SECRET,
		callbackURL: `${CALLBACK}/facebook/return`,
		profileFields: ['id', 'displayName'],
		enableProof: true
	},
	((accessToken, refreshToken, profile, done) => {
		FacebookUser.findOne({ userID: profile.id }, (err, user) => {
			if (err) { return done(err, false); }
			if (user) { return done(null, user); }


			return FacebookUser.create({ userID: profile.id, displayName: profile.displayName }, (errF, userF) => {
				if (errF) return done(errF, false);
				return done(null, userF);
			});
		});
	})
);


passport.use(jwtLogin);
passport.use(localLogin);
passport.use(gitHubStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
