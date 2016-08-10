const express = require('express');


const app = express();

const RequestHandler = require('./request.js').RequestHandler;


app.get('/', function(req, res) {
    console.log(req)
    res.send('hello world');
});


app.listen(8070, function() {
    console.log('start server listening 8070');
})

class TestRequestHandler extends RequestHandler {
    get() {
        this.response.json({r: 0})
    }

    post() {
        // error test
        throw 'error'
    }

    onPrepare() {
        console.log('prepare');
    }

    onFinish() {
        console.log('finish');
    }

    onException(err) {
        this.res.json({'error': err});
    }
}

// example
// a json request
class JsonRequestHandler extends RequestHandler {

    onPrepare() {
        const contentType = this.req.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') != 0) {
            throw 'not json request';
        }
    }

    get() {
        this.response.json({r: 0})
    }

    onException(err) {
        this.res.json({'error': err});
    }
}

app.all('/test', TestRequestHandler.process());
