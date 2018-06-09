app.controller('PopularPostController', ['$scope', 'PopularPost' ,function ($scope, PopularPost) {
    PopularPost.getContent();

    $scope.posts = ['1', '2', '3', '4', '5'];
}]);
