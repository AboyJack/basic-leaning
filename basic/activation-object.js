/**
 * VO
 * Local 代表当前AO
 * this
 * 闭包：
 * 闭包由两部分组成，一个是当前的执行上下文A, 一个是该执行上下文中创建的函数B
 * 当B执行的时候引用了当前执行上下文A中的变量就会产出闭包
 * 当一个值失去引用的时候就会标记，被垃圾回收机制回收并释放空间。
 * 闭包的本质就是在函数外部保持内部变量的引用，从而阻止垃圾回收
 */
function foo (m) {
  var a = 1;
  console.log(this);
  function fn () {
    console.log(a, 'fn'); // 引用了执行上下文变量a 产出闭包
  }
  fn();
}
foo(1);

let globalVo = { foo: '(m) => {}' }
let globalEC = { VO: globalVo, this: window, scopeChain: [globalVo] }
let ECStack = [];
ECStack.push(globalEC);

let fooVO = { fn: '() => {}' }
let fooEC = { VO: fooVO, this: window, scopeChain: [fooVO, globalVo] }
ECStack.push(fooEC);
// 当foo开始的时候，因为fooEC处于执行栈的顶端，fooVO就会成为AO
// Activation Object 激活对象 fooVO.this = window

let fnVO = {};
let fnEC = { VO: fnVO, this: window, scopeChain: [fnVO, fooVO, globalVo] }
ECStack.push(fnEC); // fnVO => AO fnVO.this = window
ECStack.pop(fnEC);
ECStack.pop(fooEC);

/**
 * 作用域链是在创建函数的时候确定的
 * callback调用栈是在调用的时候确定的
 */
function one () {
  function two () {
    function three (callback) {
      callback();
    }
    return three;
  }
  return two;
}
let two = one();
let three = two();
three(two);
