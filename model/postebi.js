const mongoose = require('mongoose');

// posts Schema
var Posts = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

var Posts = module.exports = mongoose.model("Posts", Posts);
