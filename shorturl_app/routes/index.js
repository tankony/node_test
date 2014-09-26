var async = require('async'),
    app   = require('../index'),
    util  = require('../models/util'),
    db    = app.get('db');
/*
 * GET home page.
 */

//initial view
exports.index = function(req, res){
  res.render('index', { new_url: 'ここに変換後のURLが表示されます。。。' });
};



//register view
exports.register = function(req, res){
  var url = req.body.url;

  async.waterfall([
    //URLの検証
    function(_callback) {
      if( /^https?:\/\/.+\..+/.test(url)) {
        _callback(null);
      }
      //入力内容が不正な場合
      else {
        return _callback({message: '入力内容が不正です。。。'});
      }
    },
    //URLが既に登録済みかどうかの判定
    function(_callback) {
      util.isRegistUrl(url, _callback);
    }
  ], function(err, result) {
    //入力内容不正な場合
    if(err) {
      res.render('index', { new_url: err.message });
    }
    else {
      //登録済の場合
      if(result) {
        res.render('index', { new_url: 'http://kontany.net:9999/'+result });
      }
  
      //未登録の場合
      else {
        async.waterfall([
          function(_callback) {
            util.insertUrl(url, _callback);
          },
          function(id, _callback) {
            var enc_id = util.base64_enc(String(id));
            _callback(null, enc_id);
          }
        ], function (err, enc_id) {
          
          var res_word;
  
          if(err) {
            res_word = err;
          }
          else {
            res_word = 'http://kontany.net:9999/'+ enc_id;
          }
          res.render('index', { new_url: res_word });
        });
      }
    }
  });
};



//redirecter 
exports.redirector = function(req, res){

  var id = req.params.id;

  async.waterfall([
    function(_callback) {
      util.getRedirectUrl(id, _callback);
    }
  ], function(err, url) {
    //登録済みURLの場合
    if (url) {
      res.redirect(url);
    }
    //未登録の場合
    else {
      res.render('index', { new_url: '不正なURLアクセスです' });
    }
  });
};




