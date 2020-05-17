/**
 * 执行上下文对象的VO栈
 * chrome优化 如果不引用变量就不会看到
 * 作用域是一个个执行上下文
 */
function one () {
  var a = 1;
  var two = () => {
    var b = 2;
    var three = () => {
      var c = 3;
      // debugger
      console.log(a, b, c);
    }
    three();
  }
  two();
}
one();

var excutionContextStack = [];
// 全局上下文
var globalExcutionContext = {
  VO: {
    one: `()=>{}`
  }
}
excutionContextStack = [globalExcutionContext];
var oneExcutionContext = {
  VO: {
    a: 1,
    two: `() => {}`
  }
}
excutionContextStack = [oneExcutionContext, globalExcutionContext];

var twoExcutionContext = {
  VO: {
    b: 2,
    three: `() => {}`
  }
}
excutionContextStack = [twoExcutionContext, oneExcutionContext, globalExcutionContext];

var threeExcutionContext = {
  VO: {
    c: 3
  }
}
excutionContextStack = [threeExcutionContext, twoExcutionContext, oneExcutionContext, globalExcutionContext];
// 变量的值是如何查找 console.log(a, b, c) 作用域链的查找过程
function getVaribleValue (varName) {
  for (let i = 0; i < excutionContextStack.length; i++) {
    if (varName in excutionContextStack[i].VO) {
      return excutionContextStack[i].VO[varName];
    }
  }
}
// 开始出栈
excutionContextStack = [, , , globalExcutionContext];