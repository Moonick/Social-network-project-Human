app.directive('posts', ["postService", function(postService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/posts.htm',
        link: function(scope, $element) {
            scope.hidePost = function() {
                scope.$parent.posts.splice(scope.$parent.posts.indexOf(scope.data), 1);
            };
            scope.isLiked = function() {
                var postId = scope.data._id;

                postService.addLike(postId).then(function(res) {
                    scope.data.likes = res.data[0].likes;
                    if (scope.data.likes.indexOf(scope.$parent.user.userId) == -1) {
                        $($element.find('.like-btn')).removeClass('change-color');
                        console.log('is liked :false')
                    } else {
                        $($element.find('.like-btn')).addClass('change-color');
                        console.log('is liked :true')
                    }
                });

            };

            scope.addLike = function($event) {

                var postId = scope.data._id;

                postService.addLike(postId).then(function(res) {
                    scope.data.likes = res.data[0].likes;
                    scope.isLiked();

                    // if (scope.data.likes.indexOf(scope.$parent.user.userId) == -1) {
                    //     scope.data.likes.push(scope.$parent.user.userId);
                    //     console.log('nqma');
                    //     // scope.toggleClass = function(event) {
                    //     //     $(event.target).removeClass('change-color');
                    //     // }
                    // } else {
                    //     scope.data.likes.splice(scope.data.likes.indexOf(scope.$parent.user.userId), 1);
                    //     console.log('ima');
                    //     // scope.toggleClass = function(event) {
                    //     //     $(event.target).addClass('change-color');
                    //     // }
                    // }
                });
            };
            scope.isLiked();

            $('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);