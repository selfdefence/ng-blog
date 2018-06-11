app.directive("news", function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/directive/news.directive.html',
        scope: {
            page_info: '=param'
        },
        replace: true,
        link: function (scope, element, attribute) {
            element.addClass('newsClass');
        }
    };
});