angular.module("App").directive("passwordStrengthChecker",
    function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                elem.keyup(function () {
                    var score = 0, chars = "~!@#$%^&*()_+=/.?><\"';:,";
                    for (var i = 0; i < elem.val().length; i++) {
                        if ((chars.indexOf(elem.val().charAt(i)) > -1)) {
                            score += 20;
                            break;
                        }
                    }
                    if (/[a-z]/.test(elem.val())) {
                        score += 20;
                    } if (/[A-Z]/.test(elem.val())) {
                        score += 20;
                    } if (/[\d]/.test(elem.val())) {
                        score += 20;
                    } if (elem.val().length > 8) {
                        score += 20;
                    }
                    switch (true) {
                        case score == 100:
                            $(elem[0].nextElementSibling).css({ "color": "green" })
                            .text("Strong");
                            break;
                        case score == 80:
                            $(elem[0].nextElementSibling).css({ "color": "yellow" })
                            .text("Medium");
                            break;
                        case score == 60:
                            $(elem[0].nextElementSibling).css({ "color": "brown" })
                            .text("Weak");
                            break;
                        case score < 60:
                            $(elem[0].nextElementSibling).css({ "color": "red" })
                            .text("Very Weak");
                            break;
                    }
                })
            }
        };
    });