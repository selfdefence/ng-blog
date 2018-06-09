app.service('Requester', ['$http', '$q', function ($http, $q) {

    // Bu metod diğer cağrı yapan servisler tarafından kullanılacak
    this.request = function (remote_obj) {
        var deferred = $q.defer();

        $http(remote_obj)
            .then(function successCallback(response) {
                console.log(response.status);
                deferred.resolve(response);
            }, function errorCallback(response) {
                console.log('Error status: ' + response.status);
                deferred.resolve(response);
            });

        return deferred.promise;
    };
}]);