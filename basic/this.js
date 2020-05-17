/**
 * this 当前执行代码的环境对象，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值
 * 参考MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
 */

// 如何确定this，其实就是知道当前执行函数主体是谁，如果是对象来调用，this就是调用的对象，如果没人来调，就直接执行 （就是谁调方法就是谁）
// 如果是非严格模式 主体是window global，如果是严格模式就是undefined
// 如果是事件绑定的时候 this就是绑定的元素
let person = {
  name: '张三',
  getName () {
    console.log(this.name);
  }
}
person.getName();

let name = person.getName;
name(); // undefined

let dom = {
  addEventListener (type, callback) {
    dom[`on${type}`] = callback;
  },
  trigger (type) {
    dom[`on${type}`]();
  }
}
dom.addEventListener('click', function () {
  console.log(this);
})
dom.trigger('click');