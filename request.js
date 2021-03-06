const domain = require('domain');

class RequestHandler {

    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.req = request;
        this.res = response;
    }

    onPrepare() {
    }

    onFinish() {
    }

    get() {
        this.res.end(403)
    }

    post() {
        this.res.end(403)
    }

    put() {
        this.res.end(403)
    }

    delete() {
        this.res.end(403)
    }

    patch() {
        this.res.end(403)
    }

    options() {
        this.res.end(403)
    }

    onException(e) {
        this.response._end();
    }

    static process() {
        const constructor = this.prototype.constructor
        return function(request, response) {

            const handler = new constructor(request, response);

            // handle uncatched exception
            const _domain = domain.create();
            _domain.on('error', function(err) {
                handler.onException(err);
            })
            _domain.add(request);
            _domain.add(response);

            handler.onPrepare();

            // handle end callback
            response._end = response.end;
            response.end = function(data, encoding, callback) {
                handler.onFinish()
                response._end(data, encoding, callback);
            }

            handler[request.method.toLowerCase()]();
        }


    }

}

exports.RequestHandler = RequestHandler;
