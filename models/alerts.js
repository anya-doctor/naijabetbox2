'use strict';
var mongoose = require('../models/db');

var schema = mongoose.Schema({
   message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ["unseen", "seen"],
        default: "unseen"
    },
    err: {
        type: Object
    }
});

var Alert = module.exports = mongoose.model("Alert", schema);

module.exports.createAlert = function (alert, callback) {
    alert.save(callback);
}
module.exports.getAlert = function (callback) {
    Alert.find({status: "unseen" }, callback);
};

module.exports.updateAlert = function (id, status, callback) {
    Alert.findOneAndUpdate({ _id: id }, { $set: { status: status } }, callback);
};