angular.module("App").controller("ChangePasswordController",
    ["$rootScope", "$scope", "$http","$location","$timeout",
    function ($rootScope, $scope, $http,$location,$timeout) {
        $rootScope.title = "Change Password";

        $rootScope.showNavbar = true;
        $scope.boo = function () {
                if ($scope.changePassword.$valid) {
                   
                        //$("body").addClass("loading");
                        $http({
                            url: "/user/change_password",
                            method: "post",
                            data: $scope.request
                        }).then(function (res) {
                            console.log(res.data);
                            $("body").removeClass("loading");
                            if (res.data.err) {
                                $scope.errMsg = "Invalid credentials";
                                $scope.sucMsg = null;
                            }
                            else{                                
                                $scope.errMsg = null;
                                $scope.sucMsg = "please check your email and click on the link to continue";
                                $timeout(function () {
                                $location.path("/");
                                }, 2000);
                            }
                            
                        });
                    

                }
                else {
                    $scope.errMsg = "Please fill in the required details";
                    $scope.sucMsg = null;
                }
            }
        
       
    }])