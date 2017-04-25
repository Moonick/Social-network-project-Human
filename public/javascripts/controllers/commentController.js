app.controller('commentController', ['$scope', 'commentService', 'userService', function($scope, commentService, userService) {
    var postId = $scope.$parent.data._id;
    var userId = $scope.$parent.data.userId;
    var user = $scope.$parent.$parent.user;
    console.log('postid ' + postId);
    commentService.downloadComments(postId).then(function(res) {
        $scope.comments = res.data;
        $scope.addComment = function(event) {
            var comment = {
                text: $scope.commentText,
                postId: postId,
                userId: userId,
                fname: user.fname,
                lname: user.lname,
                profilePicture: user.profImgUrl || "../images/profile.jpg",
                likes: [],
                date: new Date().toLocaleString()
            };

            commentService.addComment(comment).then(function(res) {
                if (res.status == 201) {
                    $scope.comments.push(res.data);
                    $('.panel-comments textarea').val("");
                    $scope.$parent.numOfComments()

                }
            });
        };
    });

    userService.getCurrentUser().then(function(res) {
        $scope.user = res.data;
    });


}]);