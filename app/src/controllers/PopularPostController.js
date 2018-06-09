app.controller('PopularPostController', ['$scope', 'PopularPost' ,function ($scope, PopularPost) {
    PopularPost.getContent();
}]);
