app.factory('postService', function($http, $rootScope) {
    function Posts() {
        this.posts = $http.get('/posts');
    }

    Posts.prototype.downloadPosts = function() {
        return this.posts;
    }
    return new Posts();
});