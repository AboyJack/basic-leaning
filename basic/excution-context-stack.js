<<<<<<< HEAD
/**
 * 执行上下文栈
 * 栈是一个数据，里面放着很多执行上下文
 * 每次函数执行都会产生一个执行上下文
 * 全局上下文的VO，也被称为GO(Global Object) 全局对象
 * 全局对象上的属性可以在任何地方访问到
 * 在浏览器端 GO 就是 VO 也就是 window 对象
 * window对象还是var声明的全局变量的载体。
 */
var globalExecutionContext = {
  VO: {
    setTimeout,
    Math,
    String
  }
}
var window = globalExecutionContext.VO;
window.setTimeout;

function one () {
  var a = 10;
}
one();

var oneExecutionContext = {
  VO: { // 这个 oneExecutionContext.VO 我们是无法访问和获取的，是为了保护里面的变量不能被随意修改
    a: 10
  }
=======
/**
 * 执行上下文栈
 * 栈是一个数据，里面放着很多执行上下文
 * 每次函数执行都会产生一个执行上下文
 * 全局上下文的VO，也被称为GO(Global Object) 全局对象
 * 全局对象上的属性可以在任何地方访问到
 * 在浏览器端 GO 就是 VO 也就是 window 对象
 * window对象还是var声明的全局变量的载体。
 */
var globalExecutionContext = {
  VO: {
    setTimeout,
    Math,
    String
  }
}
var window = globalExecutionContext.VO;
window.setTimeout;

function one () {
  var a = 10;
}
one();

var oneExecutionContext = {
  VO: { // 这个 oneExecutionContext.VO 我们是无法访问和获取的，是为了保护里面的变量不能被随意修改
    a: 10
  }
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
}