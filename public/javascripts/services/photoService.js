app.factory('photoService', function($http, $rootScope) {
    function Photos() {
        this.photos = $http.get('/photos');
    };
    Photos.prototype.downloadUserPhotos = function() {
        return this.photos;
    };
    Photos.prototype.changeLike = function(photoId) {
        return $http.post('/photos/' + photoId);
    };

    return new Photos();
});