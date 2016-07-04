var _, openAlipayRequest, request, signUtil;

_ = require('lodash');

request = require('request');

signUtil = require('../alipay/sign.server.utils');

openAlipayRequest = function() {
  var self;
  self = this;
  self.open_api_url = 'https://openapi.alipay.com/gateway.do';
  self.alipay_config = {
    app_id: '*',
    format: 'JSON',
    charset: 'utf-8',
    sign_type: 'RSA',
    version: '1.0',
    rsa_private_key: '****',
    ali_public_key: '****'
  };
  self.defalut_options = {
    qs: {
      charset: 'utf-8'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    }
  };
  self.request = function(data, callback) {
    var options, sign;
    sign = void 0;
    data.app_id = data.app_id || self.alipay_config.app_id;
    data = signUtil.sortObject(data);
    data = signUtil.objectFilter(data);
    sign = signUtil.stringify(data);
    sign = signUtil.sign(sign, self.alipay_config.rsa_private_key);
    data.sign = sign;
    data.biz_content = JSON.stringify(data.biz_content);
    options = {
      method: 'POST',
      url: self.open_api_url,
      form: data
    };
    return request(_.extend(options, self.defalut_options), callback);
  };
  self.verify = function(param, sign) {
    var data, prestr;
    prestr = void 0;
    data = signUtil.sortObject(data);
    data = signUtil.objectFilter(data);
    prestr = signUtil.stringify(data);
    return signUtil.verify(prestr, sign, self.alipay_config.ali_public_key);
  };
  self.getOrderContent = function() {
    return {
      "out_trade_no": new Date().getTime(),
      "seller_id": "*",
      "total_amount": 0.01,
      "subject": "***",
      "body": "***",
      "operator_id": "vip_001",
      "timeout_express": "1c"
    };
  };
  self.alipay_trade_precreate = function(notify_url, callback) {
    var param;
    param = {
      'app_id': self.alipay_config.app_id,
      'method': 'alipay.trade.precreate',
      'format': self.alipay_config.format,
      'charset': self.alipay_config.charset,
      'sign_type': self.alipay_config.sign_type,
      'version': self.alipay_config.version,
      'notify_url': notify_url,
      'biz_content': self.getOrderContent(),
      'timestamp': '2016-06-13 01:07:50' //todo
    };
    return self.request(param, callback);
  };
  return self;
};

module.exports = new openAlipayRequest();

