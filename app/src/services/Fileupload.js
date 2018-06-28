app.service('fileUpload', ['$http', '$q', function ($http, $q) {
    this.uploadFileToUrl = function(file, uploadUrl, input){

        var fd = new FormData();
        fd.append('file', file);

        fd.append('input', JSON.stringify(input));

        return $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };
}]);