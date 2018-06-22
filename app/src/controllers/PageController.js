app.controller('PageController', ['$scope', '$stateParams', 'Post', function ($scope, $stateParams, Post) {
    console.log('in PageController: '+ JSON.stringify($stateParams));
    $scope.post = {
        title: 'Title',
        writer: 'Sait Nuri Uyanık',
        post_date: '11.02.2018',
        read_number: '1392'
    };

    // Post.getPost().then(function (res) {
    //     console.log(res.data);
    // });
}]);