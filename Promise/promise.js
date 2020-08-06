function Promise (executor) {
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;
  let _self = this;

  // 定义两个队列 存放到对呀的回调中
  _self.onResolveCallbacks = []; // 存放成功回调
  _self.onRejectedCallbacks = []; // 存放失败回调
  // 成功态
  function resolve (value) {
    if (_self.status === 'pending') {
      _self.value = value;
      _self.status = 'fulfilled';
      _self.onResolveCallbacks.forEach(fn => fn());
    }
  }
  // 失败态
  function reject (reason) {
    if (_self.status === 'pending') {
      _self.value = reason;
      _self.status = 'rejected';
      _self.onRejectedCallbacks.forEach(fn => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    console.log(error)
    reject(error);
  }
}
/**
 * 
 * @param {*} promise2 当前then返回的promise
 * @param {*} x 当前then中成功或者失败回调返回的结果
 * @param {*} resolve 成功返回
 * @param {*} reject 失败返回
 */
function resolvePromise (promise2, x, resolve, reject) {
  // 对x进行判断 如果x是个普通值 直接resolve就可以了
  // 如果x是个promise 采用x的状态
  // resolve(x);
  if (promise2 === x) { // 防止返回的promise 和 then方法返回的promise是同一个
    return reject(new TypeError('循环引用'));
  }
  // 判断x 有可能是个promise
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try { // 有可能取then报错
      let then = x.then; // 看当前的promise有没有then方法 有 说明x是promise
      if (typeof then === 'function') { // 判断是promise
        then.call(x, y => {
          // resolve(y);
          // 如果返回的是一个promise 这个promise resolve的结果可能还是一个promise 
          // 所以递归解析知道这个y是一个常量为止
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          reject(r);
        }); // 让 then 作为 this 用刚才取出的then方法不要再取值了 如果取可能会发生异常
      } else { // { then: {} } {then: 123}
        resolve(x);
      }
    } catch (e) { // 这个then方法 是通过Object.defineProperty定义的
      reject(e);
    }
  } else { // x是普通常量
    resolve(x);
  }
}
// onfulfilled, onrejected 这两个方法必须异步执行then 方法是异步的
Promise.prototype.then = function (onfulfilled, onrejected) {
  let _self = this;
  // 每个promise必须返回一个新的状态 保证可以链式调用
  // 返回新的promise 让当前的then方法执行后可以继续then
  let promise2 = new Promise(function (resolve, reject) {
    if (_self.status === 'fulfilled') {
      // resolve(x);
      setTimeout(() => {
        try {
          let x = onfulfilled(_self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    if (_self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onrejected(_self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    if (_self.status === 'pending') {
      _self.onResolveCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onfulfilled(_self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      _self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onrejected(_self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
}

module.exports = Promise