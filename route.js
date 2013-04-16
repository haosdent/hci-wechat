module.exports = (
    function(){
        var controller = require('./controllers');

        var route = {
            '-1': controller.helper.error
          , '0': controller.helper.tip
          , '1': controller.introducer.intro
          , '2': controller.introducer.department
          , '3': controller.noticer.activity
          , '4': controller.user.find
          , '5': controller.feedbacker.opinion
        };

        return function(req, res, next){
            var msg = req.weixin;
            if(msg.MsgType !== 'text') return;
            var content = msg.Content;
            if(content === undefined) return;

            var index = content.split(' ')[0];
            route[index] === undefined && index = '-1';

            try{
                route[index](req, res, next);
            }catch(err){
                route['-1'](req, res, next);
            };
        };
    }
).call(this);