class Person {
  public name: string; // 都可以访问
  protected age: number; // 自己及其子类可访问 其他类不可访问
  private money: number; // 只有自己能访问，其他类不可访问
  constructor(name: string, age: number, money: number) {
    this.name = name;
    this.age = age;
    this.money = money;
  }
}
class Student extends Person {
  public num: number;
  constructor(name: string, age: number, money: number, num: number) {
    super(name, age, money);
    this.num = num;
  }
  getName() {
    console.log(`名字：${this.name}`);
  }
  getAge() {
    console.log(`年龄：${this.age}`)
  }
}
let s1 = new Student('Jack', 20, 100, 1);
s1.name;
// s1.age; // 属性“age”受保护，只能在类“Person”及其子类中访问
// s1.money; // 属性“money”为私有属性，只能在类“Person”中访问。
export { }