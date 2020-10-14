<<<<<<< HEAD
/**
 * 执行上下文生命周期
 * 当执行one时，会创建一个执行上下文
 *   1. 编译阶段
 *     创建VO
 *        1. 处理参数，把参数放入VO
 *        2. 扫描所有代码找出function声明，从上往下依次执行， 在编译阶段会处理所有的函数声明（如果有重复声明，后面会覆盖前面的声明）。
 *        3. 扫描var关键字，var 在编译阶段不赋值，只声明，值为 undefined
 *        4. 在编译阶段是不会处理let变量， 且let变量不会放在VO里
 *   编译完成 
 *   2. 开始执行阶段
 *   
 */
function one (m, n) {
  // oneVO: { ...arguments, fn: () => 2, a: undefined, b: undefined }
  // globalVo = globalEC.VO
  // oneEC = { VO, this: window, scopeChain: [oneVO, globalVo] }
  console.log(m, n);
  var a = 1;
  function fn () {
    return 1;
  }
  function fn () {
    return 2;
  }
  var b = 2;
  var b = 3;
  let c = 4;
  console.log(a, b, c, fn); // 1 3 4  fn () { return 2; }
}
one(1, 2);


var a = 1;
function fn (m) { console.log('fn'); }
function fn (m) { console.log('new_fn'); }
function a () { console.log('fn_a'); }
console.log(a); // 1
fn(1); // new_fn
var fn = 'var_fn';
=======
/**
 * 执行上下文生命周期
 * 当执行one时，会创建一个执行上下文
 *   1. 编译阶段
 *     创建VO
 *        1. 处理参数，把参数放入VO
 *        2. 扫描所有代码找出function声明，从上往下依次执行， 在编译阶段会处理所有的函数声明（如果有重复声明，后面会覆盖前面的声明）。
 *        3. 扫描var关键字，var 在编译阶段不赋值，只声明，值为 undefined
 *        4. 在编译阶段是不会处理let变量， 且let变量不会放在VO里
 *   编译完成 
 *   2. 开始执行阶段
 *   
 */
function one (m, n) {
  // oneVO: { ...arguments, fn: () => 2, a: undefined, b: undefined }
  // globalVo = globalEC.VO
  // oneEC = { VO, this: window, scopeChain: [oneVO, globalVo] }
  console.log(m, n);
  var a = 1;
  function fn () {
    return 1;
  }
  function fn () {
    return 2;
  }
  var b = 2;
  var b = 3;
  let c = 4;
  console.log(a, b, c, fn); // 1 3 4  fn () { return 2; }
}
one(1, 2);


var a = 1;
function fn (m) { console.log('fn'); }
function fn (m) { console.log('new_fn'); }
function a () { console.log('fn_a'); }
console.log(a); // 1
fn(1); // new_fn
var fn = 'var_fn';
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
console.log(fn); // var_fn