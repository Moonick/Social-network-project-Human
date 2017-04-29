app.controller('photosController', ['$scope', 'photoService', 'userService', function($scope, photoService, userService) {
    var url = window.location.href;
    var userId = url.substring(url.lastIndexOf('/') + 1);
    //================= LOAD ALL USER PHOTOS  ============
    photoService.downloadUserPhotos(userId).then(function(res) {
        $scope.photos = res.data;
        $scope.somePhotos = $scope.photos.slice(0, 5);
        $scope.loadMore = function() {
            $scope.somePhotos = $scope.photos.slice(0, $scope.somePhotos.length + 5);
        };
    });

    $(document).ready(function() {
        $(".fancybox").fancybox({
            openEffect: "none",
            closeEffect: "none",
            beforeShow: function() {
                this.title = $(this.element).data("caption");
            }
        });
    });
}]);