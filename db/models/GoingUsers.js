"use strict";

const mongoose = require("mongoose");
const { Schema } = require("mongoose");


// DEFINE MODEL
const goingUsersSchema = new Schema({

	city: {
		type: String, required: true, trim: true, lowercase: true
	},
	bar: {
		id: {
			type: String, required: true, trim: true
		},
		users: [{
			type: String, trim: true
		}]
	},
	updatedUTC: { type: Date }
});

// UPDATE TIME
goingUsersSchema.pre("save", function a(next) {
	this.updatedUTC = Date.now();
	return next();
});

module.exports.GoingUsersSchema = mongoose.model("GoingUsersSchema", goingUsersSchema, "nightlife_going_users");
