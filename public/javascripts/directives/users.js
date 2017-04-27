app.directive('users', ["userService", function(userService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/users.htm',
        link: function(scope, $element) {
            scope.sendFriendRequest = function() {};

        }
    };
}]);