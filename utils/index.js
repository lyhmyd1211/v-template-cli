const process = require('process');
const fs    = require('fs')
const path  = require('path')
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

/**
 * Node版本对比 
 * @param version 当前node版本是否大于等于此版本
 */
compareVersion = function (version) {
  const [v1,v2,v3] = process.version.replace('v', '').split('.')
  const [l1, l2, l3] = version.replace('v', '').split('.')
  return (parseInt(v1)-parseInt(l1))*1000000+(parseInt(v2)-parseInt(l2))*1000+(parseInt(v3)-parseInt(l3))>=0
  }
function rmdir(tarPath,cb) {
  return new Promise((resolve, reject) => {
      try{
        fs.rmdir(tarPath, cb)
        return resolve('success');
      } catch (err) {
        return reject(err);
      }
  })
}
/**
 * 删除整个非空文件夹
 */
removeDir = function(tarPath, cb, removeStates) {
    if (!removeStates) {
      removeStates = { cur: 0, all: 0 }
    } else {
      if (!removeStates.cur) {
        removeStates.cur = 0;
      }
      if (!removeStates.all) {
        removeStates.all = 0;
      }
    }
    removeStates.all++;
    fs.stat(tarPath, function(err, states) {
      removeStates.cur++;
      if (err) {
        cb && cb()
        return
      }
      if (states.isDirectory()) {
        fs.readdir(tarPath, function(err, files) {
          if (err) {
            console.log(err)
            cb && cb()
            return
          }
          if (files.length < 1) {
            if (compareVersion('v12.10.0')) {
              fs.rmdir(tarPath,{ maxRetries: 5, recursive: true }, cb)
            } else {
              autoRetry(rmdir, 5)(tarPath, cb)
            }
            
            return
          }
          var count    = 0
          var checkEnd = function() {
            if (++count == files.length) {
              if (compareVersion('v12.10.0')) {
                fs.rmdir(tarPath,{ maxRetries: 5, recursive: true }, cb)
              } else {
                autoRetry(rmdir, 5)(tarPath, cb)
              }
            }
          }
          files.forEach(function(file) {
            removeDir(path.join(tarPath, file), checkEnd, removeStates)
          })
        })
      } else {
        fs.unlink(tarPath, function(err) {
          if (err) {
            console.log(err)
          }
          cb && cb()
          return
        })
      }
    })
    return removeStates
  }
module.exports = {
  autoRetry,
  compareVersion,
  removeDir
}
