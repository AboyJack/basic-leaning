/**
 * 为了批量创建对象 我们有了函数
 */
function add (a, b) {
  return a + b;
}

// 字面量方式创建对象，它是一个语法糖，内部调用是 new Object()
let obj = { name: 'jjj' }

/**
 * Object其实是一个函数，可以用来创建普通对象
 * 函数也是对象，也是被new出来的
 * 所以Object是函数类的一个实例
 */
let obj2 = new Object();