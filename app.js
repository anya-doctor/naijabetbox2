var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var user = require("./api/user"),
request = require("./api/request");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);
app.use("/user", user);
app.use("/request", request);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


///// <reference path="models/mongoose.js" />
//var express = require("express");
//var path = require("path");
//var bodyParser = require("body-parser");

//var app = express();
//app.use(express.static(__dirname + "/public"));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));


//var user = require("./api/user"),
//request = require("./api/request");


//app.use("/user", user);
//app.use("/request", request);

//// error handler
//app.use(function (err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};

//    console.log(err);
//    // render the error page
//    //res.status(err.status || 500);
//    //res.render('error');
//});

//var server = app.listen(process.env.PORT || 8080, function () {
//        var port = server.address().port;
//        console.log("App now running on port", port);
//    });
