var mongoose = require("mongoose");

var GlobalFlagSchema = new mongoose.Schema({
    weather: Boolean,
    tide: Boolean,
    sun: Boolean
});

module.exports = mongoose.model("GlobalFlag",GlobalFlagSchema);