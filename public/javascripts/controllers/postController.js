app.controller('postController', ['$scope', 'postService', 'userService', function ($scope, postService, userService) {
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function () {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });
    userService.getCurrentUser().then(function (res) {
        $scope.user = res.data;
    });
  

}]);