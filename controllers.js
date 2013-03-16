module.exports = (
    function(){
        var model = require('./models')
          , test
          , user;

        test = {
            get: function(req, res, next){
                var name = req.params.name;

                var users = model.User.findByName(name);
                res.send(users.format());
            }
        };

        user = {
            add: function(req, res, next){
            }
          , get: function(req, res, next){
                var msg = req.weixin;
                if(msg.MsgType !== 'text') return;

                var name = msg.Content;
                if(name === undefined) return;
                var users = model.User.findByName(name);
                res.reply(users.format());
            }
          , update: function(req, res, next){
            }
          , del: function(req, res, next){
            }
        };

        return {
            user: user
          , test: test
        };
    }
).call(this);