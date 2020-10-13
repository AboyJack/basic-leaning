/**
 * 结构类型系统
 */
namespace a {
  /**
   * 接口的兼容性
   * - 如果传入的变量和声明的类型不匹配 TS就会进行兼容性检查
   * - 原理是 Duck-Check 就是说只要目标类型中声明的属性变量在源类型中都存在 就是兼容的
   * 
   */
  interface Animal {
    name: string,
    age: number
  }
  interface Person {
    name: string,
    age: number,
    speak: (words: string) => void
  }
  function getName(animal: Animal): string {
    return animal.name
  }
  let p: Animal = {
    name: 'jj',
    age: 10
  }
  console.log(getName(p))
  /**
   * 基本类型的兼容性
   */
  let num: string | number
  let str: string = 'hello'
  num = str
  str = num

  let num2: {
    toString(): string
  }
  let str2: string = 'hi'
  num2 = str2
  // str2.toString()

}

namespace b {
  /**
   * 类的兼容性
   * 与类型无关
   * 不管这个对象的具体类型 只要属性有就可以
   */
  class Animal {
    name: string
  }
  class Bird extends Animal {
    // swing: number
  }
  let a: Animal
  a = new Bird() // 父类的变量能

  let b: Bird
  b = new Animal()
  b = { name: 'aaa' }
}

namespace c {
  // 函数兼容性
  type sumFnc = (a: number, b: number) => number
  let sum: sumFnc
  function f1(a: number, b: number): number {
    return a
  }
  sum = f1
  function f2(a: number): number {
    return a
  }
  sum = f2
  function f3(): number {
    return 1
  }
  sum = f3
  function f4(a: number, b: number, c: number): number {
    return a
  }
  // sum = f4 // 参数可以少 但是不能多

  // 比较返回值
  type GetPerson = () => { name: string, age: number }
  let getPerson: GetPerson
  function g1() {
    return { name: 'string', age: 11 }
  }
  getPerson = g1
  function g2() {
    return { name: 'string' }
  }
  // getPerson = g2 // 少了参数不行
  function g3() {
    return { name: 'string', age: 11, home: 'sz' }
  }
  getPerson = g3

  // interface T {
  //   name: string
  // }
  // let t: T = {name: 'hhh', age:11} // 不可以多

  // 函数参数的协变 现在只能单向 只能一样或更多类型 不能少
  type logFunc = (a: number | string) => void
  let log: logFunc
  function log1(a: number | string | boolean) {
    console.log(a)
  }
  log = log1
}

namespace d {
  // 泛型兼容性 
  // 判断兼容性时先判断具体的类型再进行兼容性判断
  interface Empty<T> {
    data: T
  }
  let x: Empty<string>
  let y: Empty<number>
  // x = y

  interface NotEmptyString<T> {
    data: string
  }
  interface NotEmptyNumber<T> {
    data: number
  }

  // 枚举的兼容性
  enum Colors {
    Red,
    Yellow
  }
  let c: Colors
  c = Colors.Red // = 0
  c = 1
  let d: number
  d = Colors.Yellow // = 1
}