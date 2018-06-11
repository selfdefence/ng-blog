app.controller('PageController', ['$scope', '$stateParams', 'Post', function ($scope, $stateParams, Post) {
    console.log('in PageController: '+ JSON.stringify($stateParams));
    // Post.getPost().then(function (res) {
    //
    // });

}]);