app.directive('comments', ["$rootScope", "commentService", function($rootScope, commentService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/comments.htm',
        link: function(scope, $element) {
            var comments = scope.$parent.comments;
            var postId = scope.data.postId;
            var userId = $rootScope.user.userId;
            var user = $rootScope.user;
            var comId = scope.data._id;

            if (comments.length !== 0) {
                scope.isLikedComment = function() {
                    if (scope.data.likes.indexOf(userId) == -1) {
                        $($element.find('.like-btn-comments')).removeClass('change-color');
                    } else {
                        $($element.find('.like-btn-comments')).addClass('change-color');
                    }
                };
                scope.isLikedComment();

                scope.changeLikeComment = function($event) {
                    commentService.changeLikeComment(comId).then(function(res) {

                        if (res.data[0].likes.indexOf(userId) == -1) {
                            scope.data.likes.push(userId);
                            scope.isLikedComment();
                        } else {
                            scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
                            scope.isLikedComment();
                        }
                    });
                }
            };
        }


    };
}]);