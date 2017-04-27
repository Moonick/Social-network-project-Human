app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts = $http.get('/user/posts');
        this.users = $http.get('/user/all');
    };
    User.prototype.getCurrentUser = function() {
        return this.user;
    };
    User.prototype.getAllUsers = function() {
        return this.users;
    };
    User.prototype.downloadUserPosts = function() {
        return this.posts;
    };


    return new User();
});