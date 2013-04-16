module.exports = (
    function(){
        var model = require('./models')
          , test
          , cmd
          , user;

        test = {
            get: function(req, res, next){
                var msg = req.weixin;
                if(msg.MsgType !== 'text') return;

                var name = msg.Content;
                if(name === undefined) return;
                var command = model.Command.resolveCommand(name);
                res.reply(command);
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

        cmd = {
        }

        return {
            user: user
          , test: test
          , cmd: cmd
        };
    }
).call(this);