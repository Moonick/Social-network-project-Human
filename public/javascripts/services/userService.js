app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts;
        this.users;
        this.friendRequests = $http.get('/user/friendRequests');
        this.friends;
    };
    User.prototype.getCurrentUser = function() {
        return this.user;
    };
    User.prototype.getUsers = function(userName) {
        return this.users = $http.get('/user/find/' + userName);
    };
    User.prototype.downloadUserPosts = function(userId) {
        return this.posts = $http.get('/user/posts/' + userId);
    };
    User.prototype.sendFriendRequest = function(userId) {
        return $http.post('/user/friendRequest/' + userId);
    };
    User.prototype.downloadFriendRequests = function() {
        return this.friendRequests
    };
    User.prototype.confirmRequest = function(reqFriendId) {
        return $http.post('/user/confirm/' + reqFriendId);
    };
    User.prototype.rejectRequest = function(reqFriendId) {
        return $http.post('/user/reject/' + reqFriendId);
    };
    User.prototype.downloadFriends = function(userId) {
        return this.friends = $http.get('/user/friends/' + userId);
    };
    return new User();
});