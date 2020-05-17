/**
 * call 
 * apply
 * bind
 */
function getName () {
  console.log(this.name, ...arguments);
}

let obj = { name: 'jack' }

// obj.getName = getName;
// obj.getName();
// delete obj.getName;
// 以obj作为调用方，或者说执行主体，调用getName方法
getName.call(obj);

// 实现call的原理
!(function (prototype) {
  function getDefaultContext (context) {
    // context = window = null || undefined 
    context = context || window;
    // let type = typeof context;
    // if (['number', 'string', 'boolean'].includes(type)) {
    //   context = new context.constructor(context);
    // }
    context = Object(context);
    return context
  }
  function call2 (context, ...args) {
    context = getDefaultContext(context);
    let symbol = Symbol('fn'); // 定义不可能重复的属性值 防止属性参数重复
    context[symbol] = this;
    context[symbol](...args); // 执行函数
    delete context[symbol]; // 删除
  }
  function apply2 (context, args) {
    context = getDefaultContext(context);
    let symbol = Symbol('fn'); // 定义不可能重复的属性值 防止属性参数重复
    context[symbol] = this;
    context[symbol](...args); // 执行函数
    delete context[symbol]; // 删除
  }
  function bind2 (context, ...outerArgs) {
    // this = getName
    return (...args) => this.call(context, ...outerArgs, ...args);
  }
  prototype.call2 = call2;
  prototype.apply2 = apply2;
  prototype.bind2 = bind2;
})(Function.prototype);
getName.call2(obj, 666, 'abc');
getName.apply2(obj, [666, 'abc']);
let bindGetName = getName.bind2(obj, 666);
bindGetName('abc');