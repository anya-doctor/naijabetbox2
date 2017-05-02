"use strict"
var express = require("express");
var router = express.Router(),
User = require('../models/user-schema'),
FundRequest = require('../models/fund_request'),
BookingRequest = require('../models/booking_request'),
WithdrawalRequest = require('../models/withdraw_request'),
RechargeRequest = require('../models/recharge_request'),
BuyDataRequest = require('../models/buy_data'),
Message = require('../models/messages'),
Alert = require('../models/alerts'),
TvRequest = require('../models/pay_for_tv');

router.post("/booking", function (req, res) {
    //get form values
    var fullname = req.body.request.fullname,
    phone = req.body.request.mobile,
    bet_company = req.body.request.bet_company,
    code = req.body.request.code,
    amount = req.body.request.amount,
    user = req.body.user;

    var username = user.username, balance = user.balance, bonus = user.bonus, total = user.total_balance, withdrawable_balance;
    if (isNaN(balance)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (balance < amount) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    } else {
        var balance = balance - amount,
        total = bonus + balance,
        withdrawableBalance = balance - balance * 0.025,
        updateParams = {
            balance: balance,
            total_balance: total,
            bonus: bonus,
            withdrawable_balance: withdrawableBalance
        };
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at booking request before line 39";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new BookingRequest();
                    request.username = username;
                    request.fullname = fullname;
                    request.phone = phone;
                    request.code = code;
                    request.betting_company = bet_company;
                    request.amount = amount;
                    BookingRequest.createBookingRequest(request, function (err, bookingRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at booking request before line 56";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({ user: user });
                        }
                    });
                });
            }
        });
    }
});

router.post("/update_booking", function (req, res) {
    BookingRequest.updateABookingRequest(req.body.id,
      req.body.done, function (err, booking) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update booking before line 79";
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
                      alert.message = "An error occurred at update booking before line 91";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.post("/update_fundbet", function (req, res) {
    FundRequest.updateAFundRequest(req.body.id,
      req.body.done, function (err, booking) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update fundbet before line 108";
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
                      alert.message = "An error occurred at update fundbet before line 120";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.post("/update_transfer", function (req, res) {
    WithdrawalRequest.updateAWithdrawalRequest(req.body.id,
      req.body.done, function (err, booking) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update transfer before line 137";
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
                      alert.message = "An error occurred at update transfer before line 149";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.post("/update_recharge", function (req, res) {
    RechargeRequest.updateARechargeRequest(req.body.id,
      req.body.done, function (err, booking) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update recharge before line 166";
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
                      alert.message = "An error occurred at update recharge before line 178";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.post("/update_data", function (req, res) {
    BuyDataRequest.updateABuyDataRequest(req.body.id,
      req.body.done, function (err, booking) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update fundbet before line 195";
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
                      alert.message = "An error occurred at update fundbet before line 207";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.post("/update_tv", function (req, res) {
    TvRequest.updateATvRequest(req.body.id,
      req.body.done, function (err, tv) {
          if (err) {
              var alert = new Alert();
              alert.message = "An error occurred at update fundbet before line 224";
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
                      alert.message = "An error occurred at update fundbet before line 236";
                      alert.err = err;
                      Alert.createAlert(alert, function (err, alert) {
                      });
                      res.json({ msg: 'Something bad happened,please try again or contact the admin' });
                  }
              });
              res.json({ msg: "success" });
          }
      })
});

router.get("/booking", function (req, res) {
    BookingRequest.getAllBookingRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get booking before line 252";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ bookings: request });
        }
    })
});

router.get("/fund_bet", function (req, res) {
    FundRequest.getAllFundRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get fundbet before line 267";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ fundbet: request });
        }
    })
});

router.get("/recharge", function (req, res) {
    RechargeRequest.getAllRechargeRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get recharge before line 282";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ recharge: request });
        }
    })
});

router.get("/data", function (req, res) {
    BuyDataRequest.getAllBuyDataRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get data before line 297";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ data: request });
        }
    })
});

router.get("/tv", function (req, res) {
    TvRequest.getAllTvRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get tv before line 312";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ tv: request });
        }
    })
});

router.get("/transfer", function (req, res) {
    WithdrawalRequest.getAllWithdrawRequest(function (err, request) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get transfer before line 327";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ transfer: request });
        }
    })
});

router.get("/count_of_booking", function (req, res) {
    BookingRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of booking before line 342";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
});

router.get("/count_of_recharge", function (req, res) {
    RechargeRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of recharge before line 357";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
});
router.get("/count_of_fund", function (req, res) {
    FundRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of fundbet before line 371";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
});
router.get("/count_of_data", function (req, res) {
    BuyDataRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of data before line 385";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
});
router.get("/count_of_transfer", function (req, res) {
    WithdrawalRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of transfer before line 399";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
})

router.get("/count_of_tv", function (req, res) {
    TvRequest.getCount(function (err, count) {
        if (err) {
            var alert = new Alert();
            alert.message = "An error occurred at get count of tv before line 414";
            alert.err = err;
            Alert.createAlert(alert, function (err, alert) {
            });
            res.json({ msg: 'Something bad happened,please try again or contact the admin' });
        } else {
            res.json({ count: count });
        }
    })
})

router.post("/fund_bet", function (req, res) {
    //get form values
    var bet_username = req.body.request.bet_username.toLowerCase(),
        customer_id = req.body.request.customer_id,
    bet_company = req.body.request.bet_company.toLowerCase(),
    amount = req.body.request.amount,
    user = req.body.user;
    var isNairabet = bet_company === 'nairabet';
    var check = isNairabet ? user.total_balance : (user.balance - 100),
    username = user.username, balance = user.balance, bonus = user.bonus, total = user.total_balance, withdrawableBalance = user.withdrawable_balance;
    if (isNaN(check)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (check < amount) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    } else {
        var updateParams = {};
        if (isNairabet) {
            total = total - amount,
        balance = amount > balance ? 0 : (total - bonus),
        bonus = amount > balance ? total : (total - balance),
        withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025;
            updateParams = {
                balance: balance,
                total_balance: total,
                bonus: bonus,
                withdrawable_balance: withdrawableBalance
            };
        } else {
            balance = balance - (amount + 100),
       total = balance + bonus,
       withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025;
            updateParams = {
                balance: balance,
                total_balance: total,
                bonus: bonus,
                withdrawable_balance: withdrawableBalance
            };
        }
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at fundbet request before line 478";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new FundRequest();
                    request.username = username;
                    request.bet_username = bet_username;
                    request.customer_id = customer_id;
                    request.betting_company = bet_company;
                    request.amount = amount;
                    FundRequest.createFundRequest(request, function (err, fundRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at fundbet request before line 494";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({user:user});
                        }
                    });
                });
            }
        });
    }
});

router.post("/transfer", function (req, res) {
    //get form values
    var firstname = req.body.request.firstname.toLowerCase(),
    surname = req.body.request.surname.toLowerCase(),
    bank = req.body.request.bank.toLowerCase(),
    account_number = req.body.request.account_number,
      amount = req.body.request.amount,
      _user = req.body.user;

    var balance = _user.balance,
    withdrawableBalance = _user.withdrawable_balance,
    username = _user.username, bonus = _user.bonus, total;
    if (isNaN(withdrawableBalance)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (withdrawableBalance < amount) {
        res.json({ msg: 'Insuficient balance.Please credit your account!!' });
    } else {
        balance = withdrawableBalance - amount;
        total = balance + bonus;
        withdrawableBalance = balance - (balance * 0.025);
        var updateParams = {
            balance: balance,
            total_balance: total,
            withdrawable_balance: withdrawableBalance
        };
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at transfer request before line 535";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new WithdrawalRequest();
                    request.firstname = firstname;
                    request.surname = surname;
                    request.username = username;
                    request.account_number = account_number;
                    request.bank = bank;
                    request.amount = amount;
                    WithdrawalRequest.createWithdrawRequest(request, function (err, withdrawalRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at transfer request before line 552";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({ user: user });
                        }
                    });
                });
            }
        });
    }
});

router.post("/recharge", function (req, res) {
    //get form values
    var network = req.body.request.network,
    phone_number = req.body.request.phone_number,
    amount = req.body.request.amount,
    _user = req.body.user;

    var balance = _user.balance,
        username = _user.username, bonus = _user.bonus, total = _user.total_balance, withdrawableBalance;
    if (isNaN(total)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (total < amount) {
        res.res({ msg: 'Insuficient balance!!' });
    } else {
        var updateParams = {};
        total = total - amount,
       balance = amount > balance ? 0 : (total - bonus),
       bonus = amount > balance ? total : (total - balance),
       withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025;
        updateParams = {
            balance: balance,
            total_balance: total,
            bonus: bonus,
            withdrawable_balance: withdrawableBalance
        };
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at recharge request before line 593";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new RechargeRequest();
                    request.network = network;
                    request.username = username;
                    request.phone_number = phone_number;
                    request.amount = amount;
                    RechargeRequest.createRechargeRequest(request, function (err, rechargeRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at recharge request before line 608";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({user:user});
                        }
                    });
                });
            }
        });
    }
});

router.post("/buy_data", function (req, res) {
    //get form values
    var network = req.body.request.network.toLowerCase(),
    phone = req.body.request.phone,
    bundle = req.body.request.bundle,
    amount = req.body.request.price,
    _user = req.body.user;

    var balance = _user.balance,
        username = _user.username, bonus = _user.bonus, total, withdrawableBalance;
    if (isNaN(balance)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (balance < amount) {
        res.json({ msg: 'Insuficient balance!!' });
    } else {
        balance -= amount;
        total = balance + bonus;
        withdrawableBalance = balance - balance * 0.025;
        var updateParams = {
            balance: balance,
            total_balance: total,
            withdrawable_balance: withdrawableBalance
        };
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at buy data request before line 647";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new BuyDataRequest();
                    request.network = network;
                    request.username = username;
                    request.phone_number = phone;
                    request.amount = amount;
                    request.bundle = bundle;
                    BuyDataRequest.createBuyDataRequest(request, function (err, rechargeRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at buy data request before line 663";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({ user: user });
                        }
                    });
                });
            }
        });
    }
});

router.post('/pay', function (req, res) {
    //get form values
    var tv = req.body.request.tv.toLowerCase(),
    phone = req.body.request.phone_number,
    card_number = req.body.request.card_number,
    banquet = req.body.request.banquet,
    amount = req.body.request.price,
    _user = req.body.user;

    var balance = _user.balance,
        username = _user.username, bonus = _user.bonus, total = _user.total_balance, withdrawableBalance;
    if (isNaN(total)) {
        res.json({ msg: 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet' });
    }
    else if (total < amount) {
        res.json({ msg: 'Insuficient balance!!.Please credit your account and try again' });
    } else {
        var updateParams = {};
        total = total - amount,
       balance = amount > balance ? 0 : (total - bonus),
       bonus = amount > balance ? total : (total - balance),
       withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025;
        updateParams = {
            balance: balance,
            total_balance: total,
            bonus: bonus,
            withdrawable_balance: withdrawableBalance
        };
        User.updateAUser(username, updateParams, function (err, result) {
            if (err) {
                var alert = new Alert();
                alert.message = "An error occurred at tv request before line 706";
                alert.err = err;
                Alert.createAlert(alert, function (err, alert) {
                });
                res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
            } else {
                User.checkUsername(username, function (err, user) {
                    var request = new TvRequest();
                    request.tv = tv;
                    request.username = username;
                    request.phone_number = phone;
                    request.banquet = banquet;
                    request.card_number = card_number;
                    request.amount = amount;
                    TvRequest.createTvRequest(request, function (err, rechargeRequest) {
                        if (err) {
                            var alert = new Alert();
                            alert.message = "An error occurred at tv request before line 723";
                            alert.err = err;
                            Alert.createAlert(alert, function (err, alert) {
                            });
                            res.json({ msg: 'Something bad happened,it will be fixed in a moment,please try again or contact the admin' });
                        } else {
                            res.json({ user: user });
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;