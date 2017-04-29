app.factory('photoService', function($http, $rootScope) {
    function Photos() {
        this.photos;
    };
    Photos.prototype.downloadUserPhotos = function(userId) {
        return this.photos = $http.get('/photos/' + userId);
    };
    Photos.prototype.changeLike = function(photoId) {
        return $http.post('/photos/' + photoId);
    };

    return new Photos();
});