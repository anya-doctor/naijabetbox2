angular.module("App").controller("DashboardController", ["$rootScope",
 "$scope", "$timeout",
    "$location", "$http", function ($rootScope, $scope, $timeout,
     $location, $http) {
        $scope.isUser = JSON.parse(sessionStorage.getItem("user")) !== null;
        function checkIfUser() {
            if ($scope.isUser) {
                $timeout(checkIfUser, 1000);
            }
            $scope.isUser = JSON.parse(sessionStorage.getItem("user")) !== null;
        }
        $timeout(checkIfUser, 1000);
        if (!$scope.isUser) {
            $rootScope.showNavbar = true;
            $location.path("/login");
        }


        $rootScope.title = "Dashboard";
        $rootScope.showNavBar = false;
        $scope.user = JSON.parse(sessionStorage.getItem("user"));
        $scope.users = $scope.user;
        $scope.username = $scope.user.username;
        $scope.formHolder = {};
        $scope.request = {};
        $scope.showWallet = true;

        function getAUser() {
            if ($scope.isUser) {
                $timeout(getAUser, 1000);
            }
            $http({
                url: "user/get_user",
                method: "get",
                params: { username: $scope.user.username }
            }).then(function (res) {
                if (res.data.user) {
                    $scope.user = res.data.user;
                } else {
                }
            });
        }
        $timeout(getAUser, 1000);

        function getMessages() {
            if ($scope.isUser) {
                $timeout(getMessages, 1000);
            }
            $http({
                url: "user/getMessages",
                method: "get",
                params: { username: $scope.user.username }
            }).then(function (res) {
                if (res.data.msgs) {
                    $scope.msgs = res.data.msgs;
                    $scope.count = res.data.msgs.length
                } else {
                }
            });
        }
        $timeout(getMessages, 1000);

        $scope.clearMsg = function (id) {
            $http({
                url: "user/updateMessage",
                method: "post",
                data: { id: id, status: "seen" }
            });
        }
        $scope.buyData = function () {
            if ($scope.formHolder.buyData.$valid) {
                var balance = $scope.user.balance;
                if (balance < $scope.request.price) {
                    $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
                } else {
                    if ($rootScope.connected) {
                        $scope.notConnected = false;
                        $("body").addClass("loading");
                        $http({
                            url: "/request/buy_data",
                            method: "post",
                            data: { "user": $scope.user, "request": $scope.request }
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.msg) {
                                $scope.errMsg = res.data.msg;
                                $scope.sucMsg = null;
                            } else if (res.data.user.username) {
                                $scope.user = res.data.user;
                                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                $scope.errMsg = null;
                                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                $timeout(function () {
                                    $scope.getWallet();
                                    $scope.request = {};
                                    $scope.sucMsg = null;
                                }, 1000);
                            } else {
                                $scope.errMsg = "An error occurred";
                                $scope.sucMsg = null;
                            }
                        });
                    } else {
                        $scope.notConnected = true;
                    }
                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }
        $scope.mtn = [
            { name: "Better Me Monthly", price: 2035.00 }
        ];
        $scope.airtel = [
            { name: "1.5Gb", price: 1015.00 },
            { name: "3.5Gb", price: 2030.00 },
            { name: "5Gb", price: 2530.00 },
            { name: "7Gb", price: 3550.00 },
            { name: "12Gb", price: 5080.00 },
            { name: "24Gb", price: 8120.00 },
        ];
       

        $scope.mytv = [
        { name: "MyTV Smart – 1 month banquet", price: 600.00 },
        { name: "MyTV Smart – 3 months banquet", price: 1550.00 },
        { name: " MyTV Smart – 6 months banquet ", price: 2900.00 },
        { name: "MyTV Smart – 12 months banquet", price: 5550.00 }
        ];
        $scope.irokotv = [
    { name: "Iroko banquet", price: 900.00 }
        ];
        $scope.daarsat = [
    { name: "Daarsat banquet", price: 5650.00 }
        ];
        $scope.dstv = [
                { name: "Access", price: 2000.00 },
                { name: "Access + HD/ExtraView ", price: 4200.00 },
                { name: "Family", price: 3800.00 },
                { name: "Mobile Maxi", price: 950.00 },
        ];

        $scope.gotv = [
            { name: "GOtv Lite Monthly", price: 500.00 },
            { name: "GOtv Value", price: 1350.00 },
            { name: "GOtv Plus", price: 2000.00 },
            { name: "GOtv Mobile Access", price: 750.00 }
        ];

        $scope.startimes = [
            { name: "Nova banquet", price: 1000.00 },
            { name: "Basic banquet", price: 1400.00 },
            { name: "Classic banquet", price: 2600.00 },
            { name: "Unique banquet", price: 3800 }
        ];

        $scope.tvChange = function () {
            switch ($scope.request.tv) {
                case "":
                    $scope.showDstv = false;
                    $scope.showBanquet = false;
                    $scope.showGotv = false;
                    $scope.showStartimes = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = false;
                    break;
                case "DSTV":
                    $scope.showDstv = true;
                    $scope.showBanquet = false;
                    $scope.showGotv = false;
                    $scope.showStartimes = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = false;
                    break;
                case "GoTv":
                    $scope.showGotv = true;
                    $scope.showDstv = false;
                    $scope.showBanquet = false;
                    $scope.showStartimes = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = false;
                    break;
                case "Startimes":
                    $scope.showStartimes = true;
                    $scope.showBanquet = false;
                    $scope.showDstv = false;
                    $scope.showGotv = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = false;
                    break;
                case "Mytv":
                    $scope.showStartimes = false;
                    $scope.showBanquet = false;
                    $scope.showDstv = false;
                    $scope.showGotv = false;
                    $scope.showMytv = true;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = false;
                    break;
                case "IrokoTv":
                    $scope.showStartimes = false;
                    $scope.showBanquet = false;
                    $scope.showDstv = false;
                    $scope.showGotv = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = true;
                    $scope.showDaarsattv = false;
                    break;
                case "DaarsatTv":
                    $scope.showStartimes = false;
                    $scope.showBanquet = false;
                    $scope.showDstv = false;
                    $scope.showGotv = false;
                    $scope.showMytv = false;
                    $scope.showIrokotv = false;
                    $scope.showDaarsattv = true;
                    break;
            }
        }
        $scope.dstvBanquetChange = function () {
            $scope.dstv.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }
        $scope.mytvBanquetChange = function () {
            $scope.mytv.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }
        $scope.irokotvBanquetChange = function () {
            $scope.irokotv.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }
        $scope.daarsatBanquetChange = function () {
            $scope.daarsat.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }
        $scope.gotvBanquetChange = function () {
            $scope.gotv.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }
        $scope.startimesBanquetChange = function () {
            $scope.startimes.forEach(function (e) {
                if (e.name === $scope.request.banquet) {
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
        }

        $scope.networkChange = function () {
            switch ($scope.request.network) {
                case "":
                    $scope.showMtn = false;
                    $scope.showBundle = false;
                    $scope.showAirtel = false;
                    $scope.showEtisalat = false;
                    break;
                case "MTN":
                    $scope.showMtn = true;
                    $scope.showBundle = false;
                    $scope.showAirtel = false;
                    $scope.showEtisalat = false;
                    break;
                case "Etisalat":
                    $scope.showEtisalat = true;
                    $scope.showMtn = false;
                    $scope.showBundle = false;
                    $scope.showAirtel = false;
                    break;
                case "Airtel":
                    $scope.showAirtel = true;
                    $scope.showBundle = false;
                    $scope.showMtn = false;
                    $scope.showEtisalat = false;
                    break;
            }
        }
        $scope.mtnBundleChange = function () {
            $scope.mtn.forEach(function (e) {
                if (e.name === $scope.request.bundle) {
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
        }
        $scope.etisalatBundleChange = function () {
            $scope.etisalat.forEach(function (e) {
                if (e.name === $scope.request.bundle) {
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
        }
        $scope.airtelBundleChange = function () {
            $scope.airtel.forEach(function (e) {
                if (e.name === $scope.request.bundle) {
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
        }

        $scope.pay = function () {
            if ($scope.formHolder.pay.$valid) {
                var total = $scope.user.total_balance;
                if (total < $scope.request.amount) {
                    $scope.errMsg = 'Insuficient balance!!';
                } else {
                    if ($rootScope.connected) {
                        $scope.notConnected = false;
                        $("body").addClass("loading");
                        $http({
                            url: "/request/pay",
                            method: "post",
                            data: { "user": $scope.user, "request": $scope.request }
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.msg) {
                                $scope.errMsg = res.data.msg;
                                $scope.sucMsg = null;
                            } else if (res.data.user.username) {
                                $scope.user = res.data.user;
                                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                $scope.errMsg = null;
                                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                $timeout(function () {
                                    $scope.getWallet();
                                    $scope.request = {};
                                    $scope.sucMsg = null;
                                }, 1000);
                            } else {
                            }
                        });
                    } else {
                            $scope.notConnected = true;
                    }
                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.buy = function () {
            if ($scope.formHolder.recharge.$valid) {
                var total = $scope.user.total_balance;
                if (total < $scope.request.amount) {
                    $scope.errMsg = 'Insuficient balance!!';
                } else {
                    if ($rootScope.connected) {
                        $scope.notConnected = false;
                        $("body").addClass("loading");
                        $http({
                            url: "/request/recharge",
                            method: "post",
                            data: { "user": $scope.user, "request": $scope.request }
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.msg) {
                                $scope.errMsg = res.data.msg;
                                $scope.sucMsg = null;
                            } else if (res.data.user.username) {
                                $scope.user = res.data.user;
                                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                $scope.errMsg = null;
                                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                $timeout(function () {
                                    $scope.getWallet();
                                    $scope.request = {};
                                    $scope.sucMsg = null;
                                }, 1000);
                            } else {
                            }
                        });
                    } else {
                            $scope.notConnected = true;
                    }
                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.book = function () {
            if ($scope.formHolder.booking.$valid) {
                var balance = $scope.user.balance;
                if (balance < $scope.request.amount) {
                    $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                } else {
                    if ($rootScope.connected) {
                        $scope.notConnected = false;
                        $("body").addClass("loading");
                        $http({
                            url: "/request/booking",
                            method: "post",
                            data: { "user": $scope.user, "request": $scope.request }
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.msg) {
                                $scope.errMsg = res.data.msg;
                                $scope.sucMsg = null;
                            } else if (res.data.user.username) {
                                $scope.user = res.data.user;
                                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                $scope.errMsg = null;
                                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                $timeout(function () {
                                    $scope.getWallet();
                                    $scope.request = {};
                                    $scope.sucMsg = null;
                                }, 1000);
                            } else {
                            }
                        });
                    } else {
                            $scope.notConnected = true;
                    }
                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.fundBet = function () {
            if ($scope.formHolder.fundBet.$valid) {
                $scope.errMsg = null;
                var bet_company = $scope.request.bet_company,
                    amount = $scope.request.amount,
                    total = $scope.user.total_balance,
                    balance = $scope.user.balance;
                switch (true) {
                    case bet_company == "nairabet" || bet_company == "winners golden bet":
                        if (total < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount <= 5000:
                        if ((balance - 100) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 5000 && amount <= 10000:
                        if ((balance - 150) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 10000 && amount <= 20000:
                        if ((balance - 200) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 20000 && amount <= 50000:
                        if ((balance - 250) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 50000 && amount <= 100000:
                        if ((balance - 300) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 100000:
                        if ((balance - 500) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nWe only give bonus for Nairabet and Winners Golden Bet';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/fund_bet",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);

                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;

                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.transfer = function () {
            if ($scope.formHolder.transferCash.$valid) {
                var balance = $scope.user.balance,
                    amount = $scope.request.amount;
                switch (true) {
                    case amount <= 5000:
                        if ((balance - 100) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 5000 && amount <= 10000:
                        if ((balance - 150) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 10000 && amount <= 20000:
                        if ((balance - 200) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 20000 && amount <= 50000:
                        if ((balance - 250) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 50000 && amount <= 100000:
                        if ((balance - 300) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;
                    case amount > 100000:
                        if ((balance - 500) < amount) {
                            $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.';
                        } else {
                            if ($rootScope.connected) {
                                $scope.notConnected = false;
                                $("body").addClass("loading");
                                $http({
                                    url: "/request/transfer",
                                    method: "post",
                                    data: { "user": $scope.user, "request": $scope.request }
                                }).then(function (res) {
                                    $("body").removeClass("loading");
                                    if (res.data.msg) {
                                        $scope.errMsg = res.data.msg;
                                        $scope.sucMsg = null;
                                    } else if (res.data.user.username) {
                                        $scope.user = res.data.user;
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                        $scope.errMsg = null;
                                        $scope.sucMsg = "Your request has been sent.It will be processed soon";
                                        $timeout(function () {
                                            $scope.getWallet();
                                            $scope.request = {};
                                            $scope.sucMsg = null;
                                        }, 1000);
                                    } else {
                                    }
                                });
                            } else {
                                $scope.notConnected = true;
                            }
                        }
                        break;

                }
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.getProfile = function () {
            $("body").addClass("loading");
            $scope.showUpdateMsg = false;
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showProfile = true;
            $scope.showEditUser = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;
        }
        $scope.getEditUser = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = true;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;
        }
        $scope.getWallet = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = true;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;
        }

        $scope.toggle = function () {
            $(".navbar-toggle").click(function (ev) {
                ev.preventDefault();
                $(".navbar-ex1-collapse").css({ "display": "inline" });
            });
        }
        $scope.getFundBet = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = true;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;

        
        }
        $scope.getWithdrawCash = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = true;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;

            $(".navbar-ex1-collapse").css({ "display": "none" });
        }
        $scope.getPayForTv = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = true;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;
            $(".navbar-ex1-collapse").css({ "display": "none" });
        }
        $scope.getBuyData = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = true;
            $scope.showBuyAirtime = false;
            $scope.showBooking = false;
            $(".navbar-ex1-collapse").css({ "display": "none" });
        }
        $scope.getBuyAirtime = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = true;
            $scope.showBooking = false;
            $(".navbar-ex1-collapse").css({ "display": "none" });
        }
        $scope.getBooking = function () {
            $("body").addClass("loading");
            $scope.errMsg = null;
            $scope.sucMsg = null;
            $scope.showEditUser = false;
            $scope.showProfile = false;
            $scope.showWallet = false;
            $scope.showFundBet = false;
            $scope.showWithdrawCash = false;
            $scope.showPayForTv = false;
            $scope.showBuyData = false;
            $scope.showBuyAirtime = false;
            $scope.showBooking = true;
            $(".navbar-ex1-collapse").css({ "display": "none" });
        }

        $scope.update = function () {
            if ($scope.formHolder.update.$valid) {
                if ($rootScope.connected) {
                    $scope.notConnected = false;
                    $scope.errMsg = null;
                    $("body").addClass("loading");
                    $http({
                        url: "/user/update-user",
                        method: "post",
                        data: { username: $scope.username, data: $scope.users }
                    }).then(function (res) {
                        $("body").removeClass("loading");
                        if (res.data._id) {
                            sessionStorage.setItem("user", JSON.stringify(res.data));
                            $scope.showUpdateMsg = true;
                            $timeout(function () {
                                $scope.getProfile();
                            }, 1000);
                        }
                    });
                }else{
                        $scope.notConnected = true;}
            } else {
                $scope.errMsg = "Please fill in all the required details in the right format";
            }
        }

        $scope.logout = function () {
            sessionStorage.removeItem("user");
            $location.path("/");

        }
    }])