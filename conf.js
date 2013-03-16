module.exports = (
    function(){
        var express = require('express')
          , app = global.app;

        var general = function(){
	    app.set('port', process.env.PORT || 3000);
	    app.use(express.compress());
	    app.use(express.bodyParser());
	    app.use(express.methodOverride());
	    app.use(express.cookieParser('scauhci'));
	    app.use(express.session());
	    app.use(express.static(__dirname + '/../public'));
            app.use(express.logger());
            app.use(app.router);
        };

        var develop = function(){
            app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
        };

        var product = function(){
            app.use(express.errorHandler());
        };

        return {
	    general: general
          , develop: develop
          , product: product
        };
    }
).call(this);