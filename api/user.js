"use strict"
var express = require("express"),
router = express.Router(),
User = require("../models/user-schema"),
Message = require("../models/messages"),
Hash = require("../models/hash-password");


router.get("/getAllUsers",function(req,res){
    User.getAllUsers(function(err,users){
        if(err){
            res.json({err:err});
        }else{
            res.json({users:users});
        }
    })
});

router.get("/getMessages",function(req,res){
    Message.getMessageByUsername(req.query.username,function(err,msgs){
        if(err){
            res.json({err:err});
        }else{
            res.json({msgs:msgs});
        }
    })
})

router.post("/updateMessage",function(req,res){
    Message.updateAMessage(req.body.id,req.body.status,function(err,msg){
        if(err){
            console.log(err);
        }else{
            //console.log(msg);
            //res.json({msgs:msgs});
        }
    })
})

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
        reg_num : ++count
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

router.get("/get_user", function (req, res) {
    User.checkUsername(req.query.username, function (err, user) {
        if (err) {
            res.json({err:err});
        } else {
            res.json({user:user});
        }
    });
});

router.post("/login", function (req, res,next) {
    User.checkUsername(req.body.username, function (err, user) {
        if (err) {
            res.json({err:err});
        } else {
            if (user) {
                if (Hash.confirmPassword(user, req.body.password)) {
                    res.json({user:user});
                } else {
                    res.json({user:null});
                }
            } else {
                res.json({user:null});
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
});

router.post("/credit_account",function(req,res){
    var username = req.body.username,
    amount = req.body.amount;
    User.checkUsername(username,function(err,user){
    var balance = amount + user.balance,
    bonus = amount*0.03 + user.bonus;
        var updateParam = {
        balance:balance,
        bonus : bonus,
        total_balance:balance+bonus,
        withdrawable_balance : balance - balance*0.025
        };
        User.updateAUser(username,updateParam,function(err,user){
        if(err){
            res.json(err);
        }else{
            User.checkUsername(username, function (err, user) {
                if (err) {
                    res.json({err:err});
                } else {
                    if (user) {
                        res.json({user:user});
                    } 
                }
            });
        }
    });
    });
});

module.exports = router;