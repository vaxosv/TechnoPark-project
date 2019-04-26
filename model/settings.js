const mongoose = require('mongoose');


var settings = mongoose.Schema({
    title: {
        type: Boolean,
        required: true
    }
});

var settings = module.exports = mongoose.model("settings", settings);
