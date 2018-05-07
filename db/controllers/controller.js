"use strict";

const { GoingUsersSchema } = require("../models/GoingUsers");
const createHash = require("./modules/_createHash").default;
const getClientIp = require("./modules/getIp").default;

exports.getCityBarUsers = function (city) {


exports.getLocation = function(req, res, next, type, data) {
	switch (`${type}_auth`) {
		case LocalUser.collection.collectionName:
			LocalUser.findById(data._id, (err, user) => {
				if (err) { return res.status(400).send(err); }
				if (user) { return res.send({city: user.lastSrcLocation}); }
			});
			break;
		case GitHubUser.collection.collectionName:
			GitHubUser.findById(data._id, (err, user) => {
				if (err) { return res.status(400).send(err); }
				if (user) { return res.send({city: user.lastSrcLocation}); }
			});
			break;
		case FacebookUser.collection.collectionName:
			FacebookUser.findById(data._id, (err, user) => {
				if (err) { return res.status(400).send(err); }
				if (user) { return res.send({city: user.lastSrcLocation}); }
			});
			break;
		case GoogleUser.collection.collectionName:
			GoogleUser.findById(data._id, (err, user) => {
				if (err) { return res.status(400).send(err); }
				if (user) { return res.send({city: user.lastSrcLocation}); }
			});
			break;
		default:
			return res.status(400).send({city: ""});
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

	GoingUsersSchema.findOne({ 'bar.id': data.id }, function(err, doc) {
		if (err) { return res.status(400).send(err); }

		// IF BAR exists
		if (doc) {
			// if USER exist - return unchanged, else add and save
			if (doc.bar.users.indexOf(data.user) > -1) {
				return res.status(200).send({ users: doc.bar.users.slice(), id: data.id });
			} else {
				doc.bar.users = doc.bar.users.slice().concat(data.user);
				doc.save(function (err) {
					if (err) { return res.status(400).send(err); }

					return res.status(200).send({ users: doc.bar.users, id: data.id });
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

	GoingUsersSchema.findOne({ "bar.id": data.id }, function(err, doc) {
		if (err) { return err; }

		// if BAR exists
		if (doc) {
			// if USER exist - remove them and save, else return same array
			let idx = null;
			if ((idx = doc.bar.users.indexOf(data.user)) > -1) {
				doc.bar.users = doc.bar.users.slice(0, idx).concat(doc.bar.users.slice(idx + 1));
				doc.save(function (err) {
					if (err) { return res.status(402).send(err); }

					return res.status(200).send({ users: doc.bar.users.slice(0), id: data.id });
				});
			} else {
				return doc.bar.users.slice();
			}
		}
		// IF BAR NOT exists
		return [];
	});
};