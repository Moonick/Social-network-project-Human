app.factory('userService', function ($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts = $http.get('/user/posts');
    };
    User.prototype.getCurrentUser = function () {
        return this.user;
    };
    User.prototype.downloadUserPosts = function () {
        return this.posts;
    };

    return new User();
});