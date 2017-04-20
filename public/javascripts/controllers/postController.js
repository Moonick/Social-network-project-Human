app.controller('postController', function($scope, postService) {
    postService.downloadPosts().then(function(res) {
        $scope.posts = res.data;

        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });

});