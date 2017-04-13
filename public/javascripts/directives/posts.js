app.directive('posts', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascript/directives/posts.htm'
    };
});