"use strict";

const { GoingUsersSchema } = require("../models/GoingUsers");
const { LocalUser, GitHubUser, FacebookUser, GoogleUser } = require("../../auth/models/users");
const createHash = require("./modules/_createHash").default;
const getClientIp = require("./modules/getIp").default;

exports.getCityBarUsers = function (city) {
	return GoingUsersSchema.find({city: city.toLowerCase()}, {"_id": 0, "bar": 1}, function(err, results) {
		if (err) { return err; }

		return results || [];
	});
};

exports.getLocation = function(type, data) {
	switch (`${type}_auth`) {
		case LocalUser.collection.collectionName:
			return LocalUser.findById(data._id);

		case GitHubUser.collection.collectionName:
			return GitHubUser.findById(data._id);

		case FacebookUser.collection.collectionName:
			return FacebookUser.findById(data._id);

		case GoogleUser.collection.collectionName:
			return GoogleUser.findById(data._id);

		default:
			return new Promise();
	}
}

exports.saveLastLocation = function(req, res, next, type, data) {
	const location = req.body.location.trim() || "";
	switch (`${type}_auth`) {
		case LocalUser.collection.collectionName:
			LocalUser.findById(data._id, (err, user) => {
				if (err) { return next(err); }

				user.lastSrcLocation = location;
				user.save(function (err) {
					if (err) { return next(err); }
				});
			});
			break;
		case GitHubUser.collection.collectionName:
			GitHubUser.findById(data._id, (err, user) => {
				if (err) { return next(err); }

				user.lastSrcLocation = location;
				user.save(function (err) {
					if (err) { return next(err); }
				});
			});
			break;
		case FacebookUser.collection.collectionName:
			FacebookUser.findById(data._id, (err, user) => {
				if (err) { return next(err); }

				user.lastSrcLocation = location;
				user.save(function (err) {
					if (err) { return next(err); }
				});
			});
			break;
		case GoogleUser.collection.collectionName:
			GoogleUser.findById(data._id, (err, user) => {
				if (err) { return next(err); }

				user.lastSrcLocation = location;
				user.save(function (err) {
					if (err) { return next(err); }
				});
			});
			break;
		default:
			return res.status(400).send({error: "No last location"});
	}
}

exports.addGoingUsers = function (req, res, next, data) {

	GoingUsersSchema.findOne({ 'bar.id': data.id }, function(err, result) {
		if (err) { return res.status(400).send(err); }

		// IF BAR exists
		if (result) {
			// if USER exist in bar array - return unchanged, else add and save
			if (result.bar.users.indexOf(data.user) > -1) {
				return res.status(200).send({ users: result.bar.users.slice(), id: data.id });
			} else {
				result.bar.users = result.bar.users.slice().concat(data.user);
				result.save(function (err) {
					if (err) { return res.status(400).send(err); }

					return res.status(200).send({ users: result.bar.users, id: data.id });
				});
			}
		} else {
			// IF BAR NOT exists - make and save new bar
			const newBar = new GoingUsersSchema({
				city: data.city,
				bar: {
					id: data.id,
					users: [data.user]
				}
			});
			newBar.save(function (err) {
				if (err) { return res.status(400).send(err); }

				return res.status(200).send({ users: newBar.bar.users.slice(), id: data.id });
			})
		}
	})
	.catch(err => res.status(400).send(err));
};

exports.removeGoingUsers = function (req, res, next, data) {

	GoingUsersSchema.findOne({ "bar.id": data.id }, function(err, result) {
		if (err) { return err; }

		// if BAR exists
		if (result) {
			// if USER exist - remove them and save, else return same array
			let idx = null;
			if ((idx = result.bar.users.indexOf(data.user)) > -1) {
				result.bar.users = result.bar.users.slice(0, idx).concat(result.bar.users.slice(idx + 1));
				result.save(function (err) {
					if (err) { return res.status(402).send(err); }

					return res.status(200).send({ users: result.bar.users.slice(0), id: data.id });
				});
				return;
			} else {
				return res.status(200).send({ users: [], id: "" });
			}
		}
		// IF BAR NOT exists
		return res.status(200).send({ users: [], id: "" });
	});
};
