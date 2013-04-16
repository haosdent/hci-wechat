module.exports = (
    function(){
        var fs = require('fs')
          , userPath = './members.csv'
          , User;

        User = {
            init: function(){
                var that = this;
                fs.readFile(userPath, 'utf8', function(err, data){
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

        User.init();

        return {
            User: User
        };
    }
).call(this);
