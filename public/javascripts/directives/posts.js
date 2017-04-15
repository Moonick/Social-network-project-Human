app.directive('posts', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/posts.htm',
        link: function(scope) {
            scope.hidePost = function() {
                scope.$parent.posts.splice(scope.$parent.posts.indexOf(scope.data), 1);
            };
        }
    };
});;