angular.module("App").controller("DashboardController", ["$rootScope",
 "$scope","$timeout",
    "$location","$http", function ($rootScope, $scope,$timeout,
     $location,$http) {
        if (sessionStorage.getItem("user") == null) {
            $rootScope.showNavbar = true;
            $location.path("/login");
        }
    $rootScope.title = "Dashboard";
    $rootScope.showNavBar = false;
    $scope.user = JSON.parse(sessionStorage.getItem("user"));
    $scope.username = $scope.user.username;
    $scope.formHolder = {};
    $scope.request = {};

    $scope.buyData = function(){
        if($scope.formHolder.buyData.$valid){
            var balance = $scope.user.balance;
            if(balance < $scope.request.price){
                $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }else{
                $http({
                url:"/request/buy_data",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format";
        }
    }
    $scope.mtn = [
        {name :"Better Me Daily",price:25.00},
        {name :"Better Me Monthly",price:2035.00},
        {name :"Data 30mb",price:100.00},
        {name :"Data 100mb",price:200.00},
        {name :"Data 750mb",price:510.00},
        {name :"Data 1.5Gb",price:1015.00},
        {name :"Data 3.5Gb",price: 2030.00},
        {name :"Data 10Gb",price:5060.00},
        {name :"Data 22Gb",price:10100.00},
        {name :"XtraVoice 7Days@N300",price:300.00},
        {name :"XtraVoice 7Days@N510",price:510.00},
        {name :"XtraVoice 14Days",price:1015.00},
        {name :"XtraData 30Days@N2030",price:2030.00},
        {name :"XtraData 30Days@N5060",price:5060.00}
    ];
    $scope.airtel = [
        {name:"1.5Gb",price:1015.00},
        {name:"3.5Gb",price:2030.00},
        {name:"5Gb",price:2530.00},
        {name:"7Gb",price:3550.00},
        {name:"12Gb",price:5080.00},
        {name:"24Gb",price:8120.00},
    ];
    $scope.etisalat = [
        {name:"50Mb validity period of a day",price:100.00},
        {name:"10Mb validity period of a day",price:50.00},
        {name:"200Mb Validity period of 7 days ",price:200.00},
        {name:"500Mb validity period of 30 days",price:510.00},
        {name:"500Mb validity period of 30 days",price:510.00},
        {name:"1Gb validity period of 33 days,",price:1015.00},
        {name:"1.5Gb validity period of 33 days,",price:1220.00},
        {name:"2.5Gb validity period of 33 days,",price:2030.00},
        {name:"3.5Gb validity period of 33 days,",price:2535.00},
        {name:"5Gb validity period of 33 days,",price:3550.00},
        {name:"11.5Gb validity period of 33 days,",price:8120.00},
        {name:"15Gb validity period of 33 days,",price:10000.00}
    ];

$scope.dstv = [
        {name :"Access + Asia",price:6800.00},
        {name :"Access + HD/ExtraView",price:4100.00},
        {name :" Asia Add-on ",price:5000.00},
        {name :"Asia",price:5000.00},
        {name :"Asian + HD/ExtraView ",price:7160.00},
        {name :"Family",price:3800.00},
        {name :"Family + Asia",price: 8600.00},
        {name :"Family + HD/ExtraView",price:5960.00},
        {name :"Compact Plus ",price:9620.00},
        {name :"Compact Plus + Asia",price:14420.00},
        {name :"Compact Plus + HD/ExtraView",price:11780.00},
        {name :"French Plus",price:6250.00},
        {name :" French Touch ",price:1600.00},
        {name :"HDPVR Access/Extraview",price:2360.00},
        {name :" Compact",price:6200.00},
        {name :"Compact + French Touch ",price:7600.00},
        {name :"Compact + French Touch + HD/ExtraView",price:9760.00},
        {name :"Compact + HD/ExtraView",price:8360.00},
        {name :"Mobile Mini",price:800.00},
        {name :"Mobile Maxi",price:1000.00},
        {name :"Mobile Maxi Plus",price: 1200.00},
        {name :"Premium Asia",price:15940.00},
        {name :"Premium Asia + HD/ExtraView",price:18100.00},
        {name :"Premium",price:14180.00},
        {name :"Premium + French Touch",price:15580.00},
        {name :"Premium + French Touch + HD/ExtraView",price:17740.00},
        {name :"Premium + HD/ExtraView",price:16340.00},
        {name :"GERMAN (PREMIUM SUBSCRIBERS ONLY)",price:2140.00},
        {name :"GERMAN",price:3840.00}
    ];

    $scope.gotv = [
        {name:"GOtv Lite Monthly",price:600.00},
        {name:"GOtv Lite Quarterly",price:1250.00},
        {name:"GOTV Lite Annual",price:3300.00},
        {name:"GOtv Value",price:1400.00},
        {name:"GOtv Plus",price:2000.00},
        {name:"GOtv Mobile Access",price:800.00}
    ];

    $scope.startimes = [
        {name:"Nova banquet",price:1000.00},
        {name:"Basic banquet",price:1400.00},
        {name:"Classic banquet",price:2600.00},
        {name:"Unique banquet",price:3800}
    ];

    $scope.tvChange = function(){
        switch($scope.request.tv){
            case "":
                $scope.showDstv = false;
                $scope.showBanquet = false;
                $scope.showGotv = false;
                $scope.showStartimes = false;
            break;
            case "DSTV":
                $scope.showDstv = true;
                $scope.showBanquet = false;
                $scope.showGotv = false;
                $scope.showStartimes = false;
            break;
            case "GoTv":
                $scope.showGotv = true;
                $scope.showDstv = false;
                $scope.showBanquet = false;
                $scope.showStartimes = false;
            break;
        case "Startimes":
                $scope.showStartimes = true;
                $scope.showBanquet = false;
                $scope.showDstv = false;
                $scope.showGotv = false;
            break;
        }   
    }
    $scope.dstvBanquetChange = function(){
        $scope.dstv.forEach(function(e){
                if(e.name === $scope.request.banquet){
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
    }
    $scope.gotvBanquetChange = function(){
        $scope.gotv.forEach(function(e){
                if(e.name === $scope.request.banquet){
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
    }
    $scope.startimesBanquetChange = function(){
        $scope.startimes.forEach(function(e){
                if(e.name === $scope.request.banquet){
                    $scope.request.price = e.price;
                    $scope.showBanquet = true;
                }
            });
    }

    $scope.networkChange = function(){
        switch($scope.request.network){
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
    $scope.mtnBundleChange = function(){
        $scope.mtn.forEach(function(e){
                if(e.name === $scope.request.bundle){
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
    }
    $scope.etisalatBundleChange = function(){
        $scope.etisalat.forEach(function(e){
                if(e.name === $scope.request.bundle){
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
    }
    $scope.airtelBundleChange = function(){
        $scope.airtel.forEach(function(e){
                if(e.name === $scope.request.bundle){
                    $scope.request.price = e.price;
                    $scope.showBundle = true;
                }
            });
    }

    $scope.pay = function(){
        if($scope.formHolder.pay.$valid){
            var balance = $scope.user.balance;
            if(balance < $scope.request.price){
                $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }else{
                $http({
                url:"/request/pay",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format";
        }
    }

    $scope.buy = function(){
        if($scope.formHolder.recharge.$valid){
            var balance = $scope.user.balance;
            if(balance < $scope.request.amount){
                $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }$http({
                url:"/request/recharge",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format";
        }
    }

    $scope.book = function(){
        if($scope.formHolder.booking.$valid){
            var total = $scope.request.bet_company === 'nairabet' ? 
            $scope.user.balance : $scope.user.total_balance;
            if(total < $scope.request.amount){
                $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }
            $http({
                url:"/request/booking",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format";
        }
    }

    $scope.fundBet = function(){
        if($scope.formHolder.fundBet.$valid){
            $scope.errMsg = null;
            var total = $scope.request.bet_company === 'nairabet' ? 
            $scope.user.balance : $scope.user.total_balance;
            if(total < $scope.request.amount){
                $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }
            $http({
                url:"/request/fund_bet",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format"; 
        }
    }

    $scope.transfer = function(){
        if($scope.formHolder.transferCash.$valid){
            var balance = $scope.user.balance,
            withdrawableBalance = $scope.user.withdrawable_balance;
            if(withdrawableBalance < $scope.request.amount){
                 $scope.errMsg = 'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet';
            }$http({
                url:"/request/transfer",
                method:"post",
                data:{"user":$scope.user,"request":$scope.request}
            }).then(function(res){
                if(res.data.msg){
                    $scope.errMsg = res.data.msg;
                    $scope.sucMsg = null;
                }else{
                    $scope.user = res.data;
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.errMsg = null;
                $scope.sucMsg = "Your request has been sent.It will be processed soon";
                $timeout(function(){
                    $scope.getWallet();
                    $scope.request = {};
                    $scope.sucMsg = null;
                },3000)
                
                }
            });
        }else{
            $scope.errMsg = "Please fill in all the required details in the right format"; 
        }
    }
    
    $scope.getProfile = function(){
        $scope.showProfile = true;
        $scope.showEditUser = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
    }
    $scope.getEditUser = function(){
        $scope.showEditUser = true;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
    }
    $scope.getWallet = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = true;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
    }

    $scope.toggle = function(){
        $(".navbar-toggle").click(function(ev){
            ev.preventDefault();
            $(".navbar-ex1-collapse").css({"display":"inline"});
        });
    }
    $scope.getFundBet = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = true;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;

        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    $scope.getWithdrawCash = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = true;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
        
        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    $scope.getPayForTv = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = true;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    $scope.getBuyData = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= true;
        $scope.showBuyAirtime= false;
        $scope.showBooking= false;
        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    $scope.getBuyAirtime = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= true;
        $scope.showBooking= false;
        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    $scope.getBooking = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = false;
        $scope.showFundBet = false;
        $scope.showWithdrawCash = false;
        $scope.showPayForTv = false;
        $scope.showBuyData= false;
        $scope.showBuyAirtime= false;
        $scope.showBooking= true;
        $(".navbar-ex1-collapse").css({"display":"none"});
    }
    
    $scope.update= function(){
        $http({
            url:"/user/update-user",
            method:"post",
            data:{username:$scope.username,data:$scope.user}
        }).then(function(res){
            if(res.data._id){
                sessionStorage.setItem("user", JSON.stringify(res.data));
                $scope.showUpdateMsg = true;
                $scope.time = 5;
                        function timing() {
                            if ($scope.time > 0) {
                                $timeout(timing, 1000);
                            }
                            $scope.time--;
                        }
                        $timeout(timing, 1000);
                $timeout(function(){
                    $scope.getProfile();},5000);
            }
        });
    }
    
    $scope.logout = function () {
        sessionStorage.removeItem("user");
        $location.path("/");
    }
}])