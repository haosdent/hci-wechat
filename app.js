var express = require('express')
  , app = global.app = express()
  , http = require('http')
  , conf = require('./conf')
  , server = http.createServer(app)
  //, mongo = global.mongo = require('mongoose').connect('mongodb://localhost/hci_wechat')
  , model = require('./models');

app.configure(conf.general);
app.configure('development', conf.develop);
app.configure('production', conf.product);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});