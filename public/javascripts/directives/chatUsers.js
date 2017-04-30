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
                var friendName = scope.data.fullName;
                $('#btn-chat').attr('data-friendId', friendId);
                $('#friendName').html('with <strong>' + friendName + '</strong>');

                userService.getMessages(friendId).then(function(res) {
                    scope.$parent.$parent.messages = res.data;
                });
            }
        }
    };
}]);