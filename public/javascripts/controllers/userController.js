app.controller('userController', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService) {
    userService.downloadUserPosts().then(function(res) {
        $scope.posts = res.data;
        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });
    userService.getCurrentUser().then(function(res) {
        $rootScope.user = res.data;
    });
    $scope.show = 1;
    $scope.uploadPhoto = function() {
        $(".overlay, #uploadPhoto").show();

        $(".close-photo").on('click', function() {
            $(".overlay, #uploadPhoto").hide();
        })
    };


    function addBtnOnHover(imgDiv, btn) {
        $(imgDiv).hover(
            function() {
                $(btn).show()
            },
            function() {
                $(btn).hide()
            });
    };
    addBtnOnHover('.profile-photo', '.addProfImg');
    addBtnOnHover('.cover-photo', '.addCoverImg');


}]);