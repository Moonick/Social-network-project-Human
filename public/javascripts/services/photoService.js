app.factory('photoService', function($http, $rootScope) {
    function Photos() {
        this.photos = $http.get('/photos');
    };
    Photos.prototype.downloadUserPhotos = function() {
        return this.photos;
    };

    return new Photos();
});