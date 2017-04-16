app.controller('postController', function ($scope, postService) {
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
    });
    $scope.addPost = function() {
        var post = { text: "Hi" };
        $scope.posts.unshift(post);
        postService.addPostToDB(post);
        console.log($scope.posts)
    }

});
