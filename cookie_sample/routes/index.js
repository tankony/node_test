
/*
 * GET home page.
 */


exports.index = function(req, res){
  var msg = '';
  var cookie = req.cookies;
  if (cookie != undefined) {
    msg = 'Cookie:'+ cookie.msg;
  }

  res.render('index', {
    title: 'Cookie TEST',
    msg: msg
  });
};

//クッキー削除用
exports.erase = function(req, res) {
  var key = req.params.key;

  //URLパラメータで指定したCookieを削除
  res.clearCookie(key);
  res.render('index', {
    title: 'Cookie Delete TEST',
    msg: key + 'Cookieを削除しました。'
  });
};

