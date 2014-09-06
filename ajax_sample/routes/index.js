
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Ajax Test',
                        msg: '登録済みnameを入力すると詳細が返されます'});
};
