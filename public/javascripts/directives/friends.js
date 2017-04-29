app.directive('friends', ["userService", function(userService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/friends.htm',
    };
}]);