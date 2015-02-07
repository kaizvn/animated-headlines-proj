/**
 * Created by kaizzige on 2/1/15.
 */

var connect = require('connect')
    , serveStatic = require('serve-static')
    , open = require('open')
    , path = __dirname + '/public'
    , PORT = 8181;


server = connect();

server
    .use(serveStatic(path))
    .listen(PORT, function () {
        console.log('server started!');
        open('http://localhost:' + PORT + '/animation.html', function () {
            console.log('Result page opened.');
        })
    });
