const mongoose = require('mongoose');

// User Schema
var Posts = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var Posts = (module.exports = mongoose.model("User", Posts));
