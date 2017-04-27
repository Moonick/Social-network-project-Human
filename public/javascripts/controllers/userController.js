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

    $scope.filterUsers = function() {
        var userName = $('.search').val();


        function loadUsersByName() {
            userService.getUsers(userName).then(function(res) {
                $scope.users = res.data;
                if (userName !== '') {
                    $('.searchFriends').show();
                } else {
                    $('users').html("");
                    $('.searchFriends').hide();
                }
            });
        }
        setTimeout(loadUsersByName, 1000);



    };

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

    $scope.showUsers = function() {
        $scope.IsVisible = $scope.IsVisible ? false : true;
        if ($scope.IsVisible) {
            $("body").css("overflow", " hidden");
        } else {
            $("body").css("overflow", " auto");
        }


    };

}]);