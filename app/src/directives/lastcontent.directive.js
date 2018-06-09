app.directive("lastContent", function () {
    return {
        restrict: 'E',
        templateUrl: 'dist/partials/directive/lastcontent.directive.html',
        scope: true,
        replace: true,
        controller: ['$scope', function ($scope) {
            console.log($scope);
        }],
        link: function (scope, element, attribute) {
            element.addClass('lastContentClass');
        }
    };
});