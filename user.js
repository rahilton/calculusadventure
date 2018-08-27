var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    player: Object,
    admin: Boolean,
    first: String,
    last: String
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",UserSchema);