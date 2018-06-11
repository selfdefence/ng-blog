app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var routes = {
        home: {
            main_route:{
                name: 'home',
                url: '/home',
                templateUrl: 'partials/route/main_container.html',
                controller: ['$scope', '$rootScope', 'LastContent', function ($scope, $rootScope, LastContent) {
                    $rootScope.setContentTitle("Anasayfa");
                    LastContent.getContent();
                    $scope.pages = [{type: 'article', id:'123123'}, {type: 'news', id:'5432423'}];
                }]
            },
            children:[]
        },
        articles:{
            main_route:{
                name: 'articles',
                url: '/articles',
                templateUrl: 'partials/route/articles.html',
                controller: ['$scope', '$rootScope', 'Article', function ($scope, $rootScope, Article) {
                    $rootScope.setContentTitle("Makaleler");
                    Article.getArticles();
                    $scope.pages = [{type: 'article', id:'123123'}, {type: 'article', id:'5432423'}];
                }]
            },
            children: {
                page: {
                    name: 'articles.page',
                    url: '/:id',
                    params: {
                        id: null,
                        type: null
                    },
                    views: { // Targets unnamed view of root template (index.html)
                        "@": {
                            templateUrl: 'partials/route/page_container.html',
                            controller: 'PageController'
                        }
                    }
                }
            }
        },
        documents:{
            main_route:{
                name: 'documents',
                url: '/documents',
                templateUrl: 'partials/route/documents.html',
                controller: ['$scope', '$rootScope', 'Document', function ($scope, $rootScope, Document) {
                    $rootScope.setContentTitle("Dokümanlar");
                    Document.getDocuments();
                }]
            },
            children:[]
        },
        about:{
            main_route:{
                name: 'about',
                url: '/about',
                templateUrl: 'partials/route/about.html',
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
    $stateProvider.state(routes.articles.children.page);

    $stateProvider.state(routes.documents.main_route);
    $stateProvider.state(routes.about.main_route);
}]);