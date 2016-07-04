var iconv 
iconv = require('iconv').Iconv;

exports.isRunError = function(body) {
  var html = new iconv('GBK','UTF-8').convert(body).toString()
  return html.indexOf('错误代码') !== -1 //todo 判断接口调用是否正确
}
 