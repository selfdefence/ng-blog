app.controller('PopularPostController', ['$scope', 'PopularPost' ,function ($scope, PopularPost) {
    PopularPost.getContent()
        .then(function (response) {
            $scope.posts = response.data;
        });
}]);
