const mongoose = require("mongoose"),
      validator = require("validator"),
      

    localSchema = new Schema({    
        email: {
            type: String,
            require: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: validator.isEmail,   // same as "(val) => validator.isEmail(val)"
                message: "{VALUE} is not a valid email!"
            }
        },
        password: {
            type: String,
            require: true,
            minlength: 5
        },
        tokens: [{
            access: {
                type: String,
                require: true
            },
            token: {
                type: String,
                require: true
            }
        }]
    });



module.exports.LocalUser = mongoose.model("localUser", localSchema , "local_auth_nightlife");