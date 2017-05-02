angular.module("App", ["ngRoute"]).run(function($rootScope,$timeout){
$rootScope.$on('$routeChangeStart',function(e,ar){
    $("body").addClass("loading");
});
$rootScope.$on('$routeChangeSuccess', function (ar) {
    $("body").removeClass("loading");
});
$rootScope.$on('$includeContentLoaded', function () {
    $("body").removeClass("loading");
});
function isConnected() {
    if (true) {
        $timeout(isConnected, 1000);
    }
    $rootScope.connected = navigator.onLine;
}
$timeout(isConnected, 1000);
}).config(function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise("/");
    $routeProvider.when("/", {
        templateUrl: "users/home.html",
        controller: "HomeController"
    }).when("/signup",{
            templateUrl: "users/register.html",
            controller: "RegisterController"
    }).when("/login", {
            templateUrl: "users/login.html",
            controller: "LoginController"
    }).when("/dashboard",
        {
            templateUrl: "users/dashboard.html",
            controller: "DashboardController",
                css: ["/assets/bootstrap/css/bootstrap.min.css",
                "/assets/mobirise/css/mbr-additional.css",
                 "/assets/dashboard/css/sb-admin.css",
                 "/assets/dashboard/css/morris.css",
                 "/assets/dashboard/css/font-awesome.min.css"]
    }).when("/admin",
        {
            templateUrl: "admin/dashboard.html",
            controller: "AdminDashboardController",
                css: ["/assets/bootstrap/css/bootstrap.min.css",
                "/assets/mobirise/css/mbr-additional.css",
                 "/assets/dashboard/css/sb-admin.css",
                 "/assets/dashboard/css/morris.css",
                 "/assets/dashboard/css/font-awesome.min.css"]
    });
    //$locationProvider.html5Mode(true);
});