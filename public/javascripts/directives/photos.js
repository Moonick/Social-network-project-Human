app.directive('photos', ["photoService", "commentService", function(photoService, commentService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/photos.htm',
        link: function(scope, $element) {
            var photoId = scope.data._id;
            var userId = scope.$parent.user.userId;
            scope.IsVisible = false;
            scope.showHideComments = function() {
                scope.IsVisible = scope.IsVisible ? false : true;
                if (scope.IsVisible) {
                    $('body').css('overflow', 'hidden');
                    $(".overlay").show();
                } else {
                    $(".overlay").hide();
                    $('body').css('overflow', 'scroll');
                }
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
                photoService.changeLike(photoId).then(function(res) {
                    if (res.data[0].likes.indexOf(userId) == -1) {
                        scope.data.likes.push(userId);
                        scope.isLiked();
                    } else {
                        scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
                        scope.isLiked();
                    }
                });
            };
            scope.numOfComments = function() {
                commentService.downloadComments(photoId).then(function(res) {
                    scope.comments = res.data;
                });
            }
            scope.numOfComments()
            $('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);