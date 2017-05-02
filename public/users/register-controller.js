angular.module("App").controller("RegisterController", ["$rootScope", "$scope", "$timeout",
    "$http", "$location", function ($rootScope, $scope, $timeout, $http, $location) {
        $rootScope.title = "Registration";
        $scope.captchaAns = 10;
        $rootScope.showNavBar = true;
        $scope.errMsg = null;
        $scope.register = function () {
            if ($scope.signupForm.$valid) {
                if ($scope.passwordDoNotMatch) {
                } else if ($scope.usernameExists) {
                    $scope.usernameTaken = true;
                }
                else {
                    if ($rootScope.connected) {
                        $scope.notConnected = false;
                        $("body").addClass("loading");
                        $http({
                            url: "/user/register",
                            method: "post",
                            data: $scope.user
                        }).then(function (res) {
                            $("body").removeClass("loading");
                            if (res.data.user.username) {
                                $scope.suc = true;
                                sessionStorage.setItem("user", JSON.stringify(res.data));
                                $timeout(function () {
                                    $location.path("/dashboard");
                                }, 1000);
                            } else {
                               $scope.errMsg = res.data.msg;
                            }
                        })
                    } else {
                        $scope.notConnected = true;
                    }
                }
            } else {
                if ($scope.signupForm.$error.required) {
                    var len = $scope.signupForm.$error.required.length;
                    for (var i = 0; i < len; i++) {
                        $scope[$scope.signupForm.$error.required[i].$name] = true;
                    }
                }
            }
        }
    }])