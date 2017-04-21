app.directive('posts', ["postService", function(postService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/posts.htm',
        link: function(scope, $element) {
            var postId = scope.data._id;
            var userId = scope.$parent.user.userId;

            scope.hidePost = function() {
                scope.$parent.posts.splice(scope.$parent.posts.indexOf(scope.data), 1);
            };
            scope.isLiked = function() {
                if (scope.data.likes.indexOf(userId) == -1) {
                    $($element.find('.like-btn')).removeClass('change-color');
                } else {
                    $($element.find('.like-btn')).addClass('change-color');
                }
            };
            scope.isLiked();

            scope.changeLike = function($event) {
                postService.changeLike(postId).then(function(res) {
                    if (res.data[0].likes.indexOf(userId) == -1) {
                        scope.data.likes.push(userId);
                        scope.isLiked();
                    } else {
                        scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
                        scope.isLiked();
                    }
                });
            };
            // scope.addComment = function() {
            //     var comment = {
            //         text: scope.commentText,
            //         postId: postId,
            //         userId: userId,
            //         fname: scope.$parent.user.fname,
            //         lname: scope.$parent.user.lname
            //     };
            //     postService.addComment(postId, comment).then(function(res) {
            //         console.log(res);
            //     })
            // }
            $('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);