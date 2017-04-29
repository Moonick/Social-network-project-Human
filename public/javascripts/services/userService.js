app.factory('userService', function($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts = $http.get('/user/posts');
        this.users;
        this.friendRequests = $http.get('/user/friendRequests');
        this.friends = $http.get('/user/friends');
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
    User.prototype.downloadFriends = function() {
        return this.friends;
    };
    return new User();
});