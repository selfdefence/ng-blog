app.controller('PopularPostController', ['$scope', 'PopularPost' ,function ($scope, PopularPost) {
    PopularPost.getContent();

    $scope.posts = [{id:'1', type: 'article'}, {id:'2', type: 'article'}, {id:'3', type: 'article'}];
}]);
