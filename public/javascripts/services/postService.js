app.factory('postService', function($http, $rootScope) {
    function Posts() {
        this.posts = $http.get('/posts');
    };
    Posts.prototype.downloadPosts = function() {
        return this.posts;
    };
    Posts.prototype.changeLike = function(postId) {
        return $http.post('/posts/' + postId);
    };

    return new Posts();
});