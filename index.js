/// <reference path="models/mongoose.js" />
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user = require("./api/user"),
request = require("./api/request");


app.use("/user", user);
app.use("/request", request);

var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });

