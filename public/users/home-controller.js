angular.module("App").controller("HomeController", ["$rootScope","$http", function ($rootScope,$http) {
    $rootScope.currentDate = new Date().getFullYear();
    $rootScope.title = "Home";
    $rootScope.showNavBar = true;

    $rootScope.contact = function(){
    	$rootScope.contactDetails = {name:$rootScope.name,mobile:$rootScope.mobile,subject:$rootScope.subject,email:$rootScope.email,message:$rootScope.message};
    	$http({
    		url:"user/contact",
    		method:"post",
    		data:$rootScope.contactDetails
    	});
    }
}]);