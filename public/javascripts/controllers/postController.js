app.controller('postController', function($scope, postService) {
    postService.downloadPosts().then(function(res) {
        $scope.posts = res.data;

        $scope.data = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.data = $scope.posts.slice(0, $scope.data.length + 5);
        };
    });

});