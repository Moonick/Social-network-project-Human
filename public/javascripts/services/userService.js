app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
    };
    User.prototype.getCurrentUser = function() {
        return this.user;
    }
    return new User();
});