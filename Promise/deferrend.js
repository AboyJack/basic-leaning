let Promise = require('./promise');
// 延迟对象
let fs = require('fs');
function read (url) {
  // 延迟对象
  let defer = Promise.deferred(); // { promise, resolve, reject }
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) return defer.reject(err);
    defer.resolve(data);
  });
  return defer.promise
}
read('/Users/guotian/Jack/frontend-leaning/Promise/name.txt').then(data => {
  console.log(data);
})