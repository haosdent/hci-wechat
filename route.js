module.exports = (
    function(){
        var controllers = require('./controllers');

        var route = {
            '-1': controllers.helper.error
          , '0': controllers.helper.tip
          , '1': controllers.introducer.intro
          , '2': controllers.introducer.department
          , '3': controllers.noticer.activity
          , '4': controllers.user.find
          , '5': controllers.feedbacker.opinion
          , '6': controllers.dispenser.status
        };

        return function(req, res, next){
            var msg = req.weixin;
            if(msg.MsgType !== 'text') return;
            var content = msg.Content;
            if(content === undefined) return;

            var index = content.split(' ')[0];
            index.match('饮水机') !== null && (index = 6);
            route[index] === undefined && (index = '-1');

            try{
                route[index](req, res, next);
            }catch(err){
                route['-1'](req, res, next);
            };
        };
    }
).call(this);