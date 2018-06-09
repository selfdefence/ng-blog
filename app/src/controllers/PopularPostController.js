app.controller('PopularPostController', ['$scope', 'PopularPost' ,function ($scope, PopularPost) {
    PopularPost.getContent();

    $scope.posts = [{id:'1'}, {id:'2'}, {id:'3'}];
}]);
