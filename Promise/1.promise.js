let fs = require('fs');

function read (url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
// read('/Users/guotian/Jack/frontend-leaning/Promise/name.txt').then(data => {
//   // 如果返回的是一个promise 会让这个promise执行 
//   // 并且采用他的状态作为下一个then的值
//   return read('/Users/guotian/Jack/frontend-leaning/Promise/' + data)
// }).then(data => {
//   console.log(data)
// })
let url = '/Users/guotian/Jack/frontend-leaning/Promise/'
read(`${url}/name.txt`).then(data => {
  // 如果返回的是一个promise 会让这个promise执行 
  // 并且采用他的状态作为下一个then的值
  return read(`${url}${data}`);
}).then(data => {
  console.log('1', data);
  throw new Error('fail');
}, err => {
  console.log('err1', err);
}).then(data => {
  console.log('2')
}, err => {
  console.log('err2', err);
  return undefined;
}).then(data => {
  console.log('success');
}, err => {
  console.log('fail');
});
