<<<<<<< HEAD
/**
 * C语言是一个面向过程的语言
 * 面向对象 基本上现代语言都是面向对象
 * Java 整个系统划分为若干个对象，每个都有自己的方法和数据，然后通过相互调用进行协作完成任务
 * JavaScript 比较特殊
 * JS数据类型分为两种
 *  1. 基本类型 string number boolean null undefined symbol
 *  2. 引用类型 一切引用数据类型都是对象 Object  包含 Array、Date、RegExp、Math、Function (Function是个特殊的对象)
 */
console.log(typeof 'a', typeof true, typeof null, typeof undefined, typeof 123, typeof Symbol('a')); // string boolean object undefined number symbol
console.log(typeof { s: 1 }, typeof [1, 2, 3], typeof /^$/, typeof new Date(), typeof function () { }); // object object object object function

// 什么是对象？对象和基本数据类型的本质区别是什么？
// 基本数据类型只是一个值，而对象是若干个属性的集合

// function 为什么特殊？它和其他对象的本质区别是什么？
// function本质上来说是可以生产别的对象的，它是一个对象的工厂，所有的对象包括函数本身都是函数生产出来的
// 函数是如何出现的？它主要解决了什么问题？
// 当一个个创建的对象能够得到重复声明时，为了加快生产对象的速度，就有了函数，函数就可以用来批量的创建对象了

function Person (name, age) {
  this.name = name
  this.age = age
}
// 把批量创建出来的对象（构造函数实例）共用的属性放在构造函数的原型上 节约内存消耗
Person.prototype.eat = function () { console.log('吃'); }
let p1 = new Person('张三', 20)
let p2 = new Person('李四', 21)
// 我们可以把对象的属性分成两种，以Person 为例，有些属性是每个人特有的，且都不同，而有些属性则是一样的，为了保证灵活性、节约内存和性能

/**
 * 实现个 new 的原理
 * @param {*} clazz 
 * @param  {...any} args 
 */
function _new (clazz, ...args) {
  let obj = {};
  // 不能 obj.prototype = clazz.prototype ， js中没有类，有构造函数，实例才有__proto__,没有prototype，构造函数有prototype
  obj.__proto__ = clazz.prototype; // 关联构造函数原型
  clazz.call(obj, ...args); // 给实例的私有属性赋值
  return obj;
}
let zhangsan = _new(Person, '张三', 20);
// __proto__ 隐式原型  zhangsan.eat() = zhangsan.__proto__.eat()
// . 也是个运算符，先在zhangsan这个实例的属性上找，找到直接返回使用，如果没找到就查找zhangsan.__proto__属性，如果有也直接返回
zhangsan.eat(); // 吃
console.log(zhangsan);

=======
/**
 * C语言是一个面向过程的语言
 * 面向对象 基本上现代语言都是面向对象
 * Java 整个系统划分为若干个对象，每个都有自己的方法和数据，然后通过相互调用进行协作完成任务
 * JavaScript 比较特殊
 * JS数据类型分为两种
 *  1. 基本类型 string number boolean null undefined symbol
 *  2. 引用类型 一切引用数据类型都是对象 Object  包含 Array、Date、RegExp、Math、Function (Function是个特殊的对象)
 */
console.log(typeof 'a', typeof true, typeof null, typeof undefined, typeof 123, typeof Symbol('a')); // string boolean object undefined number symbol
console.log(typeof { s: 1 }, typeof [1, 2, 3], typeof /^$/, typeof new Date(), typeof function () { }); // object object object object function

// 什么是对象？对象和基本数据类型的本质区别是什么？
// 基本数据类型只是一个值，而对象是若干个属性的集合

// function 为什么特殊？它和其他对象的本质区别是什么？
// function本质上来说是可以生产别的对象的，它是一个对象的工厂，所有的对象包括函数本身都是函数生产出来的
// 函数是如何出现的？它主要解决了什么问题？
// 当一个个创建的对象能够得到重复声明时，为了加快生产对象的速度，就有了函数，函数就可以用来批量的创建对象了

function Person (name, age) {
  this.name = name
  this.age = age
}
// 把批量创建出来的对象（构造函数实例）共用的属性放在构造函数的原型上 节约内存消耗
Person.prototype.eat = function () { console.log('吃'); }
let p1 = new Person('张三', 20)
let p2 = new Person('李四', 21)
// 我们可以把对象的属性分成两种，以Person 为例，有些属性是每个人特有的，且都不同，而有些属性则是一样的，为了保证灵活性、节约内存和性能

/**
 * 实现个 new 的原理
 * @param {*} clazz 
 * @param  {...any} args 
 */
function _new (clazz, ...args) {
  let obj = {};
  // 不能 obj.prototype = clazz.prototype ， js中没有类，有构造函数，实例才有__proto__,没有prototype，构造函数有prototype
  obj.__proto__ = clazz.prototype; // 关联构造函数原型
  clazz.call(obj, ...args); // 给实例的私有属性赋值
  return obj;
}
let zhangsan = _new(Person, '张三', 20);
// __proto__ 隐式原型  zhangsan.eat() = zhangsan.__proto__.eat()
// . 也是个运算符，先在zhangsan这个实例的属性上找，找到直接返回使用，如果没找到就查找zhangsan.__proto__属性，如果有也直接返回
zhangsan.eat(); // 吃
console.log(zhangsan);

>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
