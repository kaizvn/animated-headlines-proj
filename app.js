/**
 * Created by kaizzige on 2/1/15.
 */

var connect = require('connect')
    serveStatic = require('serve-static')
    , path = __dirname + '/public'
    , PORT = 8181;


server = connect();

server
    .use(serveStatic(path))
    .listen(PORT, function () {
        console.log('connected server at : localhost:%s', PORT);
    });
