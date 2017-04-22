app.factory('commentService', function($http, $rootScope) {
    function Comments() {
        this.comments;
    };
    Comments.prototype.downloadComments = function(postId) {
        return this.comments = $http.get('/comments/' + postId);
    };

    Comments.prototype.addComment = function(comment) {
        return $http.post('/comments/', comment);
    };

    Comments.prototype.changeLikeComment = function(comId) {
        return $http.put('/comments/' + comId);
    };

    return new Comments();
});