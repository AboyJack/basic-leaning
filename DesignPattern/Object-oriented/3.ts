class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(food: string) {
    console.log(`${this.name}吃${food} `)
  }
}
class Dog extends Animal {
  eat(food: string) {
    console.log(`狗狗吃${food}`)
  }
}
class Person extends Animal {
  eat(food: string) {
    console.log(`人吃${food}`)
  }
}
let dog = new Dog('狗狗')
dog.eat('肉')
let person = new Person('人')
person.eat('饭')
export { }