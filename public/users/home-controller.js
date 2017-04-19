angular.module("App").controller("HomeController", ["$rootScope", function ($rootScope) {
    $rootScope.currentDate = new Date().getFullYear();
    $rootScope.title = "Home";
    $rootScope.showNavBar = true;
}]);