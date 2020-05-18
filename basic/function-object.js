/**
 * 为了批量创建对象 我们有了函数
 */
function add (a, b) {
  return a + b;
}
// 形参的个数
console.log(add.length); // 2 

// => add 也是 Function类的实例
let add = new Function('a', 'b', 'return a + b');

// 字面量方式创建对象，它是一个语法糖，内部调用是 new Object()
let obj = { name: 'jjj' }

/**
 * Object其实是一个函数，可以用来创建普通对象
 * 函数也是对象，也是被new出来的
 * 所以Object是函数类的一个实例
 */
let obj2 = new Object();

// 特殊的地方
// 1. Function.prototype === Function.__proto__ 函数自举
// 2. Object.prototype.__proto__ === null
// 3. Function的祖宗就是Function

// __proto__ 属性组成的链就是原型链
// 为什么要有原型链？为了实现属性和方法的共享
// 为什么会有函数？函数的核心作用是为了批量创建对象

function Person () { }
let p1 = new Person();
console.log(p1 instanceof Person); // true
console.log(p1 instanceof Object); // true
console.log(p1 instanceof Function); // false


let a = 1; // 基本类型只是个值 没有属性和方法

// 当基本类型转换时
console.log(a.toString()); // 1
// 其隐式转换为
console.log(Number.prototype.__proto__.toString());