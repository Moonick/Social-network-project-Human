app.controller('userController', ['$http', '$scope', '$rootScope', 'userService', function($http, $scope, $rootScope, userService) {

    userService.downloadUserPosts().then(function(res) {
        $scope.posts = res.data;

        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });
    // ============= get current user =======================
    userService.getCurrentUser().then(function(res) {
        $rootScope.user = res.data[0];
        console.log(res.data[0])
    });
    // ============= search users by full name ================
    $scope.filterUsers = function() {
        var userName = $('.search').val();

        function loadUsersByName() {
            userService.getUsers(userName).then(function(res) {
                $scope.users = res.data;
            });
        }
        setTimeout(loadUsersByName, 1000);
    };
    // ================= show dropdown with found users by full name =========
    $scope.showUsers = function() {
        if ($('.search').val() !== "") {
            $('.searchFriends').show();
        } else {
            $('.searchFriends').hide();
        }
        $('body').on('click', function(evt) {
            if (evt.target.id == "searchFriendsInput" || evt.target.className == "searchFriends") {
                return;
            }
            $('.searchFriends').hide();
        })
    };

    // ===================== show user timeline first =====================
    $scope.show = 1;

    // ===================== add photo button - modal window ==============
    $scope.uploadPhoto = function() {
        $(".overlay, #uploadPhoto").show();

        $(".close-photo").on('click', function() {
            $(".overlay, #uploadPhoto").hide();
        })
    };
    // ===================== buttons for profile and cover photo ==========
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