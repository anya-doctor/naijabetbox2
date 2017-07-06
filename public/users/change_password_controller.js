angular.module("App").controller("ChangePasswordController",
    ["$rootScope", "$scope", "$http","$location","$timeout",
    function ($rootScope, $scope, $http,$location,$timeout) {
        $rootScope.title = "Change Password";

        $rootScope.showNavbar = true;
        $scope.boo = function () {
                if ($scope.changePassword.$valid) {
                   
                        $("body").addClass("loading");
                        $http({
                            url: "/user/change_password",
                            method: "post",
                            data: $scope.request
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.err) {
                                $scope.errMsg = res.data.err;
                                $scope.sucMsg = null;
                            }
                            else{                                
                                $scope.errMsg = null;
                                $scope.sucMsg = "please check your email and click on the link to continue";
                                $timeout(function () {
                                $location.path("/");
                                }, 5000);
                            }
                            
                        });
                    

                }
                else {
                    $scope.errMsg = "Please fill in the required details";
                    $scope.sucMsg = null;
                }
        }

        $scope.confirm = function () {
            if ($scope.confirmPassword.$valid) {
                if ($scope.passwordDoNotMatch) {
                }              
                else {
                      $("body").addClass("loading");
                        $http({
                            url: "/user/confirm_password",
                            method: "post",
                            data: $scope.user
                        }).then(function (res) {
                            console.log(res.data);
                            $("body").removeClass("loading");
                            if (res.data.user) {
                                $scope.sucMsg = "Your password has been successfully changed";
                                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                                $timeout(function () {
                                    $location.path("/dashboard");
                                }, 3000);
                            } else {
                                $scope.errMsg = res.data.err;
                            }
                        })
                   
                }
            } else {
                if ($scope.confirmPassword.$error.required) {
                    var len = $scope.confirmPassword.$error.required.length;
                    for (var i = 0; i < len; i++) {
                        $scope[$scope.confirmPassword.$error.required[i].$name] = true;
                    }
                }
            }
        }
        
       
    }])