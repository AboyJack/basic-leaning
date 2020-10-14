class Person {
  constructor(name) {
    this.name = name
  }
  act (doSth) {
    console.log(`${this.name}在${doSth} `)
  }
}
let person = new Person('Jack')
person.act('敲代码')

class Rose extends Person {
  constructor() {
    super('Rose')
  }
  eat () {
    console.log(`${this.name}在吃零食`)
  }
}
let rose = new Rose()
rose.act('玩游戏')
rose.eat()