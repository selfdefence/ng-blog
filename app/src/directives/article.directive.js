app.directive("article", function () {
    return {
        restrict: 'EA',
        templateUrl: 'dist/partials/directive/article.directive.html',
        scope: {
            page_info: '=param'
        },
        replace: true,
        link: function (scope, element, attribute) {
            element.addClass('articleClass');
        }
    };
});