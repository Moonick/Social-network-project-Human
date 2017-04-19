app.controller('postController', function($scope, postService) {
    postService.downloadPosts().then(function(res) {
        $scope.posts = res.data;
    });
<<<<<<< HEAD

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
=======
    $scope.addPost = function () {
        postService.downloadPosts().then(function (res) {
            var posts = res.data;
            console.log(posts);
            $scope.posts = posts;

        })
    }


    $scope.like = function () {
>>>>>>> 477934b4120f3cb20d912a96ce51935a34fd20f8

    }
});