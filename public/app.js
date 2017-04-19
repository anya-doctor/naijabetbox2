angular.module("App", ["ngRoute"]).config(function ($routeProvider, $locationProvider) {
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
    });
    //$locationProvider.html5Mode(true);
});