var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "./javascripts/directives/posts.htm",
        controller: 'postController'
    })

});