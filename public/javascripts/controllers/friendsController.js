app.controller('friendsController', ['$scope', 'userService', function($scope, userService) {
    //============= LOAD ALL FRIENDS ================
    userService.downloadFriends().then(function(res) {
        $scope.friends = res.data;
        console.log(res.data)
        $scope.someFriends = $scope.friends.slice(0, 20);
        $scope.loadMore = function() {
            $scope.someFriends = $scope.friends.slice(0, $scope.someFriends.length + 20);
        };
    });

}]);