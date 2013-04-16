module.exports = (
    function(){
        var controller = require('./controllers');

        var route = {
            '-1': controller.helper.error
          , '0': controller.helper.msg
          , '1': controller.introducer.intro
          , '2': controller.introducer.department
          , '3': controller.noticer.activity
          , '4': controller.user.find
          , '5': controller.feedbacker.opinion
        };

        return function(req, res, next){
            var msg = req.weixin.replace(/^\s*/g,"").replace(/\s*$/g,"");
            route[msg] === undefined && msg = '-1';

            route[msg].apply(this, arguments);
        };
    }
).call(this);