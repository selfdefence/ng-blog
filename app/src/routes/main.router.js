app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var routes = {
        home: {
            main_route:{
                name: 'home',
                url: '/home',
                templateUrl: 'dist/partials/main_container.html',
                controller: ['$scope', function ($scope) {

                }]
            },
            children:[]
        },
        articles:{
            main_route:{
                name: 'article',
                url: '/article'
            },
            children:[]
        },
        documents:{
            main_route:{
                name: 'document',
                url: '/document'
            },
            children:[]
        },
        about:{
            main_route:{
                name: 'about',
                url: '/about'
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