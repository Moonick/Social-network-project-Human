app.directive('photos', ["photoService", function(photoService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/photos.htm',
        link: function(scope, $element) {
            var postId = scope.data._id;
            var userId = scope.$parent.user.userId;

            scope.showHideComments = function() {
                    $(".overlay, #showComments").show();
                    console.log('banani')
                    $(".close-comments-photo").on('click', function() {
                        $(".overlay, #showComments").hide();
                    })
                }
                // scope.showHideComments = function() {
                //     scope.IsVisible = scope.IsVisible ? false : true;
                // };


            // scope.isLiked = function() {
            //     if (scope.data.likes.indexOf(userId) == -1) {
            //         $($element.find('.like-btn')).removeClass('change-color');
            //     } else {
            //         $($element.find('.like-btn')).addClass('change-color');
            //     }
            // // };
            // scope.isLiked();

            // scope.changeLike = function($event) {
            //     postService.changeLike(postId).then(function(res) {
            //         if (res.data[0].likes.indexOf(userId) == -1) {
            //             scope.data.likes.push(userId);
            //             scope.isLiked();
            //         } else {
            //             scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
            //             scope.isLiked();
            //         }
            //     });
            // };

            //         scope.numOfComments()
            //         $('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);