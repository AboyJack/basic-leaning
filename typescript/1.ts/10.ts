namespace a {
  /**
   * 交叉类型 将多个类型合并成一个类型
   * 其实就是两个接口类型的属性的并集
   */
  interface Bird {
    name: string,
    fly(): void
  }
  interface Person {
    name: string,
    play(): void
  }
  type Birdman = Bird & Person
  let p: Birdman = {
    name: 'a',
    fly() { },
    play() { }
  }
}
namespace b {
  // typeof 可以获取一个变量的类型
  // type Person = {
  //   name: string,
  //   age: number
  // }
  let p = {
    name: 'a',
    age: 10
  }
  // type 是用来类型的 let var 只能定义值
  type Person = typeof p
  let p2: Person = {
    name: 'v',
    age: 20
  }

  // 索引访问操作符 可以通过[]来获取一个类型的子类型
  interface Person2 {
    name: string,
    age: number,
    job: {
      name: string
    }
    interests: { name: string, level: number }[]
  }
  let myName: Person2['job']['name'] = 'fe'
  let myLever: Person2['interests'][0]['level'] = 10

  // keyof 索引类型查询操作符
  interface Person3 {
    name: string,
    age: number,
    gender: 'male' | 'female',
    // [propName: string]: any
  }
  // type Person3Keys = 'name' | 'age' | 'gender'
  type Person3Keys = keyof Person3 // 返回一个接口 它的key的集合
  function getValueByKey(val: Person3, key: Person3Keys): any {
    return val[key]
  }
  let person3: Person3 = {
    name: 'a',
    age: 10,
    gender: 'male'
  }
  let name = getValueByKey(person3, 'name')
  console.log('name', name)

  // 映射类型 在定义的时候用 in 操作符去批量定义
  interface Person4 {
    name: string,
    age: number,
    gender: 'male' | 'female',
  }
  type PartialPerson = { // ? 代表可选  - 不允许可选
    [key in keyof Person4]?: Person4[key]
    // [key in keyof Person4]-?: Person4[key]
  }
  // 实现原理
  // type Partial<T> = {
  //   [key in keyof T]?: T[key]
  // }
  // type PartialPerson = Partial<Person4>
  let p4: PartialPerson = {
    name: 'jj',
    age: 10
  }
  // 原理
  // type Required<T> = {
  //   [key in keyof T]-?: T[key]
  // }
  type RequiredPerson = Required<Person4>
  let p5: RequiredPerson = {
    name: 'jj',
    age: 10,
    gender: 'female'
  }
  // 原理
  // type Readonly<T> = {
  //   readonly [key in keyof T]: T[key]
  // }
  type ReadonlyPerson = Readonly<Person4>
  let p6: ReadonlyPerson = {
    name: 'jj',
    age: 10,
    gender: 'female'
  }
  // p6.name = 'ddd'

  // Pick
  // 原理
  // type Pick<T, K extends keyof T> = {
  //   [key in K]: T[key]
  // }
  type PickPerson = Pick<Person4, 'name'>
  let x: PickPerson = {
    name: 'string'
  }
}