var iconv 
iconv = require('iconv').Iconv;

exports.isRunError = function(body) {
  var html = new iconv('GBK','UTF-8').convert(body).toString()
  return html.indexOf('错误代码') !== -1 //todo 判断接口调用是否正确
}

exports.getRequestCallback = funtciont(){
	return function(error, result) {
	  if (result.statusCode === 200 || result.statusCode === 302) {
	    if (result.body && this.isRunError(result.body)) {
	      console.log('支付宝接口调用失败(权限不足或者参数有误)');
	      if(callback){
	        callback({error: '支付宝接口调用失败(权限不足或者参数有误)'});
	      }
	    } else {
	      if(callback){
	        callback(null, {url: "https://" + result.request.host + result.request.path + "?" + result.request.body});
	      }
	    }
	  } else {
	    console.log('支付宝接口出错');
	    if(callback){
	      callback({error: '支付宝接口出错'});
	    }
	  }
	}	 
}
	