app.factory('postService', function($http, $rootScope) {
    function Posts() {
        this.posts = $http.get('/posts');
    };
    Posts.prototype.downloadPosts = function() {
        return this.posts;
    };
    // Posts.prototype.addPostToDB = function(post) {
    //     $http.post('/posts', post).then(function(res) {
    //         console.log(res);
    //     });
    // }
    return new Posts();
});