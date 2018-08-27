var mongoose = require("mongoose");

var AccountKeySchema = new mongoose.Schema({
    key: String,
    first: String,
    last: String,
    used: Boolean,
    admin: Boolean
});

module.exports = mongoose.model("AccountKey",AccountKeySchema);