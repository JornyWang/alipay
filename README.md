# alipay
alipay nodejs 支付宝支付 即时到帐

# install
npm install alipay.wang

# default config
```
config = {
	app_id: '*',  //appid
  partner: '*', //partnerId
  seller_id: '*', //商户号id
  seller_email: '*', //商户号账号
  format: 'JSON',
  sign_type: 'RSA',
  version: '1.0',
  charset: 'utf-8',
  _input_charset: 'utf-8',
  direct_notify_url: '****',   //支付异步通知地址
  direct_return_url: '***',   //支付同步通知地址
  show_url: '***',           //商品展示页url
  rsa_private_key: '****',   //私钥存储路径
  ali_public_key: '****',    //ali 公钥存储路径
}

```
# 即时到账

```
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
```

# 手机网站支付
```
var mapi;
alipay = require('alipay.wang');
instance = new alipay.mapi() //instance = new alipay.mapi(config)
var data = {
  extra_common_param: 'test',
  total_fee: '0.01',
  subject: '测试商品',
  show_url: '你的商品展示页的url',
  body: '商品描述'
};
var callback = function(err, result){
  console.log(err);
  console.log(result);
};
instance.get_wap_pay_url({data}, callback)
```

#其他接口上线中。。

