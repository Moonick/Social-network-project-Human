app.controller('commentController', ['$scope', '$element', 'postService', function($scope, $element, postService) {
    var postId = $scope.$parent.data._id;
    var userId = $scope.$parent.data.userId;
    var user = $scope.$parent.$parent.user;

    postService.downloadComments(postId).then(function(res) {
        $scope.comments = res.data[0].comments
    });

    $scope.addComment = function(event) {
        var comment = {
            text: $scope.commentText,
            postId: postId,
            userId: userId,
            fname: user.fname,
            lname: user.lname,
            likes: []
        };
        postService.addComment(postId, comment).then(function(res) {
            if (res.status == 201) {
                $scope.comments.push(comment)
            }
        });
    };


    // //-----------------------
    // $scope.isLikedComment = function() {
    //     console.log($scope.comments)
    //     if ($scope.comments.likes.indexOf(userId) == -1) {
    //         $($element.find('.like-btn-comments')).removeClass('change-color');
    //     } else {
    //         $($element.find('.like-btn-comments')).addClass('change-color');
    //     }
    // };
    // $scope.isLikedComment();

    // $scope.changeLikeComment = function($event) {
    //     postService.changeLikeComment(postId, userId).then(function(res) {
    //         console.log(res)
    //             // if (res.data[0].likes.indexOf(userId) == -1) {
    //             //     scope.data.likes.push(userId);
    //             //     scope.isLikedComment();
    //             // } else {
    //             //     scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
    //             //     scope.isLikedComment();
    //             // }
    //     });
    // };

}]);