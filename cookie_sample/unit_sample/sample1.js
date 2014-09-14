var http  = require('http'),
    fs    = require('fs'),
    ejs   = require('ejs'),
    url   = require('url');

var index1 = fs.readFileSync('./index1.ejs', 'utf8');

var server = http.createServer();
server.on('request', doRequest);
server.listen(9999);


function doRequest(req, res) {
  var path = url.parse(req.url);

  switch (path.pathname) {

    case '/':
      // 設定されているCookieを取得
      var cookie = req.headers.cookie;

      var tmp = ejs.render(index1, {
        title: "Cookie Sample Page",
        msg: "Cookie:" + cookie
      });
      res.setHeader('Content-Type', 'text/html');
      res.write(tmp);
      res.end();
      break;

    //favicon.icoへのアクセスは無視
    case '/favicon.ico':
      break;


    default:
      res.setHeader('Content-Type', 'text/plain');

      //ヘッダー情報としてCookieを埋め込んでおく
      //[key = value]
      //セッションCookieとして埋め込まれる
      res.setHeader('Set-Cookie', ['lastURL='+ 'パス:'+ path.pathname]);
      res.write('Set Cookie!!');
      res.end();
      break;
  }
}
console.log('Server is running...');
