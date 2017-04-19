app.controller('postController', function($scope, postService) {
    postService.downloadPosts().then(function(res) {
        $scope.posts = res.data;
        $scope.data = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.data = $scope.posts.slice(0, $scope.data.length + 5);
        };
    });


    $scope.addPost = function() {
        var text = $('#create-post textarea')[0].value;
        var post = {
            text: text
        };
        $scope.posts.unshift(post);
    }


    $scope.like = function() {}
});