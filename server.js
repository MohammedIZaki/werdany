var StaticServer = require('static-server');

var server = new StaticServer({
    rootPath: './dist/',
    port: 8000
    // ,
    // name: 'my-http-server',
    // host: '10.0.0.100',
    // cors: '*',
    // followSymlink: true,
    // templates: {
    //     index: 'foo-html',
    //     notFound: '404.html'
    // }
});

server.start(function(){
    console.log('srever listining to ' , server.port);
});