angular.module("App").directive("usernameExist", function ($http) {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.keyup(function () {
                scope.usernameTaken = false;
                if (elem.val().length >= 6) {

                    $http({
                        url: "/user/check_username",
                        method: "get",
                        params: { username: elem.val() }
                    }).then(function (res) {
                        if (res.data.userAlreadyExist) {
                            scope.usernameExists = true;
                            $(elem[0].nextElementSibling).css({ "color": "red" }).
                                text("username is already taken");
                        } else {
                            $(elem[0].nextElementSibling).css({ "color": "green" }).
                                text("username is available");
                            scope.usernameExists = false;
                        }
                    })
                } else {
                    scope.showUsernameErr = false;
                    $(elem[0].nextElementSibling).text("");
                }
            });
            elem.blur(function () {
                $(elem[0].nextElementSibling).text("");
            })
        }
    }
});