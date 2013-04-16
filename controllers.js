module.exports = (
    function(){
        var model = require('./models')
          , helper
          , introducer
          , noticer
          , user
          , feedbacker;

        helper = {
            error: function(req, res, next){
                var reply = '错误的命令，如有疑问，请输入"0"查询使用帮助';
                res.reply(reply);
            }
          , tip: function(req, res, next){
                var reply = ['使用帮助:请输入下列功能所对应的序号执行指令', '1:工作室简介', '2:工作室部门', '3:最近活动', '4:查询成员联系方式(如:"4 梁广彬")', '5:反馈意见'].join('\n');

                res.reply(reply);
            }
        };

        introducer = {
            intro: function(req, res, next){
                var reply = '人机交互工作室（Human Computer Interaction Student Section）简称HCI@SCAU，是由华南农业大学计算机爱好者组建而成的学生创新实验室。 本团队最初创建于2004年，宗旨是为更多的计算机爱好者提供一个技术交流、学习和创新的平台。团队以项目为驱动，鼓励学生参加各种专业性学科竞赛和创新性研究，帮助学生拓展专业知识，锻炼学生自主研发的能力以及团队合作精神，致力于培养出符合IT行业需求的技术型人才。';
                res. reply(reply);
            }
          , department: function(req, res, next){
                var reply = ['用户体验部', '后台研发部', '移动开发部', '系统测试部'].join('\n');
                res.reply(reply);
            }
        };

        noticer = {
            activity: function(req, res, next){
                var reply = '暂时还没有开放查询活动功能';
                res.reply(reply);
            }
        };

        user = {
            find: function(req, res, next){
                var params = req.weixin.content.split(' ');
                if(params.length === 1) {
                    var err = new Error();
                    err.name = 'CommandFormatError';
                    err.message = 'Command format error!';
                    throw err;
                };

                var name = params[1];
                var users = model.User.findByName(name);
                res.reply(users.format());
            }
        };

        feedbacker = {
            opinion: function(req, res, next){
                var reply = '谢谢您宝贵的意见，我们会积极改进。';
                res.reply(reply);
            }
        };

        return {
            helper: helper
          , introducer: introducer
          , noticer: noticer
          , user: user
          , feedbacker: feedbacker
        };
    }
).call(this);