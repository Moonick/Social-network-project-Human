app.directive('posts', ["postService", function (postService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/posts.htm',
        link: function (scope, $element) {
            scope.hidePost = function () {
                scope.$parent.posts.splice(scope.$parent.posts.indexOf(scope.data), 1);
            };
            scope.isLiked = function () {
                if (scope.data.likes.indexOf(scope.$parent.user.userId) == -1) {
                    $($element.find('.like-btn')).removeClass('change-color');
                } else {
                    $($element.find('.like-btn')).addClass('change-color');
                }
            };
            scope.isLiked();
            scope.addLike = function ($event) {
                var postId = scope.data._id;
                postService.addLike(postId).then(function (res) {
                    if (res.data[0].likes.indexOf(scope.$parent.user.userId) == -1) {
                        scope.data.likes.push(scope.$parent.user.userId);
                        scope.isLiked();
                    } else {
                        scope.data.likes.splice(scope.data.likes.indexOf(scope.$parent.user.userId), 1);
                        scope.isLiked();
                    }
                });
            }



            $('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);