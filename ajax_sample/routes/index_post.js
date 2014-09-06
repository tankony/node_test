//test data
var data = {
miyamoto:{mail:'miyamoto@hoge.com', tel:'090-9999-9999'},
         uemura:{mail:'uemura@huga.com', tel:'090-9999-9990'}
};

exports.index = function(req, res) {
  var name = req.body.name;
  var result = data[name];
  if (result == undefined) {
    result = {mail:'not found', tel:'not found'};
  }
  res.send(result);
}
