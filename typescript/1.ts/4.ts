/**
 * 装饰器
 * 装饰器是一种特殊类型声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
 * 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
 * 装饰器的写法分为普通装饰器和装饰器工厂
 */
namespace a {
  /**
   * 类装饰器
   */

  interface Person {
    xx: string,
    yy: string
  }
  function enhancer(target: any) {
    target.prototype.xx = 'xx'
    target.prototype.yy = 'yy'
  }
  @enhancer
  class Person {
    constructor() { }
  }
  let p = new Person();
  console.log(p.xx)
  console.log(p.yy)
}
// 把类整个替换
namespace b {
  interface Person {
    age: number
  }
  function enhancer(name: string) {
    return function enhancer(target: any) {
      return class extends target {
        public name: string = name
        public age: number = 10
      }
    }
  }
  @enhancer('jj')
  class Person {
    public name: string = 'person'
    constructor() { }
  }
  let p = new Person();
  console.log(p.name)
}

namespace c {
  /**
   * 属性装饰器
   */

  // target 如果装饰的是个普通属性的话 那么这个target指向类的原型 Person.prototype
  // target 如果装饰的是类的属性static 那么这个target指向类的定义
  function upperCase(target: any, propertyName: string) {
    let value = target[propertyName]
    const getter = () => value
    const setter = (newVal: string) => {
      value = newVal.toUpperCase()
    }
    delete target[propertyName]
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
  /**
   * 只修饰属性
   * @param flag 
   */
  function propertyEnumerable(flag: boolean) {
    return function (target: any, propertyName: string) {

    }
  }
  /**
   * 修饰方法
   * @param flag 
   */
  function fnEnumerable(flag: boolean) {
    return function (target: any, fnName: string, pd: PropertyDescriptor) {
      pd.enumerable = flag
    }
  }
  function setAge(age: number) {
    return function (target: any, fnName: string, pd: PropertyDescriptor) {
      target.age = age
    }
  }

  function toNumber(target: any, fnName: string, pd: PropertyDescriptor) {
    let oldFn = pd.value
    pd.value = function (...args: any[]) {
      args = args.map(item => parseFloat(item))
      return oldFn.apply(this, args)
    }
  }

  class Person {
    @upperCase
    @propertyEnumerable(false)
    name: string

    @fnEnumerable(true)
    getName() {
      console.log('getName')
    }

    static age: number
    @setAge(10)
    static getAge() { }

    @toNumber
    sum(...args: any[]) {
      return args.reduce((accu, item) => accu + item, 0)
    }
  }

  let p = new Person()
  p.name = 'abc'
  console.log(p.name)
  for (const attr in p) {
    console.log('attr---' + attr)
  }
  console.log(Person.age)
  console.log(p.sum('1', '2', '3'))
}

namespace d {
  /**
   * 参数装饰器 装饰方法参数
   */


  interface Person {
    num: number
  }
  function addPwd(target: any, fnName: string, paramIndex: number) {
    // console.log(target, fnName, paramIndex) // Person { login: [Function (anonymous)] } login 1
    target.num = 789
  }
  class Person {
    login(uname: string, @addPwd pwd: string) {
      console.log(uname, pwd + this.num)
    }
  }
  let p = new Person()
  p.login('admin', '123456')
}

// 装饰器优先级 
// 属性方法先执行 谁先写执行谁
// 方法的时候 先参数再方法 而且它们一定会在一起
// 最后是类
// 如果是同类型的 先执行后写的