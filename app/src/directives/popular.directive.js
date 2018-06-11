app.directive("popularPost", function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/directive/popular.directive.html',
        scope: {
            page_info: '=param'
        },
        replace: true,
        link: function (scope, element, attribute) {
            element.addClass('popularClass');
        }
    };
});