"use strict";

const { GoingUsersSchema } = require("../models/GoingUsers");
const createHash = require("./modules/_createHash").default;
const getClientIp = require("./modules/getIp").default;

exports.getCityBarUsers = function (city) {

	return GoingUsersSchema.find({city: city}, {"_id": 0, "bar": 1}, function(err, doc) {
		if (err) { return err; }

		return doc || [];
	});
};

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