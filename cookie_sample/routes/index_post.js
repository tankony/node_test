exports.index = function(req, res) {
  var text1 = req.body.text1;
  res.cookie("msg", text1, {
    maxAge: 30000  
  });
  res.render('index', {
title: 'Cookie TEST',
msg: text1+'クッキーを保存しました'
  });

}
