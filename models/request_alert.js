'use strict';
var mongoose = require('../models/db');

var schema = mongoose.Schema({
    request: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:new Date()
    },
    status: {
        type: String,
        enum: ["unseen", "seen", "done"],
        default:"unseen"
    },
    seen_date: {
        type: Date
    }
});

var Alert = module.exports = mongoose.model("RequestAlert", schema);
module.exports.createAlert = function (alert,callback) {
    alert.save(callback);
}
module.exports.getAllAlert = function (query, callback) {
    Alert.find(query,callback);
}
module.exports.updateAlert = function (query, callback) {
    Alert.findOneAndUpdate(query, callback);
}