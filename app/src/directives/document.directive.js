app.directive("document", function () {
    return {
        restrict: 'EA',
        templateUrl: 'dist/partials/directive/document.directive.html',
        scope: {
            page_info: '=param'
        },
        replace: true,
        link: function (scope, element, attribute) {
            element.addClass('documentClass');
        }
    };
});