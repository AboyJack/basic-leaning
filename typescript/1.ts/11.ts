namespace a {
  let x = { name: 'jj' }
  let a = typeof x
  type b = typeof x

  // interface,type,class 三者一般啥时候用
  // interface 是定义接口类型 它是真实的类型 也可能会被导入和导出
  // type 只是临时用的别名 并不会产生真正的类型
  // class 就是定义类

  // 条件类型
  interface Fish {
    name1: string
  }
  interface Water {
    name2: string
  }
  interface Bird {
    name3: string
  }
  interface Sky {
    name4: string
  }
  type Condition<T> = T extends Fish ? Water : Sky
  let condition: Condition<Fish> = {
    name2: 'water'
  }
  // 条件类型的分发
  type Condition2<T> = T extends Fish ? Water : Sky
  let c1: Condition2<Fish | Bird> = { name2: 'aa' }
  let c2: Condition2<Fish | Bird> = { name4: 'bb' }
  let c3: Water | Sky = { name2: 'cc' }
  let c4: Water | Sky = { name2: 'dd' }
}

namespace b {
  /**
   * 内置条件类型
   */

  // 从前者中派出掉后者
  type E = Exclude<string | number, string>
  let e: E = 22;

  type E2 = Extract<string | number | null, string>
  let e2: E2 = 'hello'

  type E3 = NonNullable<string | number | undefined | null>
  let e3: E3 = 'hello'
  let e4: E3 = 666

  // redux 会用到ReturnType
  function getUserInfo() {
    return { name: 'jj', age: 10 }
  }
  type UserInfo = ReturnType<typeof getUserInfo>
  let user: UserInfo = { name: 'jj', age: 10 }

  // instanceType 获取构造函数的实例类型
  class Person {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }
  type P = InstanceType<typeof Person>
  let p: P = new Person('jj')
}