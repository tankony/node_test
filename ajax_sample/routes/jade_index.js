//test data
var datas = {
miyamoto:{name: 'karin', mail:'miyamoto@hoge.com', tel:'090-9999-9999'},
         uemura:{name: 'akari', mail:'uemura@huga.com', tel:'090-9999-9990'}
};

exports.index = function(req, res) {
  res.render('jade_index', {
    title: 'jade test',
    msg: 'This page is jade index test.',
    datas: datas
      });
};
