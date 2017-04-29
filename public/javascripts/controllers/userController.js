app.controller('userController', ['$http', '$scope', '$rootScope', 'userService', function($http, $scope, $rootScope, userService) {
    // ================== LOAD ALL USER POSTS ===================
    userService.downloadUserPosts().then(function(res) {
        $scope.posts = res.data;

        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function() {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });

    // ============= GET CURRENT USER =======================
    userService.getCurrentUser().then(function(res) {
        $rootScope.user = res.data[0];
    });

    // ============= SEARCH USER BY FULL NAME ================
    $scope.filterUsers = function() {
        var userName = $('.search').val();

        function loadUsersByName() {
            userService.getUsers(userName).then(function(res) {
                $scope.users = res.data;
            });
        }
        setTimeout(loadUsersByName, 1000);
    };

    // ================= SHOW DROPDOWN WITH FOUND USERS BY FULL NAME  =========
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

    // ===================== SHOW USER TIMELINE FIRST =====================
    $scope.show = 1;

    // ===================== ADD PHOTO BUTTON - MODAL WINDOW ==============
    $scope.uploadPhoto = function() {
        $(".overlay, #uploadPhoto").show();

        $(".close-photo").on('click', function() {
            $(".overlay, #uploadPhoto").hide();
        })
    };

    // ===================== BUTTONS FOR UPLOADING AVATAR/COVER PHOTOS ==========
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