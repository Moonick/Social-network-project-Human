var app = angular.module('myApp', ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.htm",
        controller: 'postController'
    });
    // .when('/', {
    //     templateUrl: "",
    //     controller: 'userController'
    // });

});