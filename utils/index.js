const process = require('process');
/**
 * 包裹方法，使其自动错误重试
 * 只能包裹返回Promise的方法
 * 返回promise，可以获取成功的返回值，或最后失败的err
 * 需要运行环境支持ES6的Promise语法，或者使用Bluebird库
 * @param func
 * @param retryMax
 * @returns {funcR}
 */
autoRetry = function(func, retryMax) {
  retryNum = 0;
  let funcName = func.toString().match(/function (\w+)\(/)[1];
  return funcR = function () {
    let params = arguments;
    return new Promise((resolve, reject) => {
      func(...params).then(result => {
        resolve(result);
      }).catch(err => {
        if (retryNum < retryMax) {
          retryNum ++;
          console.warn(`[autoRetry] Catched error when ${funcName}() : ${err.message}. Retry ${retryNum} time...`);
          resolve(funcR(...params));
        } else {
          reject(err);
        }
      });
    });
  };
},
compareVersion = function (version) {
  const [v1,v2,v3] = process.version.replace('v', '').split('.')
  const [l1, l2, l3] = version.replace('v', '').split('.')
  return (parseInt(v1)-parseInt(l1))*1000000+(parseInt(v2)-parseInt(l2))*1000+(parseInt(v3)-parseInt(l3))>=0
}
module.exports = {
  autoRetry,
  compareVersion
}
