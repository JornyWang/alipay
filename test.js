"use strict";

var mapi;

alipay = require('alipay.wang');
instance = new alipay.mapi() //instance = new alipay.mapi(config)
var data = {
  extra_common_param: 'test'
  total_fee: '0.01'
  subject: '测试商品'
};
var callback = function(err, result){
  console.log(err);
  console.log(result);
};
instance.get_direct_pay_url({data}, callback)
