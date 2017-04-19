app.controller('postController', function($scope, postService) {
    postService.downloadPosts().then(function(res) {
        $scope.posts = res.data;
    });

    $scope.loadMore = function() {
        var last = $scope.images[$scope.images.length - 1];
        for (var i = 1; i <= 8; i++) {
            $scope.images.push(last + i);
        }
    };
    $scope.addPost = function() {
        var text = $('#create-post textarea')[0].value;
        var post = {
            text: text
        };
        $scope.posts.unshift(post);
    }


    $scope.like = function() {

    }
});