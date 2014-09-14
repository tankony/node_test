var http     = require('http'),
    fs       = require('fs'),
    ejs      = require('ejs'),
    url      = require('url'),
    cookie   = require('cookie');

var index1 = fs.readFileSync('./index1.ejs', 'utf8');

var server = http.createServer();
server.on('request', doRequest);
server.listen(9999);


function doRequest(req, res) {
  var path = url.parse(req.url);

  switch (path.pathname) {

    case '/':
      // 設定されているCookieをパースして取得
      // cookie.parse().<key> で各要素<value>にアクセスできる
      var parsed_cookie = cookie.parse(req.headers.cookie);

      var tmp = ejs.render(index1, {
        title: "Cookie Sample Page",
        msg: "Cookie:" + parsed_cookie.lastURL + ", "+parsed_cookie.lastTime
      });
      res.setHeader('Content-Type', 'text/html');
      res.write(tmp);
      res.end();
      break;


    //Cookieモジュールを利用して、
    //last-timeのCookieを埋め込む
    //cookie.seriarize(<key>, <value>, JSON(<option>))
    case '/set_time':
      var d = new Date().toDateString();
      var serialized_cookie1 = cookie.serialize('lastTime', 'アクセス日時:'+ d, {
        maxAge : 100 //有効期間を100秒に設定
      });

      res.setHeader('Set-Cookie', serialized_cookie1);
      res.write('Cookie lastTime set!!');
      res.end();
      break;

    //favicon.icoへのアクセスは無視
    case '/favicon.ico':
      break;


    default:
      res.setHeader('Content-Type', 'text/plain');

      var serialized_cookie2 = cookie.serialize('lastURL', path.pathname, {
        maxAge : 100 //有効期間を100秒に設定
      });
      res.setHeader('Set-Cookie', serialized_cookie2);
      res.write('Set Cookie!!');
      res.end();
      break;
  }
}
console.log('Server is running...');

