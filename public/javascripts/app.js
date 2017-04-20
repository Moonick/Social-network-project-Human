var app = angular.module('myApp', ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "./javascripts/directives/posts.htm",
        controller: 'postController'
    });
    // .when('/', {
    //     templateUrl: "",
    //     controller: 'userController'
    // });

});