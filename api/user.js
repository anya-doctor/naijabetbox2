"use strict"
var express = require("express"),
router = express.Router(),
User = require("../models/user-schema"),
Message = require("../models/messages"),
Alert = require("../models/alerts"),
Hash = require("../models/hash-password");



router.get("/getAllUsers",function(req,res){
    User.getAllUsers(function(err,users){
        if(err){
            var alert = new Alert();
            alert.message = "An error occurred at get users before line 15";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        }else{
            res.json({users:users});
        }
    })
});

router.get("/getMessages",function(req,res){
    Message.getMessageByUsername(req.query.username,function(err,msgs){
        if(err){
            var alert = new Alert();
            alert.message = "An error occurred at get messages before line 30";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        }else{
            res.json({msgs:msgs});
        }
    })
})

router.post("/updateMessage",function(req,res){
    Message.updateAMessage(req.body.id,req.body.status,function(err,msg){
        if(err){
            var alert = new Alert();
            alert.message = "An error occurred at update message before line 45";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        }
    })
})

router.get("/getAlerts", function (req, res) {
    Alert.getAlert(function (err, alerts) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get alerts before line 58";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ alerts: alerts });
        }
    })
});

router.post("/updateAlert", function (req, res) {
    Alert.updateAlert(req.body.id, req.body.status, function (err, msg) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at update alert before line 73";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
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
            var alert = new Alert();
            alert.message = "An error occurred at register before line 98";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ user: user });
        }
    });
    });
});

router.get("/check_username", function (req, res) {
    User.checkUsername(req.query.username, function (err, user) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at check username before line 114";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
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
            var alert = new Alert();
            alert.message = "An error occurred at get user before line 134";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({user:user});
        }
    });
});

router.post("/login", function (req, res,next) {
    User.checkUsername(req.body.username, function (err, user) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at login before line 149";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            if (user) {
                if (Hash.confirmPassword(user, req.body.password)) {
                    res.json({user:user});
                } else {
                    res.json({ user: null });
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
            var alert = new Alert();
            alert.message = "An error occurred at get update userbefore line 182";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        }else{
            User.checkUsername(updateParam.username, function (err, user) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at update user before line 191";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
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
    var username = req.body.creditDetails.username,
    amount = req.body.creditDetails.amount;
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
            var alert = new Alert();
            alert.message = "An error occurred at credit account before line 221";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            var msg = new Message();
            msg.username = req.body.message.username;
            msg.message = req.body.message.msg;
            Message.createMessage(msg, function (err, msg) {
                if (err) {
                    var alert = new Alert();
                    alert.message = "An error occurred at credit account  before line 233";
                    alert.err = err;
                    Alert.createAlert(alert, function (err, alert) {
                    });
                    res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                }
            });
            User.checkUsername(username, function (err, user) {
                if (err) {
                    var alert = new Alert();
                    alert.message = "An error occurred at credit account before line 243";
                    alert.err = err;
                    Alert.createAlert(alert, function (err, alert) {
                    });
                    res.json({ msg: 'Something bad happened,please try again or contact the admin' });
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