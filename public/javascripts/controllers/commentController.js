app.controller('commentController', ['$scope', '$rootScope', 'commentService', 'userService', function ($scope, $rootScope, commentService, userService) {
    var postId = $scope.$parent.data._id;
    var userId = $rootScope.user._id;
    var user = $rootScope.user;

    // ============== LOAD ALL COMMENTS ================
    commentService.downloadComments(postId).then(function (res) {
        $scope.comments = res.data;
        // =========== ADD NEW COMMENT ==============
        $scope.addComment = function (event) {
            var comment = {
                text: $scope.commentText,
                postId: postId,
                user_id: userId,
                fname: user.fname,
                lname: user.lname,
                userProfImg: user.profileImageUrl || "../images/profile.jpg",
                likes: [],
                date: new Date().toLocaleString()
            };
            if (comment.text !== "") {
                commentService.addComment(comment).then(function (res) {
                    if (res.status == 201) {
                        $scope.comments.push(res.data);
                        $('.panel-comments textarea').val("");
                        $scope.$parent.numOfComments();
                        $scope.commentText="";
                    }
                });
            }
        };
    });

    userService.getCurrentUser().then(function (res) {
        $scope.user = res.data;
    });


}]);