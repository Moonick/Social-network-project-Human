app.controller('postController', function ($scope, postService) {
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
    });
    $scope.addPost = function () {
        
    }


    $scope.like = function () {

    }
});
