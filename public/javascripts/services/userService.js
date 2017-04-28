app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts = $http.get('/user/posts');
        this.users;
    };
    User.prototype.getCurrentUser = function() {
        return this.user;
    };
    User.prototype.getUsers = function(userName) {

        return this.users = $http.get('/user/find/' + userName);

    };
    User.prototype.downloadUserPosts = function() {
        return this.posts;
    };


    return new User();
});