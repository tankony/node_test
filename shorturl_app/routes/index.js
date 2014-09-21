var async = require('async'),
    app   = require('../index'),
    db    = app.get('db');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.redirector = function(req, res){
  var id = req.params.id;
  res.render('index', { title: id });
};
