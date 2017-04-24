var app = angular.module('myApp', ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.htm",
        controller: 'postController'
    }).when('/profile', {
        templateUrl: "../views/profile.htm",
        controller: 'userController'
    }).when('/photosTest', {
        templateUrl: "../views/photosTest.htm",
        controller: 'userController'
    });

});