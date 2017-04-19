app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.post('/login').then(function(res) {
            console.log(res);
        });
    };
    // User.prototype.downloadPosts = function() {
    //     return this.posts;
    // };
    // Posts.prototype.addPostToDB = function(post) {
    //     $http.post('/posts', post).then(function(res) {
    //         console.log(res);
    //     });
    // }
    return new User();
});