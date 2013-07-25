
var express = require('express'),
    google = require("../routes/google"),
    path = require('path');

module.exports = function(app, config) {

console.log("configuring express");
// all environments


    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("google-node"));
    app.use(express.session({secret: 'glazieprego'}));
    app.use(app.router);
    app.use(express.static(path.join(config.root, 'public')));

//    config.google.CLIENT_ID = config.google.ci;
//    config.google.CLIENT_SECRET = app.get('clientSecret');

// development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
}