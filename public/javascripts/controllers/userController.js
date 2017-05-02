app.controller('userController', ['$http', '$scope', '$rootScope', 'userService', function($http, $scope, $rootScope, userService) {
    var url = window.location.href;
    var userId = url.substring(url.lastIndexOf('/') + 1);

    // ================== LOAD ALL USER POSTS ===================
    if (userId) {
        userService.downloadUserPosts(userId).then(function(res) {
            $scope.posts = res.data;

            $scope.somePosts = $scope.posts.slice(0, 5);
            $scope.loadMore = function() {
                $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
            };
        });
    }

    // ============= GET CURRENT USER/SHOW FRIENDS PROFILES =======================
    userService.getCurrentUser().then(function(res) {
        $rootScope.user = res.data[0];
        $scope.isCurrentUser = true;
        if (userId === $rootScope.user._id || userId === "") {
            $scope.isCurrentUser = true;
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
            //show input add new post
            $('.addPost').show()

            // ===================== ADD PHOTO BUTTON - MODAL WINDOW ==============
            $scope.uploadPhoto = function() {
                $(".overlay, #uploadPhoto").show();

                $(".close-photo").on('click', function() {
                    $(".overlay, #uploadPhoto").hide();
                });
            };

            //show upload photo button
            $('#uploadPhotoBtn').show();

        } else {
            $scope.isCurrentUser = false;
            //hide input add new post
            $('.addPost').hide();
            //hide upload photo button
            $('#uploadPhotoBtn').hide();
            //================== GET USER PROFILE =====================
            userService.getUserProfile(userId).then(function(res) {
                $rootScope.profile = res.data[0];
            });
        }
    });


    // ============= SEARCH USER BY FULL NAME ================
    $scope.filterUsers = function() {
        var userName = $('.search').val();

        function loadUsersByName() {
            userService.getUsers(userName).then(function(res) {
                $scope.users = res.data;
            });
        }
        setTimeout(loadUsersByName, 500);
    };

    // ================= SHOW DROP DOWN WITH FOUND USERS BY FULL NAME  =========
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

    // ===================== PHOTO ATTACHED ======================
    $('.input-files').on('change', function() {
        console.log($('.input-files'))
        if ($('.input-files').val()) {
            $('.file-attached').show();
        } else {
            $('.file-attached').hide();
        }
    });
    // ======================= ADD UPLOAD PICTURE TO POST ==================
    $scope.addImageBtnPost = function() {
        // $('#create-post .btnPicture').on('click', function() {
        $('.create-post input[type=file]').click();
        // });
    };
    // $scope.addImageBtnPost();

    // $scope.addImageBtnPhoto = function() {
    // $('#add-photo .btnPicture').on('click', function() {
    // $('#add-photo input[type=file]').click();
    // });
    // };
    // $scope.addImageBtnPhoto();

}]);