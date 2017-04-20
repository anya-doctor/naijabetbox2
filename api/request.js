"use strict"
var express = require("express");
var router = express.Router(),
User = require('../models/user-schema'),
FundRequest = require('../models/fund_request'),
BookingRequest = require('../models/booking_request'),
WithdrawalRequest = require('../models/withdraw_request'),
RechargeRequest = require('../models/recharge_request'),
BuyDataRequest = require('../models/buy_data'),
TvRequest = require('../models/pay_for_tv'),
Alert = require('../models/request_alert');

router.post("/booking",function(req,res){
    //get form values
    var fullname = req.body.request.fullname.toLowerCase(),
    phone = req.body.request.mobile,
    bet_company = req.body.request.bet_company.toLowerCase(),
    code = req.body.request.code,
    amount  = req.body.request.amount,
    user = req.body.user;

         var total = bet_company === 'nairabet' ? user.balance : user.total_balance,
        username = user.username,balance = user.balance,bonus = user.bonus;
        if(total < amount){
            res.json({msg:'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet'});
       }else{
              var balance = amount > balance ? 0 : (balance - amount),
              total = amount > balance ? total - amount : (bonus + balance),
              bonus = amount > balance ? total - balance : bonus,
              withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025,
              updateParams = {
                balance:balance,
                total_balance:total,
                bonus:bonus,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new BookingRequest();
                            request.username = username;
                            request.fullname = fullname;
                            request.phone = phone;
                            request.code = code;
                            request.betting_company = bet_company;
                            request.amount = amount;
                             BookingRequest.createBookingRequest(request,function(err,bookingRequest){
                                if(err){
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Booking";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
            }
});

router.post("/fund_bet",function(req,res){
    //get form values
    var fullname = req.body.request.username.toLowerCase(),
    bet_company = req.body.request.bet_company.toLowerCase(),
    amount  = req.body.request.amount,
    user = req.body.user;

         var total = bet_company === 'nairabet' ? user.balance : user.total_balance,
        username = user.username,balance = user.balance,bonus = user.bonus;
        if(total < amount){
            res.json({msg:'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet'});
       }else{
              var balance = amount > balance ? 0 : (balance - amount),
              total = amount > balance ? total - amount : (bonus + balance),
              bonus = amount > balance ? total - balance : bonus,
              withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025,
              updateParams = {
                balance:balance,
                total_balance:total,
                bonus:bonus,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new FundRequest();
                            request.username = username;
                            request.betting_company = bet_company;
                            request.amount = amount;
                             FundRequest.createFundRequest(request,function(err,fundRequest){
                                if(err){
                                  res.json(err);
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Fund bet";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
            }
});

router.post("/transfer",function(req,res){
  //get form values
  var firstname = req.body.request.firstname.toLowerCase(),
  surname = req.body.request.surname.toLowerCase(),
  bank = req.body.request.bank.toLowerCase(),
  account_number = req.body.request.account_number,
    amount  = req.body.request.amount,
    _user = req.body.user;
  
    var balance = _user.balance,
    withdrawableBalance = _user.withdrawable_balance,
    username = _user.username,bonus = _user.bonus,total;
    if(withdrawableBalance < amount){
     res.json({msg:'Insuficient balance.Please credit your account!!'});
    }else{
      balance = withdrawableBalance - amount;
      total = balance + bonus;
      withdrawableBalance = balance - (balance * 0.025);
      var updateParams = {
        balance:balance,
        total_balance:total,
        withdrawable_balance:withdrawableBalance
      };
      User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new WithdrawalRequest();
                            request.firstname = firstname;
                            request.surname = surname;
                            request.account_number = account_number;
                            request.bank = bank;
                            request.amount = amount;
                             WithdrawalRequest.createWithdrawRequest(request,function(err,withdrawalRequest){
                                if(err){
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Transfer";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
  }
});

router.post("/recharge",function(req,res){
   //get form values
   var network = req.body.request.network,
   phone_number = req.body.request.phone_number,
   amount = req.body.request.amount,
   _user = req.body.user;
   
    var balance = _user.balance,
        username = _user.username,bonus = _user.bonus,total,withdrawableBalance;
        if(balance < amount){
            res.res({msg:'Insuficient balance!!'});
       }else{
              balance -= amount;
              total = balance + bonus;
              withdrawableBalance = balance - balance * 0.025;
              var updateParams = {
                balance:balance,
                total_balance:total,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new RechargeRequest();
                            request.network = network;
                            request.username = username;
                            request.phone_number = phone_number;
                            request.amount = amount;
                             RechargeRequest.createRechargeRequest(request,function(err,rechargeRequest){
                                if(err){
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Recharge";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
            }
});

router.post("/buy_data",function(req,res){
   //get form values
   var network = req.body.request.network.toLowerCase(),
   phone = req.body.request.phone,
   bundle = req.body.request.bundle,
   amount = req.body.request.price,
   _user = req.body.user;
   
    var balance = _user.balance,
        username = _user.username,bonus = _user.bonus,total,withdrawableBalance;
        if(balance < amount){
           res.locals.user = _user;
            res.json({msg:'Insuficient balance!!'});
       }else{
              balance -= amount;
              total = balance + bonus;
              withdrawableBalance = balance - balance * 0.025;
              var updateParams = {
                balance:balance,
                total_balance:total,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new BuyDataRequest();
                            request.network = network;
                            request.username = username;
                            request.phone_number = phone;
                            request.amount = amount;
                            request.bundle = bundle;
                             BuyDataRequest.createBuyDataRequest(request,function(err,rechargeRequest){
                                if(err){
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Buy Data";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
          }
});

router.post('/pay',function(req,res){
   //get form values
   console.log(req.body.request);
   var tv = req.body.request.tv.toLowerCase(),
   phone = req.body.request.phone_number,
   card_number = req.body.request.card_number,
   banquet = req.body.request.banquet,
   amount = req.body.request.price,
   _user = req.body.user;
   
    var balance = _user.balance,
        username = _user.username,bonus = _user.bonus,total,withdrawableBalance;
        if(balance < amount){
            res.json({msg:'Insuficient balance!!.Please credit your account and try again'});
       }else{
              balance -= amount;
              total = balance + bonus;
              withdrawableBalance = balance - balance * 0.025;
              var updateParams = {
                balance:balance,
                total_balance:total,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err,result){
                       if(err){
                        res.json(err);
                       }else{
                            User.checkUsername(username,function(err,user){
                            var request = new TvRequest();
                            request.tv = tv;
                            request.username = username;
                            request.phone_number = phone;
                            request.banquet = banquet;
                            request.card_number = card_number;
                            request.amount = amount;
                             TvRequest.createTvRequest(request,function(err,rechargeRequest){
                                if(err){
                                  console.log(err);
                                  res.json({msg:'Something bad happened'});
                                } else {
                                    var alert = new Alert();
                                    alert.request = "Tv";
                                    alert.username = username;
                                    Alert.createAlert(alert, function (err, alert) {

                                    });
                                 res.json(user);
                                }
                            });
                          });
                        }
            });
          }
 });

module.exports = router;