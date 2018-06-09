var app = angular.module('BlogApp', ['ngMaterial', 'ui.router']);

app.config(['PopularPostProvider', 'LastContentProvider', 'ArticleProvider', 'DocumentProvider', 'PostProvider', function (PopularPostProvider, LastContentProvider, ArticleProvider, DocumentProvider, PostProvider) {
    PopularPostProvider.setRequestUrl({method:'GET', url: '/popularpost'});
    LastContentProvider.setRequestUrl({method:'GET', url: '/lastcontent'});
    ArticleProvider.setRequestUrl({method:'GET', url: '/article'});
    DocumentProvider.setRequestUrl({method:'GET', url: '/document'});
    PostProvider.setRequestUrl({method:'GET', url: '/post'});
}]);

app.run(['$rootScope', function ($rootScope) {
    $rootScope.title = "Anasayfa";
    $rootScope.setContentTitle = function (new_title) {
        $rootScope.title = new_title;
    };
}]);