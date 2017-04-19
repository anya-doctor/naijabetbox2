angular.module("App").directive("passwordMatch", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.blur(function () {
                if (scope.user.password == elem.val()) {
                    scope.passwordDoNotMatch = false;
                    $(elem[0].nextElementSibling).css({ "display": "none" });
                } else {
                    scope.passwordDoNotMatch = true;
                    $(elem[0].nextElementSibling).css({ "display": "inline" });
                }
            });
        }
    }
});