app.controller('photosController', ['$scope', 'photoService', 'userService', function($scope, photoService, userService) {
    //================= LOAD ALL USER PHOTOS  ============
    photoService.downloadUserPhotos().then(function(res) {
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