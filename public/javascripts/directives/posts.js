app.directive('posts', ["postService", function(postService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/posts.htm',
        link: function(scope) {
            scope.hidePost = function() {
                scope.$parent.posts.splice(scope.$parent.posts.indexOf(scope.data), 1);
            };
            scope.addLike = function($event) {
                var postId = scope.data._id;
                postService.addLike(postId).then(function(res) {

                    if (res.data[0].likes.indexOf(scope.$parent.user.userId) == -1) {
                        scope.data.likes.length++;
                        scope.toggleClass = function(event) {
                            $(event.target).removeClass('change-color');
                        }
                    } else {
                        scope.data.likes.length--;
                        scope.toggleClass = function(event) {
                            $(event.target).addClass('change-color');
                        }
                    }
                });

            }

        }
    };
}]);