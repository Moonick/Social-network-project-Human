app.controller('friendRequestController', ['$scope', 'userService', function($scope, userService) {
    //============= LOAD ALL FRIEND REQUESTS ================
    userService.downloadFriendRequests().then(function(res) {
        $scope.friendRequests = res.data;
        $scope.someRequests = $scope.friendRequests.slice(0, 5);
        $scope.loadMore = function() {
            $scope.someRequests = $scope.friendRequests.slice(0, $scope.someRequests.length + 5);
        };
    });

}]);