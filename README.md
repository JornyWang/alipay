# alipay
alipay nodejs 支付宝支付 即时到帐

#install
npm install alipay.wang

#即时到账
```
var mapi;

mapi = require('../lib/mechant.alipay.server.utils');
instance = new mapi() //instance = new mapi(config)
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

#其他接口上线中。。

