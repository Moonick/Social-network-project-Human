app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
    };
    User.prototype.getCurrentUser = function() {
        return this.user;
    };
    User.prototype.downloadUserPosts = function() {
        return this.userPosts = $http.get('/user/posts');
    };

    return new User();
});