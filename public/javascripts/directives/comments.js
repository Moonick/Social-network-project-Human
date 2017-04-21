app.directive('comments', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/comments.htm',
    };
});