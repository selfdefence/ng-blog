app.controller('PageController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    console.log('in PageController: '+ $stateParams.id);
}]);