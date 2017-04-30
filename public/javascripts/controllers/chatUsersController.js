 app.controller('chatUsersController', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService) {
     // ============= SEARCH USER BY FULL NAME ================
     $scope.filterUsersForChat = function() {
         var userName = $('.searchChat').val().trim();

         function loadUsersByName() {
             userService.getUsers(userName).then(function(res) {
                 $scope.chatUsers = res.data;
             });
         }
         setTimeout(loadUsersByName, 1000);
     };
     // ================= SHOW DROPDOWN WITH FOUND USERS BY FULL NAME  =========
     $scope.showUsersForChat = function() {
         if ($('.searchChat').val() !== "") {
             $('.searchFriendsChat').show();
         } else {
             $('.searchFriendsChat').hide();
         }
         $('body').on('click', function(evt) {
             if (evt.target.id == "searchFriendsInputChat" || evt.target.className == "searchFriendsChat") {
                 return;
             }
             $('.searchFriendsChat').hide();
         })
     };

 }]);