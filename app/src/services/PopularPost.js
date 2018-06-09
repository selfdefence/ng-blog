app.provider('PopularPost', function () {
    this.request = {
        method: '',
        url: ''
    };

    this.setRequestUrl = function (new_url) {
        this.request = new_url;
    };

    this.setRequest = function (new_request) {
        this.request = new_request;
    };

    this.$get = ['$q', 'Requester', function ($q, Requester) {

        var request = this.request;

        return {
            getContent: function () {
                if (request.url === '' || request.method === ''){
                    console.log('PopularPost: invalid request method or url');
                    return null;
                }

                return Requester.request(request);
            }
        };
    }];
});