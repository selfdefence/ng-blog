app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var routes = {
        home: {
            main_route:{
                name: 'home',
                url: '/home',
                templateUrl: 'dist/partials/main_container.html',
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $rootScope.setContentTitle("Anasayfa");
                }]
            },
            children:[]
        },
        articles:{
            main_route:{
                name: 'articles',
                url: '/articles',
                templateUrl: 'dist/partials/articles.html',
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $rootScope.setContentTitle("Makaleler");
                }]
            },
            children:[]
        },
        documents:{
            main_route:{
                name: 'documents',
                url: '/documents',
                templateUrl: 'dist/partials/documents.html',
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $rootScope.setContentTitle("Dokümanlar");
                }]
            },
            children:[]
        },
        about:{
            main_route:{
                name: 'about',
                url: '/about',
                templateUrl: 'dist/partials/about.html',
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $rootScope.setContentTitle("Hakkımda");
                }]
            },
            children:[]
        }
    };

    // Default page
    $urlRouterProvider.otherwise(routes.home.main_route.url);

    $stateProvider.state(routes.home.main_route);
    $stateProvider.state(routes.articles.main_route);
    $stateProvider.state(routes.documents.main_route);
    $stateProvider.state(routes.about.main_route);
}]);