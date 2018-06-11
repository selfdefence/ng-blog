app.directive("article", function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/directive/article.directive.html',
        scope: {
            page_info: '=param'
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attribute) {
            element.addClass('articleClass');
        }
    };
});