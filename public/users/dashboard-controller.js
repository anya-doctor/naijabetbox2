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
    
    $scope.getProfile = function(){
        $scope.showProfile = true;
        $scope.showEditUser = false;
        $scope.showWallet = false;
    }
    $scope.getEditUser = function(){
        $scope.showEditUser = true;
        $scope.showProfile = false;
        $scope.showWallet = false;
    }
    $scope.getWallet = function(){
        $scope.showEditUser = false;
        $scope.showProfile = false;
        $scope.showWallet = true;
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