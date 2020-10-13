/**
 * 作用域链
 * scopeChain 其实是在创建函数的时候确定的，跟在哪执行无关
 * 作用域链一层层往上找 
 */
function one () {
  var a = 1;
  function two () {
    console.log(a);
  }
  // tow['[[Scopes]]'] = [oneExecutionContextVo, globalExecutionContextVo]
  return two;
}
var a = 2;
var outer_two = one();
outer_two();
// 代码开始执行
// 执行上下文执行有两个阶段，第一个是编译阶段，第二个是执行阶段
// 编译阶段会寻找里面的var变量声明和函数声明，进行变量提升
var globalExecutionContextVo = {
  one: `()=>{}`, // 函数声明时声明并赋值
  a: undefined, // var 变量会声明，但不赋值
  outer_two: undefined
}

var globalExecutionContext = {
  VO: globalExecutionContextVo,
  scopeChain: [globalExecutionContextVo]
}
// 开始执行
globalExecutionContext.VO.a = 2;
// 进入one函数执行的时候的执行上下文的编译阶段 扫描function var
var oneExecutionContextVo = {
  two: `()=>{}`,
  a: undefined
}
var oneExecutionContext = {
  VO: oneExecutionContextVo,
  scopeChain: [oneExecutionContextVo, globalExecutionContextVo]
}
// 开始执行 oneExecutionContext的执行阶段
oneExecutionContext.VO.a = 1;
globalExecutionContext.VO.outer_two = 'two';
// two 开始执行
var twoExecutionContextVo = {}
// two 这个函数的作用域其实是在 one执行的时候创建和确定的
var twoExecutionContext = {
  VO: twoExecutionContextVo,
  scopeChain: [twoExecutionContextVo, oneExecutionContextVo, globalExecutionContextVo]
  // scopeChain: [twoExecutionContextVo, ...two['[[Scopes]]']]
}
