app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var routes = {
        home: {
            main_route:{
                name: 'home',
                url: '/home',
                templateUrl: 'partials/route/main_container.html',
                controller: ['$scope', '$rootScope', 'LastContent', function ($scope, $rootScope, LastContent) {
                    $rootScope.setContentTitle("Anasayfa");
                    LastContent.getContent().then(function (response) {
                        $scope.pages = response.data;
                    });
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
                    Article.getArticles().then(function (response) {
                        $scope.pages = response.data;
                    });
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
                    // Document.getDocuments().then(function (response) {
                    //
                    // });
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
        },
        admin:{
            main_route:{
                name:'admin',
                url: '/admin',
                templateUrl: 'partials/route/admin.html',
                controller: ['$scope', '$rootScope', 'fileUpload', function ($scope, $rootScope, fileUpload) {
                    $rootScope.setContentTitle("Admin Panel");

                    $scope.uploadFile = function(){
                        var file = $scope.myFile;
                        console.log('file is ' );
                        console.dir(file);
                        var uploadUrl = "/admin";
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                    };
                }]
            },
            children:{
                page: {
                    name: 'admin.article',
                    url: '/:id',
                    params: {
                        id: null,
                        type: null
                    },
                    views: { // Targets unnamed view of root template (index.html)
                        "@": {
                            templateUrl: 'partials/route/admin.article.html',
                            controller: []
                        }
                    }
                }
            }
        }
    };

    // Default page
    $urlRouterProvider.otherwise(routes.home.main_route.url);

    $stateProvider.state(routes.home.main_route);

    $stateProvider.state(routes.articles.main_route);
    $stateProvider.state(routes.articles.children.page);

    $stateProvider.state(routes.documents.main_route);

    $stateProvider.state(routes.about.main_route);

    $stateProvider.state(routes.admin.main_route);
}]);