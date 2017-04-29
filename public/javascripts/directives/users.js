app.directive('users', ['$rootScope', "userService", function($rootScope, userService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/users.htm',
        link: function(scope, $element) {
            var userId = scope.data._id;
            // ============== 
            scope.hasSendRequest = function() {

                if ($rootScope.user.sendFriendRequests.indexOf(userId) == -1) {
                    if ($rootScope.user.friends.indexOf(userId) == -1) {
                        $($element.find('.sendMsg')).hide();
                        $($element.find('.friend-request')).show();
                    } else {
                        $($element.find('.friend-request')).hide();
                        $($element.find('.sendMsg')).hide();
                    }
                } else {
                    $($element.find('.sendMsg')).show();
                    $($element.find('.friend-request')).hide();
                }

            };
            scope.hasSendRequest();

            //  =============== SEND FRIEND REQUEST =========
            scope.sendFriendRequest = function($event) {
                userService.sendFriendRequest(userId).then(function(data) {
                    $($event.currentTarget).hide();
                    $($event.currentTarget.parentNode).append('<p>Friend request sent</p>')
                })
            };

        }
    };
}]);