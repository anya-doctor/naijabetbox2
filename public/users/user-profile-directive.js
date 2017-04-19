angular.module("App").directive("userProfile",function(){
	return {
		strict:"A",
		compile:function(tEll,tAttrs){
			tEll.click(function(){
				$("#page-wrapper").load("/users/profile.html");

			})
			
			return function(scope,ele,attrs){
				$("#page-wrapper").contents();
			}
		}
	}
})