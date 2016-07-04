var crypto, fs, qs;

qs = require('querystring');

fs = require('fs');

crypto = require('crypto');


/**
 * 把对象所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
 * @param params 需要拼接的对象
 * @param 
 * return 拼接完成以后的字符串
 */

exports.stringify = function(params, quotes) {
  var k, ls;
  quotes = quotes || false;
  ls = '';
  for (k in params) {
    if (typeof params[k] === 'object') {
      ls += k + '=' + JSON.stringify(params[k]) + '&';
    } else {
      ls += k + '=' + params[k] + '&';
    }
  }
  return ls.substring(0, ls.length - 1);
};


/**
 * 移除参数对象中的空值和不参与签名的参数
 * @param {JSON} object 接收到的参数对象
 * @param {Array} excepts 不参与签名的属性字符串数组, 默认为[]
 * @param {Boolean} allowempty 是否允许空值(即是否不过滤空值)，默认为false
 * @return {JSON} 处理后的新签名参对象
 */

exports.objectFilter = function(object, excepts, allowempty) {
  var k, param_filter;
  excepts = excepts || [];
  allowempty = allowempty || false;
  param_filter = {};
  for (k in object) {
    if (!allowempty && object[k] === '' || ~excepts.indexOf(k)) {
      continue;
    } else {
      param_filter[k] = object[k];
    }
  }
  return param_filter;
};


/**
 * 对对象排序
 * @param {JSON} param 排序前的对象
 * @return {JSON} 排序后的对象
 */

exports.sortObject = function(object) {
  var index, key, keys, sortedObj;
  sortedObj = {};
  keys = Object.keys(object);
  keys.sort(function(key1, key2) {
    key1 = key1.toLowerCase();
    key2 = key2.toLowerCase();
    if (key1 < key2) {
      return -1;
    }
    if (key1 > key2) {
      return 1;
    }
    return 0;
  });
  for (index in keys) {
    key = keys[index];
    sortedObj[key] = object[key];
  }
  return sortedObj;
};


/**
 * 生成签名
 * @param {String} prestr 待签名的源字符串
 * @param {String} key_file 私钥文件所在路径
 * @return {String} 签名值
 */

exports.sign = function(prestr, key_file) {
  var pem, prikey, signob, signstr;
  pem = fs.readFileSync(key_file);
  prikey = pem.toString('ascii');
  signob = crypto.createSign('RSA-SHA1');
  signob.update(prestr, 'utf8');
  signstr = signob.sign(prikey, 'base64');
  return signstr;
};


/**
 * 验证签名
 * @param {String} prestr 需要签名的字符串
 * @param {String} sign 签名结果
 * @param {String} cert_file 支付宝公钥文件路径
 * @return {Boolean} 是否通过验证
 */

exports.verify = function(prestr, sign, cert_file) {
  var publicKey, publicPem, verifyob;
  publicPem = fs.readFileSync(cert_file);
  publicKey = publicPem.toString('ascii');
  verifyob = crypto.createVerify('RSA-SHA1');
  verifyob.update(prestr, 'utf8');
  return verifyob.verify(publicKey, sign, 'base64');
};
