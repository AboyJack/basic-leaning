namespace a {
  /**
   * 抽象类
   */
  abstract class Animal {
    name: string
    abstract getName(): string
  }
  class Cat extends Animal {
    getName(): string {
      return this.name
    }
  }
  let cat = new Cat()
  cat.name = 'Cat'
  console.log(cat.getName())

  /**
   * 接口
   * 1. 可以用描述对象形状，指的是对象有哪些属性，属性是什么类型
   */
  interface Point {
    x: number,
    y: number
  }

  let point: Point = { x: 0, y: 0 }
  // 2. 还可以用来描述行为的抽象
  interface Speakable {
    speak(): void // 接口里不能放实现 只能放定义 所有的方法都是抽象的
  }
  interface Eatable {
    eat(): void
  }
  // 类可以实现多个接口 但只能继承一个父类
  class Person implements Speakable, Eatable {
    speak() { }
    eat() { }
  }

  /**
   * 抽象类和接口
   * - 不同类之间共有的属性和方法 可以抽象成一个接口
   * - 而抽象类是提供其他类继承的基类 抽象类不允许被实例化 抽象类中的抽象方法必须在子类中被实现
   * - 抽象类本质是一个无法被实例化的类 其中能够实现方法和初始化属性 而接口仅能用于描述 既不提供实现方法的继承 也不为属性进行初始化
   * - 一个类可以继承一个类或抽象类 但可以实现多个接口
   * - 抽象类也可以实现接口
   */

}
namespace b {
  /**
   * 重写(override)和重载(overload)
   * - 重写是指子类重写继承自父类中的方法
   * - 重载时指为同一个函数提供多个类型定义
   * 
   * 继承和多态
   * - 继承(Inheritance) 子类继承父类 子类除了拥有父类的所有特性外 还有一些更具体的特性
   * - 多态(Polymorphism) 由继承而产生了相关的不同的类 对同一个方法可以有不同的行为
   */
  class Animal {
    constructor() { }
    speak() {
      console.log('动物叫')
      // throw new Error('此方法不能被调用')
    }
  }
  class Cat extends Animal {
    speak() { console.log('miao miao ~') }
  }
  let cat = new Cat()
  cat.speak()

  class Dog extends Animal {
    speak() {
      console.log('wang wang~')
      super.speak() // 通过super 来调用到父类上的方法
    }
  }
  let dog = new Dog()
  dog.speak()
}
