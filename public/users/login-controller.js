angular.module("App").controller("LoginController",
    ["$rootScope", "$location", "$scope", "$http", "$timeout",
    function ($rootScope, $location, $scope, $http, $timeout) {
        $rootScope.title = "Login";
        $rootScope.showNavbar = true;
        $scope.login = function () {
            if ($scope.loginForm.$valid) {

                $http({
                    url: "/user/login",
                    method: "post",
                    data: { "username": $scope.username, "password": $scope.password }
                }).then(function (res) {
                    if (res.data) {
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                        $location.search("");
                        $scope.time = 5;
                        $scope.loginSuc = true;
                        $scope.loginErr = false;
                        function timing() {
                            if ($scope.time > 0) {
                                $timeout(timing, 1000);
                            }
                            $scope.time--;
                        }
                        $timeout(timing, 1000);
                        $timeout(function () {
                            $location.path("/dashboard");
                        }, 5000);
                    } else {
                        $scope.loginErr = true;
                        $scope.loginSuc = false;
                        $scope.invalidCredentials = "Invalid credentials";
                    }
                });
            } else {
                var len = $scope.loginForm.$error.required.length;
                for (var i = 0; i < len; i++) {
                    $scope[$scope.loginForm.$error.required[i].$name] = true;
                }
            }
        }
    }])