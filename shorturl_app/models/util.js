var app = require('../index'),
    db  = app.get('db'),
    async = require('async');


/*
 * base64_enc, base64_dec
 * base64エンコード、デコード処理を行う
 */
var base64_enc = function(plaintext) {
  var b = new Buffer(plaintext);
  return b.toString('base64');
}
exports.base64_enc = base64_enc;

var base64_dec = function(encrypted) {
  var b = new Buffer(encrypted, 'base64');
  return b.toString();
}
exports.base64_dec = base64_dec;

/*
 * urlをDBに登録します
 * @param url
 * @return insertId
 *
 */
var insertUrl = function(url,callback) {

  var query_string = 'insert into short_url (long_url) values (?)';
  
  async.waterfall([
    function(_callback) {
    
      _callback(null);
    },
    function(_callback) {
      db.query(query_string, [url], _callback);
    }
  ], function(err, fields) {
    if (err) {
      return callback(err.message, null);
    }
    callback(null, fields.insertId);
  });
}
exports.insertUrl = insertUrl;

//insertUrl('http://hogehoge.com',function(err, res){console.log(err+res)});


/*
 * urlが登録済みかどうかチェックします
 * @param url {String}
 * @return if regist -> base64_enc(id), else -> false
 */
var isRegistUrl = function(url, callback) {
  
  async.waterfall([

      // select
      function(_callback) {
        query_string = 'select id from short_url where long_url = ?';
        db.query(query_string, [url], _callback);
      },

      // 登録済みチェック&レスポンス設定
      function(result, fields, _callback) {

        // 登録済みの場合
        if (result[0]) {
          var id = result[0].id;
          var enc_id = base64_enc(String(id));
          _callback(null, enc_id);
        }
        
        // 未登録の場合
        else {
          _callback(null, false);
        }
      }
  ], function(err, res) {
    if (err) {
      return callback(err.message, null);
    }
    callback(null, res);
  });
};
exports.isRegistUrl = isRegistUrl;

//test
//isRegistUrl('http://hoge.com', function(err, res){console.log(res)});
//isRegistUrl('http://huga.com', function(err, res){console.log(res)});


/*
 * enc_idから、リダイレクト先のURLを返します
 * @param enc_id {String}
 * @return raw_url {String} , nothing -> false
 */
var getRedirectUrl = function(enc_id, callback) {
  
  var query_string = 'select long_url from short_url where id = ?';

  async.waterfall([
    //登録URLを取得
    function(_callback) {
      var id = base64_dec(enc_id);

      db.query(query_string, [id], _callback);
    
    },
    //後処理
    function(result, fields, _callback) {
      if(result[0]) {
        _callback(null, result[0].long_url);
      }
      else {
        _callback(null, false);
      }
    }
  ], function (err, raw_url) {
    if (err) {
      return callback(err.message, null);
    }
    callback(null, raw_url);
  });
};
exports.getRedirectUrl = getRedirectUrl;

//test
//getRedirectUrl('HG==', function(err, res){console.log('err:'+err+'res:'+res)});
//getRedirectUrl('MQ==', function(err, res){console.log('err:'+err+'res:'+res)});

