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
            scope.sendFriendRequest = function() {
                userService.sendFriendRequest(userId).then(function(data) {
                    console.log(data)
                    $('.friend-request').hide();
                    $('.search-friends .pull-right').append('<p>Friend request sent</p>')
                })
            };

        }
    };
}]);