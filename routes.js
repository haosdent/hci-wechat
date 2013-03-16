module.exports = (
    function(){
        var express = require('express')
          , app = global.app
          , wechatLib = require('wechat')
          , controller = require('./controllers');

        var web = function(){
            app.all('/general/user/:name?', function(req, res, next){
                var method = req.method;
                if(method === 'POST'){
                    controller.user.add(req, res, next);
                }else if(method === 'GET'){
                    controller.user.get(req, res, next);
                }else if(method === 'PUT'){
                    controller.user.update(req, res, next);
                }else if(method === 'DELETE'){
                    controller.user.del(req, res, next);
                };
            });
        };

        var test = function(){
            app.get('/general/user/:name', controller.test.get);
        };

        var wechat = function(){
            app.use('/wechat/user', wechatLib('scauhci', controller.user.get));
        };

        return {
            wechat: wechat
          , test: test
        };
    }
).call(this);