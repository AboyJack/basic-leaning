/**
 * 任意属性
 */
namespace a {
  interface PlainObject {
    [propName: string]: number
  }
  let obj: PlainObject = {
    x: 1,
    y: 2,
    c: 3
  }
}

namespace b {

  /**
   * 继承和多态
   * - 继承(Inheritance) 子类继承父类 子类除了拥有父类的所有特性外 还有一些更具体的特性
   * - 多态(Polymorphism) 由继承而产生了相关的不同的类 对同一个方法可以有不同的行为
   */
  // 接口的继承
  interface Speakable {
    speak(): void
  }
  interface SpeakChinese extends Speakable {
    speakChinese(): void
  }
  class Person implements SpeakChinese {
    speak() { }
    speakChinese() { }
  }
  // 接口的readonly
  interface Circle {
    readonly PI: number
    radius: number
  }
  let circle: Circle = {
    PI: 3.1415926,
    radius: 10
  }
  // circle.PI = 3.14

  // 接口还可以用来约束函数
  interface Discount {
    (price: number): number
  }
  let cost: Discount = function (price: number): number {
    return price * .8
  }
  // 可索引接口 是用来对数组和对象进行约束的
  interface UserInterface {
    [index: number]: string
  }
  let arr: UserInterface = ['1', '2', '3']
  console.log(arr) // [ '1', '2', '3' ]

  let obj2: UserInterface = {
    1: '1',
    2: '2'
  }
}
namespace c {
  /**
   * 类接口
   * 可以用接口来装饰类
   */
  interface Speakable {
    name: string
    speak(words: string): void
  }
  class Dog implements Speakable {
    name: string
    speak() { }
  }

  class Animal {
    constructor(public name: string) { }
  }
  // 约束构造类型 使用new来约束
  interface WithNameClass {
    new(name: string): Animal
  }
  function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name)
  }
  let a = createAnimal(Animal, 'dog')
}