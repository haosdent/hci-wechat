var CommandList = {
  help : "0:帮助\n"+
         "1:简介\n[HCI工作室简介];\n"+
         "2:部门\n[部门列表];\n"+
         "3:活动\n[获取最近活动信息];\n"+
         "4:用户,格式('4 人名')\n[获取用户信息];\n"+
         "5:意见('5 意见')\n[发送您意见]",
  activity: "暂时还没有开放查询活动功能",
  introduction : "人机交互工作室（Human Computer Interaction Student Section）简称HCI@SCAU，是由华南农业大学计算机爱好者组建而成的学生创新实验室。 本团队最初创建于2004年，宗旨是为更多的计算机爱好者提供一个技术交流、学习和创新的平台。团队以项目为驱动，鼓励学生参加各种专业性学科竞赛和创新性研究，帮助学生拓展专业知识，锻炼学生自主研发的能力以及团队合作精神，致力于培养出符合IT行业需求的技术型人才。",
  suggestion : "谢谢您宝贵的意见，我们会稍后审核的！",
  errorCommand : "错误的命令，如有疑问，请按'0'查询",
  department : "1:用户体验部\n"+
               "2:后台研发部\n"+
               "3:移动开发部\n"+
               "4:运维测试部"
};

module.exports = (
    function(){
        var mongo = global.mongo
          , fs = require('fs')
          , path = './members.csv'
          , User;

        /*userSchema.method('format', function(){
            var user = this.toJSON();
            var userStr = '';
            for(var k in user){
                userStr = k + user[k] + '\n';
            };
            return userStr;
        });*/

        User = {
            init: function(){
                var that = this;
                fs.readFile(path, 'utf8', function(err, data){
                    if(err) throw err;
                    data = data.split('\r\n');
                    data = data.map(function(e){
                               return e.split(',');
                    });
                    var head = data[0];
                    data = data
                           .slice(1, -1)
                           .map(function(e){
                               var datum = {};
                               for(var i = 0, l = head.length; i < l; i++){
                                   var value = e[i];
                                   if(value !== '' && value !== undefined){
                                       datum[head[i]] = e[i];
                                   };
                               };
                               return datum;
                           });

                    that.users = data;
                    return data;
                });
            }
          , findByName: function(name){
                var users = this.users;
                var result = users.filter(function(e){
                                 return e['姓名'].match(name)? true : false;
                             });
                result.format = this.format;

                return result;
            }
          , format: function(){
                var users = this;
                var userStr = '';
                for(var i = 0, l = users.length; i < l; i++){
                    var user = users[i];
                    for(var k in user){
                        userStr += '[' + k + ']:' + user[k] + '\n';
                    };
                    if(i < l - 1){
                        userStr += '------------\n';
                    };
                };
                if(users.length === 0){
                    userStr = '系统处于测试阶段，暂查询不到相关用户';
                };
                return userStr;
            }
        };

        var Command = {
          resolveCommand : function(command){
            command = command.replace(/^\s*/g,"");
            command = command.replace(/\s*$/g,""); 
            command = command.toLowerCase();
            if(command == "0")
              return CommandList.help;
            else if(command == "1")
              return CommandList.introduction;
            else if(command == "2")
              return CommandList.department;
            else if(command == "3")
              return CommandList.activity;
            else{
              var tempdata = command.split(" ");
              if(tempdata.length == 1)
                return CommandList.errorCommand;

              if(tempdata[0] == "4" && tempdata[1])
                return User.findByName(tempdata[1]).format();
              else if(tempdata[0] == "5" && tempdata[1])
                return CommandList.suggestion;
              else
                return CommandList.errorCommand;
              /*if((tempdata[0] == "get" || tempdata[0] == "1") && tempdata[1])
                return User.findByName(tempdata[1]).format();
              else if((tempdata[0] == "check" || tempdata[0] == "3") && tempdata[1])
                return User.findByName(tempdata[1]).format();
              else if((tempdata[0] == "suggestion" || tempdata[0] == "5") && tempdata[1])
                return CommandList.suggestion;
              else
                return CommandList.errorCommand;*/
            }
          }
        };

        return {
            User: User,
            Command : Command
        };
    }
).call(this);
