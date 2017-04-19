app.factory('postService', function($http, $rootScope) {
    function Posts() {
        this.posts = $http.get('/posts');
    };
    Posts.prototype.downloadPosts = function() {
        return this.posts;
    };
    Posts.prototype.addLike = function(postId) {
        $http.post('/posts/' + postId).then(function(res) {});
    }
    return new Posts();
});