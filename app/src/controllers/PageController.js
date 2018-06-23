app.controller('PageController', ['$scope', '$stateParams', '$sce', 'Post', function ($scope, $stateParams, $sce, Post) {
    console.log('in PageController: '+ JSON.stringify($stateParams));
    $scope.post = {
        title: 'Title',
        writer: 'Sait Nuri Uyanık',
        post_date: '11.02.2018',
        read_number: '1392',
        content: ''
    };

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    Post.getPost('12').then(function (res) {
        //console.log(res.data);
        console.log(res.data);
        $scope.post.content = res.data;
    });
}]);