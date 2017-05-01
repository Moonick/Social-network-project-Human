var app = angular.module('myApp', ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.htm",
        controller: 'postController'
    }).when('/profile/:userId', {
        templateUrl: "../views/profile.htm",
        controller: 'userController'
    });

});
app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});