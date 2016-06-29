"use strict";

var get_direct_url, iconv, isRunError, mapi;

mapi = require('../lib/mechant.alipay.server.utils');
instance = new mapi() //instance = new mapi(config)
iconv = require('iconv').Iconv;

isRunError = function(body) {
  var html;
  html = new iconv('GBK', 'UTF-8').convert(body).toString();
  return html.indexOf('错误代码') !== -1;
};

//获取即时到帐url
get_direct_url = function(data) {
  return instance.create_direct_pay_by_user(data, function(error, result) {
    if (result.statusCode === 200 || result.statusCode === 302) {
      if (result.body && isRunError(result.body)) {
        console.log('支付宝接口调用失败(权限不足或者参数有误)');
        return {
          error: '支付宝接口调用失败(权限不足或者参数有误)'
        };
      } else {
        return {
          url: "https://" + result.request.host + result.request.path + "?" + result.request.body
        };
      }
    } else {
      console.log('支付宝接口出错');
      return {
        error: '支付宝接口出错'
      };
    }
  });
};
var data = {
  extra_common_param: 'test'
  total_fee: '0.01'
  subject: '测试商品'
};
console.log(get_direct_url({data}));
