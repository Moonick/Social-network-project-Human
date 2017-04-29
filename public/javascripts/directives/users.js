app.directive('users', ["userService", function(userService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/users.htm',
        link: function(scope, $element) {
            var userId = scope.data._id;
            //  =============== SEND FRIEND REQUEST =========
            scope.sendFriendRequest = function($event) {
                console.log()
                userService.sendFriendRequest(userId).then(function(data) {
                    $($event.currentTarget).hide();
                    $($event.currentTarget.parentNode).append('<p>Friend request sent</p>')
                })
            };

        }
    };
}]);