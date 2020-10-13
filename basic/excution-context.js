/**
 * 执行上下文
 * 当函数运行时，会创建一个执行环境，这个执行环境就叫执行上下文（Excution Context）。
 * 执行上下文会创建一个对象叫做变量对象（Variable Object），基础数据类型都保存在变量对象中。
 * 引用数据类型保存在堆里，我们通过操作对象的引用地址来操作对象。
 * 执行上下文里面会创建一个变量对象，里面存放着当前函数内的变量
 * 基本数据类型保存再变量对象里，引用数据类型单独在堆内存里开辟空间保存。
 * 变量对象里保存的就是堆里的内存地址
 */
function task () {
  var a = 1;
  var b = {
    name: 'js'
  }
  var c = [1, 2, 3];
}
task();

// task的执行上下文
let taskExcutionContext = {
  VO: { // variable Object 变量对象 里面存的是当前函数执行要使用到的变量
    a: 1,
    b: `xo1`,
    c: `xa1`
  }
}

// 基本数据类型的赋值和引用数据类型的赋值不一样 基本数据类型赋值的是值 引用数据类型赋值的是引用地址
var a = 1;
var b = a;
b = 2;
console.log(a); // 1

let taskExcutionContext = {
  VO: {}
}
taskExcutionContext.VO.a = 1;
taskExcutionContext.VO.b = 1;
taskExcutionContext.VO.b = 2;
console.log(taskExcutionContext.VO.a); // 1

var m = { a: 1, b: 2 }; // xo1
var n = m; // n = xo1
n.a = 10; // { a: 10, b: 2 }
console.log(m.a); // 10

let taskExcutionContext = {
  VO: { m: { a: 1, b: 2 } }
}
taskExcutionContext.VO.n = taskExcutionContext.VO.m;
taskExcutionContext.VO.n.a = 10;
console.log(taskExcutionContext.VO.m.a); // 10