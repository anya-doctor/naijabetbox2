"use strict"
var express = require("express");
var router = express.Router();
var User = require("../models/user-schema");
var Hash = require("../models/hash-password");

router.post("/register", function (req, res) {
    User.countOfUsers(function (err, count) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        mobile: req.body.mobile,
        alt_mobile: req.body.altMobile,
        email: req.body.email,
        username: req.body.username,
        password: Hash.saltHashPassword(req.body.password),
        reg_num : count++
    });
    User.createUser(user, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
    });
});

router.get("/check_username", function (req, res) {
    User.checkUsername(req.query.username, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            if (user) {
                res.json({ "userAlreadyExist": true });
            } else {
                res.json({ "userAlreadyExist": false });
            }

        }
    });
});

router.post("/login", function (req, res) {
    User.checkUsername(req.body.username, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            if (user) {
                if (Hash.confirmPassword(user, req.body.password)) {
                    res.json(user);
                } else {
                    res.json(null);
                }
            } else {
                res.json(null);
            }

        }
    });
});
router.post("/update-user",function(req,res,next){
    var username = req.body.username,
    updateParam = {
        firstname:req.body.data.firstname,
        lastname : req.body.data.lastname,
        username:req.body.data.username,
        email : req.body.data.email,
        gender:req.body.data.gender,
        mobile : req.body.data.mobile,
        alt_mobile:req.body.data.alt_mobile
    };
    User.updateAUser(username,updateParam,function(err,user){
        if(err){
            res.json(err);
        }else{
            User.checkUsername(updateParam.username, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            if (user) {
                res.json(user);
            } 
        }
    });
        }
    });
})

module.exports = router;