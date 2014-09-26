
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var mysql = require('mysql');
var app = module.exports = express();

// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

//mysql setting
var db = mysql.createPool(config.dbconfig);


// all environments
app.set('port', process.env.PORT || 9999);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname+'/public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('db', db);


//routing
var routes = {
  index : require('./routes/index')
};

app.get('/', routes.index.index);
app.post('/', routes.index.register);
app.get('/:id', routes.index.redirector);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
