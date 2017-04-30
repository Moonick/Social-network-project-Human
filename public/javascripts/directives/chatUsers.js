app.directive('chatUsers', ['$rootScope', "userService", function($rootScope, userService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/chatUsers.htm',
        link: function(scope, $element) {

            scope.startChat = function() {
                var friendId = scope.data._id;
                $('#btn-chat').attr('data-friendId', friendId);

                userService.getMessages(friendId).then(function(res) {
                    scope.messages = res.data;
                });
            }
        }
    };
}]);