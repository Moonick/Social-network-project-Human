app.controller('friendsController', ['$scope', 'userService', function($scope, userService) {
    var url = window.location.href;
    var userId = url.substring(url.lastIndexOf('/') + 1);

    //============= LOAD ALL FRIENDS ================
    userService.downloadFriends(userId).then(function(res) {
        $scope.friends = res.data;
        $scope.someFriends = $scope.friends.slice(0, 20);
        $scope.loadMore = function() {
            $scope.someFriends = $scope.friends.slice(0, $scope.someFriends.length + 20);
        };
    });

}]);