const db = require("./db");

module.exports.handleSignup = (email, password) => {
    // Check if the email already exists
    db.saveUser({ email, password });
    // Save user to db
    // send the welcome email
}