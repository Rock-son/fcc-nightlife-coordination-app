const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const { Schema } = mongoose;

// Define Model
const localSchema = new Schema({
	// unique String.toLowerCase() - so no doubles are possible
	username: { type: Schema.Types.String, unique: true, lowercase: true },
	password: String
});
const randomSchema = new Schema({
	userID: { type: Schema.Types.String, unique: true, lowercase: false },
	displayName: String
});


// On Save Hook, encrypt password with bcrypt
localSchema.pre("save", function a(next) {
	const user = this; // user is an instance of userSchema - a context (this)
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }

		bcrypt.hash(user.password, salt, null, (errB, hash) => {
			if (errB) { return next(errB); }

			user.password = hash;
			next(); // e.g. saves the model
		});
	});
});

localSchema.methods.comparePassword = function b(candidatePassword, callback) {
	const user = this;
	bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
		if (err) { return callback(err); }

		callback(null, isMatch);
	});
};


// Export Model
module.exports.LocalUser = mongoose.model("localUser", localSchema, "local_auth");
module.exports.GitHubUser = mongoose.model("gitHubUser", randomSchema, "github_auth");
module.exports.FacebookUser = mongoose.model("facebookUser", randomSchema, "facebook_auth");
module.exports.GoogleUser = mongoose.model("googleUser", randomSchema, "google_auth");
