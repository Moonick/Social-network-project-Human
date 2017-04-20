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
                // scope.data.likes++;
                // var postId = $($event.currentTarget).closest(".panel-footer").attr('id');
                postService.addLike(postId);
            }

        }
    };
}]);