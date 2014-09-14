
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var index_post = require('./routes/index_post');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 9999);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

//Cookieパーサミドルウェアを読み込む
app.use(express.cookieParser());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//クッキー削除用
//URLパラメータで削除するCookieを指定
app.get('/:key', routes.erase);

//クッキー登録用
app.post('/', index_post.index);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
