var app = angular.module('BlogApp', ['ngMaterial', 'ui.router']);


app.run(['$rootScope', function ($rootScope) {
    $rootScope.title = "Anasayfa";
    $rootScope.changeContentTitle = function (new_title) {
        $rootScope.title = new_title;
    };
}]);