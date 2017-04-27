'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/naijabetbox2');
//mongoose.connect('mongodb://titile1987:titile1987@ds035826.mlab.com:35826/naijabetbox');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
module.exports = mongoose;