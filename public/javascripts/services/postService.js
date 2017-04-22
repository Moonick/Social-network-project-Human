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
    // Posts.prototype.addComment = function(postId, comment) {
    //     return $http.put('/posts/' + postId, comment);
    // };
    // Posts.prototype.getComments = function(postId) {
    //    this.$http.get('/posts/' + postId);
    // };
    // Posts.prototype.downloadComments = function(postId) {
    //     return $http.get('/posts/' + postId);
    // };
    // Posts.prototype.changeLikeComment = function(postId, userId) {
    //     return $http.post('/posts/' + postId + "/" + userId);
    // };

    return new Posts();
});