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
    }).when("/confirm_password", {
        templateUrl: "users/confirm_password.html",
        controller: "ChangePasswordController"
    }).when("/change_password", {
        templateUrl: "users/change_password.html",
        controller: "ChangePasswordController"
    }).when("/fundbet", {
        templateUrl: "users/fundbet.html"
    }).when("/play_booking", {
        templateUrl: "users/play_booking.html"
    }).when("/transfer_cash", {
        templateUrl: "users/transfer_cash.html"
    }).when("/buy_data", {
        templateUrl: "users/buy_bundle.html"
    }).when("/pay_for_tv", {
        templateUrl: "users/pay_tv.html"
    }).when("/how_it_works", {
        templateUrl: "users/how_it_works.html"
    }).when("/why_us", {
        templateUrl: "users/why_us.html"
    }).when("/about_us", {
        templateUrl: "users/about_us.html"
    }).when("/how_to_fundbet", {
        templateUrl: "users/how_to_fundbet.html"
    }).when("/how_to_fund_account", {
        templateUrl: "users/how_to_fund_account.html"
    }).when("/buy_airtime", {
        templateUrl: "users/recharge.html"
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