app.controller('postController', function ($scope, postService) {
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
    });
    $scope.addPost = function () {
        var text = $('#create-post textarea')[0].value;
        var post = {
            text: text
        };
        $scope.posts.unshift(post);
    }

    
    $scope.like = function () {

    }
});
