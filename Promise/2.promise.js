let Promise = require('./promise')
console.log(Promise)

let p = new Promise((resolve, reject) => {
  resolve(123)
})

let p2 = p.then(data => {
  return data
}, err => {
  return err
}).then(data => {
  console.log(data)
})
p2.then(data => {
  console.log('1', data)
  return 456
}).then(data => {
  console.log('2', data)
})

// let Promise = require('./promise')
// let p3 = new Promise((resolve, reject) => {
//   resolve()
// })
// // to refer same Object 会导致无法继续执行 因为这个promise 不会成功也不会失败
// let p4 = p3.then(data => {
//   return p4
// })
// p4.then(null, function (err) {
//   console.log(err)
// })