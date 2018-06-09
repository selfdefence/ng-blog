app.directive("popularPost", function () {
    return {
        restrict: 'EA',
        templateUrl: 'dist/partials/directive/popular.directive.html',
        scope: true,
        replace: true,
        link: function (scope, element, attribute) {
            element.addClass('popularClass');
        }
    };
});