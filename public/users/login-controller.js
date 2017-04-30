angular.module("App").controller("LoginController",
    ["$rootScope", "$location", "$scope", "$http", "$timeout",
    function ($rootScope, $location, $scope, $http, $timeout) {
        $rootScope.title = "Login";
        $rootScope.showNavbar = true;
        function isConnected() {
            if (true) {
                $timeout(isConnected, 1000);
            }
            $scope.connected = navigator.onLine;
        }
        $timeout(isConnected, 1000);
        $scope.login = function () {
            if ($scope.loginForm.$valid) {
                //if ($scope.connected) {
                    $scope.notConnected = false;
                    $http({
                        url: "/user/login",
                        method: "post",
                        data: { "username": $scope.username, "password": $scope.password }
                    }).then(function (res) {
                        if (res.data.user === null) {
                            $scope.loginErr = true;
                            $scope.loginSuc = false;
                            $scope.invalidCredentials = "Invalid credentials";

                        }
                        else if (res.data.user.isAdmin === "Yes") {
                            sessionStorage.setItem("admin", res.data.user.isAdmin);
                            $location.search("");
                            $scope.loginSuc = true;
                            $scope.loginErr = false;
                            $timeout(function () {
                                $location.path("/admin");
                            }, 3000);
                        } else {
                            sessionStorage.setItem("user", JSON.stringify(res.data.user));
                            $location.search("");
                            $scope.loginSuc = true;
                            $scope.loginErr = false;
                            $timeout(function () {
                                $location.path("/dashboard");
                            }, 1000);
                        }
                    });
                //} else {

                  //  $scope.loginSuc = false;
                   // $scope.loginErr = false;
                    //$scope.notConnected = true;
                //}
                
            }
            else {
                var len = $scope.loginForm.$error.required.length;
                for (var i = 0; i < len; i++) {
                    $scope[$scope.loginForm.$error.required[i].$name] = true;
                }
            }
        }
    }])