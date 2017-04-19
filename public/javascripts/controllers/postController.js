app.controller('postController', function ($scope, postService) {
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
    });
    $scope.addPost = function () {
        postService.downloadPosts().then(function (res) {
            var posts = res.data;
            console.log(posts);
            $scope.posts = posts;

        })
    }


    $scope.like = function () {

    }
});
