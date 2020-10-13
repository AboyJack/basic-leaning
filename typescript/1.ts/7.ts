/**
 * 泛型(Generics)
 * 指在定义函数、接口或类的时候 不预先指定具体的类型 而在使用的时候再指定类型的一种特性
 * 泛型 T 作用域只限于函数内部使用
 * 
 * 什么时候用泛型
 */
namespace a {
  // 泛型函数
  function createArray<T>(length: number, value: T): Array<T> {
    let res: Array<T> = []
    for (let i = 0; i < length; i++) {
      res[i] = value
    }
    return res
  }

  let r1 = createArray<number>(3, 6)
  let r2 = createArray<string>(3, 'a')
  console.log(r1, r2)

  // 类数组
  function sum(...args: any[]) {
    let arg: IArguments = arguments
    for (let i = 0; i < arg.length; i++) {
      console.log(arg[i])
    }
  }
  sum(1, 2, 3, '4')

  // 
  // let root: HTMLElement | null = document.getElementById('root')
  // let children: HTMLCollection = root.children
  // let childNodes: NodeListOf<ChildNode> = root.childNodes

  class MyArray<T> {
    private list: T[] = []
    add(val: T) {
      this.list.push(val)
    }
    getMax(): T {
      let result: T = this.list[0]
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] > result) {
          result = this.list[i]
        }
      }
      return result
    }
  }

  let arr = new MyArray<number>()
  arr.add(1)
  arr.add(2)
  arr.add(3)
  let r3: number = arr.getMax()
  console.log(r3)

  // 接口泛型
  interface Calculate {
    <T>(a: T, b: T): T
  }
  let add: Calculate = function <T>(a: T, b: T): T {
    return a
  }
  let r4 = add<number>(5, 5)
  console.log(r4)

  // 多个类型参数 如何在不增加中间变量的情况下 交换两个变量的值
  function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]]
  }
  let r5 = swap<string, number>(['abc', 123])
  console.log(r5)
  // let a = 1, b = 2;
  // [b, a] = [a, b]
}

namespace b {
  // 默认泛型类型
  function defaultType<T = string>(length: number): T | null {
    let t: T = null
    return t
  }
  let r1 = defaultType<boolean>(3)
  console.log(r1)

  // 泛型的约束 在函数中使用泛型的时候 由于预先并不知道具体的类型 所以不能访问相应类型的方法
  interface LengthWise {
    length: number
  }
  function logger<T extends LengthWise>(val: T) {
    console.log(val.length)
  }
  logger('aaa')


  interface Cart<T> {
    list: T[]
  }
  let cart: Cart<number> = {
    list: [1, 2, 3,]
  }

  // 泛型类型别名
  type Cart2<T> = { list: T[] } | T[]
  let c1: Cart2<string> = { list: ['1'] }
  let c2: Cart2<string> = ['1']
  /**
   * 泛型接口(interface)和泛型类型别名(type)的区别？
   * interface是定义了一个实实在在的接口 他是个真正的类型
   * type 一般用来定义别名 并不是一个真正的类型
   * 
   * 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
   * 类型别名不能被extends和implements， 这时我们应该尽量使用接口代替类型别名
   * 当我们需要使用联合类型或者元组类型的时候 类型别名更合适
   */
}