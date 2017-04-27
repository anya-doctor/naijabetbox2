angular.module("App").controller("AdminDashboardController",["$rootScope",
	"$scope","$http","$timeout","$location"
	,function($rootScope,$scope,$http,$timeout,$location) {

		if(!sessionStorage.getItem("admin")){
			$location.path("/login");
		}
		$rootScope.title = "Admin-Dashboard";
		$rootScope.showNavBar = false;
		$scope.formHolder = {};
		$scope.update = {};
		$scope.creditDetails = {};

		function getAlerts() {
		    if (true) {
		        $timeout(getAlerts, 10000);
		    }
		    $http({
		        url: "user/getAlerts",
		        method: "get"
		    }).then(function (res) {
		        if (res.data.alerts) {
		            $scope.alerts = res.data.alerts;
		            $scope.count = res.data.alerts.length
		        } else {
		        }
		    });
		}
		$timeout(getAlerts, 1000);

		$scope.clearAlert = function (id) {
		    $http({
		        url: "user/updateAlert",
		        method: "post",
		        data: { id: id, status: "seen" }
		    });
		}

		$scope.toggle = function(){
	        $(".navbar-toggle").click(function(ev){
	            ev.preventDefault();
	            $(".navbar-ex1-collapse").css({"display":"inline"});
	        });
    	}

    	$scope.logout = function () {
        sessionStorage.removeItem("admin");
        $location.path("/");
        $timeout(function () {
            $rootScope.$destroy();
        }, 5000);
    }

		$scope.creditAccount = function(){
		    if ($scope.formHolder.creditAccount.$valid) {
		        var message = {
		            msg: "Your Naijabetbox has been credited with " +
                        $scope.creditDetails.amount,
		            username: $scope.req.username
		        };
				$http({
					url:"user/credit_account",
					method:"post",
					data: { creditDetails: $scope.creditDetails, message: message }
				}).then(function(res){
					if(res.data.user){
						$scope.sucMsg = "Successfull,you will be redircted";
						$scope.errMsg = null;
						$timeout(function(){
							$scope.user();
							$scope.sucMsg = null;
						},1000);
					} else if (res.data.msg) {
					    $scope.sucMsg = null;
					    $scope.errMsg = res.data.msg;
					}
					else {
						$scope.sucMsg = null;
						$scope.errMsg = "An error occured.Please try again";
					}
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.credit = function(username){
			$scope.creditDetails.username = username;
			$scope.getCreditAccount = true;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
		}

		$scope.updateBooking = function(){
			
			if($scope.formHolder.editBooking.$valid){
				var message ={
				msg:"Your play booking request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				" with code("+$scope.req.code+"),betting company("+$scope.req.betting_company+")"+
				" has been processed",
				username:$scope.req.username
			};
				$http({
					url:"request/update_booking",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
					if(res.data.msg ==="success"){
						$scope.sucMsg = "Successfull,you will be redircted";
						$scope.errMsg = null;
						$timeout(function(){
							$scope.booking();
							$scope.sucMsg = null;
						},1000);
					} else if (res.data.msg) {
					    $scope.sucMsg = null;
					    $scope.errMsg = res.data.msg;
					}
					else {
					    $scope.sucMsg = null;
					    $scope.errMsg = "An error occured.Please try again";
					}
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.updateData = function(){
			if($scope.formHolder.editData.$valid){
				var message ={
				msg:"Your data request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				" for "+$scope.req.network+" "+$scope.req.bundle+
				" has been processed",
				username:$scope.req.username};
				$http({
					url:"request/update_data",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
				    if (res.data.msg === "success") {
				        $scope.sucMsg = "Successfull,you will be redircted";
				        $scope.errMsg = null;
				        $timeout(function () {
				            $scope.booking();
				            $scope.sucMsg = null;
				        }, 1000);
				    } else if (res.data.msg) {
				        $scope.sucMsg = null;
				        $scope.errMsg = res.data.msg;
				    }
				    else {
				        $scope.sucMsg = null;
				        $scope.errMsg = "An error occured.Please try again";
				    }
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.updateFund = function(){
			if($scope.formHolder.editFund.$valid){
				var message ={
				msg:"Your fund bet request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				" with amount("+$scope.req.amount+"),betting company("+$scope.req.betting_company+")"+
				" has been processed",
				username:$scope.req.username};
				$http({
					url:"request/update_fundbet",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
				    if (res.data.msg === "success") {
				        $scope.sucMsg = "Successfull,you will be redircted";
				        $scope.errMsg = null;
				        $timeout(function () {
				            $scope.booking();
				            $scope.sucMsg = null;
				        }, 1000);
				    } else if (res.data.msg) {
				        $scope.sucMsg = null;
				        $scope.errMsg = res.data.msg;
				    }
				    else {
				        $scope.sucMsg = null;
				        $scope.errMsg = "An error occured.Please try again";
				    }
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.updateRecharge = function(){
			if($scope.formHolder.editRecharge.$valid){
				var message ={
				msg:"Your airtime request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				" for "+$scope.req.network+" "+$scope.req.amount+
				" has been processed",
				username:$scope.req.username};
				$http({
					url:"request/update_recharge",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
				    if (res.data.msg === "success") {
				        $scope.sucMsg = "Successfull,you will be redircted";
				        $scope.errMsg = null;
				        $timeout(function () {
				            $scope.booking();
				            $scope.sucMsg = null;
				        }, 1000);
				    } else if (res.data.msg) {
				        $scope.sucMsg = null;
				        $scope.errMsg = res.data.msg;
				    }
				    else {
				        $scope.sucMsg = null;
				        $scope.errMsg = "An error occured.Please try again";
				    }
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.updateTransfer = function(){
			if($scope.formHolder.editTransfer.$valid){
				var message ={
				msg:"Your transfer request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				",bank("+$scope.req.bank+")"+" and account number("+$scope.req.account_number+")"+
				" has been processed",
				username:$scope.req.username};
				$http({
					url:"request/update_transfer",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
				    if (res.data.msg === "success") {
				        $scope.sucMsg = "Successfull,you will be redircted";
				        $scope.errMsg = null;
				        $timeout(function () {
				            $scope.booking();
				            $scope.sucMsg = null;
				        }, 1000);
				    } else if (res.data.msg) {
				        $scope.sucMsg = null;
				        $scope.errMsg = res.data.msg;
				    }
				    else {
				        $scope.sucMsg = null;
				        $scope.errMsg = "An error occured.Please try again";
				    }
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.updateTv = function(){
			if($scope.formHolder.editTv.$valid){
				var message ={
				msg:"Your tv subscription request on "+
				new Date($scope.req.request_date).toString().substr(0,24)+
				" for "+$scope.req.tv+" "+$scope.req.banquet+
				" has been processed",
				username:$scope.req.username};
				$http({
					url:"request/update_tv",
					method:"post",
					data:{id:$scope.req._id,done:$scope.update.done,message:message}
				}).then(function(res){
				    if (res.data.msg === "success") {
				        $scope.sucMsg = "Successfull,you will be redircted";
				        $scope.errMsg = null;
				        $timeout(function () {
				            $scope.booking();
				            $scope.sucMsg = null;
				        }, 1000);
				    } else if (res.data.msg) {
				        $scope.sucMsg = null;
				        $scope.errMsg = res.data.msg;
				    }
				    else {
				        $scope.sucMsg = null;
				        $scope.errMsg = "An error occured.Please try again";
				    }
				})
			}else{
				$scope.sucMsg = null;
				$scope.errMsg = "Please select an option";
			}
		}

		$scope.editBooking = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = true;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}

		$scope.editTv = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = true;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}

		$scope.editFund = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = true;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;	
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}

		$scope.editRecharge = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = true;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}

		$scope.editData = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = true;
			$scope.showEditTransfer = false;
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}

		$scope.editTransfer = function(req){
			$scope.req = req;
			$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = true;
			$scope.sucMsg = null;
			$scope.errMsg = null;
			$scope.getCreditAccount = false;
		}


		function getBookingCount(){
			if(true){
				$timeout(getBookingCount,10000);
			}
			$http({
						url:"request/count_of_booking",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfBooking = 0;
						}else if(res.data.count > 0){
							$scope.countOfBooking = res.data.count;
						}
					});
		}

		function getTvCount(){
			if(true){
				$timeout(getTvCount,10000);
			}
			$http({
						url:"request/count_of_tv",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfTv = 0;
						}else if(res.data.count > 0){
							$scope.countOfTv = res.data.count;
						}
					});
		}
		function getRechargeCount(){
			if(true){
				$timeout(getRechargeCount,10000);
			}
			$http({
						url:"request/count_of_recharge",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfRecharge = 0;
						}else if(res.data.count > 0){
							$scope.countOfRecharge = res.data.count;
						}
					});
		}
		function getDataCount(){
			if(true){
				$timeout(getDataCount,10000);
			}
			$http({
						url:"request/count_of_data",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfData = 0;
						}else if(res.data.count > 0){
							$scope.countOfData = res.data.count;
						}
					});
		}
		function getTransferCount(){
			if(true){
				$timeout(getTransferCount,10000);
			}
			$http({
						url:"request/count_of_transfer",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfTransfer = 0;
						}else if(res.data.count > 0){
							$scope.countOfTransfer = res.data.count;
						}
					});
		}
		function getFundCount(){
			if(true){
				$timeout(getFundCount,10000);
			}
			$http({
						url:"request/count_of_fund",
						method:"get"
					}).then(function(res){
						if(res.data.count === 0){
							$scope.countOfFundBet = 0;
						}else if(res.data.count > 0){
							$scope.countOfFundBet = res.data.count;
						}
					});
		}
		function getRequestCount(){
			if(true){
				$timeout(getRequestCount,10000);
			}
			$scope.countOfRequest = $scope.countOfBooking+$scope.countOfTv+
		$scope.countOfTransfer+$scope.countOfRecharge+$scope.countOfData
		+$scope.countOfFundBet;
		}

		$timeout(getBookingCount,10);
		$timeout(getTvCount,10);
		$timeout(getRechargeCount,10);
		$timeout(getDataCount,10);
		$timeout(getTransferCount,10);
		$timeout(getFundCount,10);
		$timeout(getRequestCount,1000);

		 	
		function getAllUsers(){
			if(true){
				$timeout(getAllUsers,10000);
			}
			$http({
				url:"user/getAllUsers",
				method:"get"
			}).then(function(res){
				if(res.data.users){
					$scope.users = res.data.users;
				}
			});
		}

		$timeout(getAllUsers,1000);
		$scope.getUsers = true;

		$scope.user = function(){
			$scope.getUsers = true;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
			$(".navbar-ex1-collapse").css({"display":"none"});
		}

		$scope.tv = function(){
			$http({
				url:"request/tv",
				method:"get"
			}).then(function(res){
				if(res.data.tv){
					$scope.tv_request = res.data.tv;
					$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = true;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}

		$scope.recharge = function(){
			$http({
				url:"request/recharge",
				method:"get"
			}).then(function(res){
				if(res.data.recharge){
					$scope.recharge_request = res.data.recharge;
					$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = true;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}

		$scope.data = function(){
			$http({
				url:"request/data",
				method:"get"
			}).then(function(res){
				if(res.data.data){
					$scope.data_request = res.data.data;
					$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = true;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}

		$scope.booking = function(){
			$http({
				url:"request/booking",
				method:"get"
			}).then(function(res){
				if(res.data.bookings){
					$scope.booking_request = res.data.bookings;
					$scope.getUsers = false;
			$scope.showBooking = true;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}
		$scope.fundbet = function(){
			$http({
				url:"request/fund_bet",
				method:"get"
			}).then(function(res){
				if(res.data.fundbet){
					$scope.fund_request = res.data.fundbet;
					$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = true;
			$scope.showWithdrawCash = false;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}
		$scope.transfer = function(){
			$http({
				url:"request/transfer",
				method:"get"
			}).then(function(res){
				if(res.data.transfer){
					$scope.transfer_request = res.data.transfer;
					$scope.getUsers = false;
			$scope.showBooking = false;
			$scope.showFundBet = false;
			$scope.showWithdrawCash = true;
			$scope.showPayForTv = false;
			$scope.showBuyAirtime = false;
			$scope.showBuyData = false;
			$scope.showEditBooking = false;
			$scope.showEditTv = false;
			$scope.showEditFund = false;
			$scope.showEditRecharge = false;
			$scope.showEditData = false;
			$scope.showEditTransfer = false;
			$scope.getCreditAccount = false;
				}else{
					$scope.errMsg = res.data.msg;
				}
			});
			$(".navbar-ex1-collapse").css({"display":"none"});
		}
	}]);