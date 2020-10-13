/**
 * 类
 */
namespace a {
  class Person {
    name: string = 'jj';
    age: number;
    constructor() {
      this.age = 10;
    }
  }
  let p1 = new Person();
  console.log(p1.name, p1.age);
}

namespace b {
  // 存取器 getter setter
  class Person {
    n: string;
    constructor(name: string) {
      this.n = name;
    }
    get name() {
      return this.n;
    }
    set name(newVal: string) {
      this.n = newVal.toUpperCase();
    }
  }
  let p = new Person('jj');
  console.log(p.name);
  p.name = 'tt'
  console.log(p.name);
}

namespace c {
  class Person {
    // 参数属性
    constructor(public name: string, public readonly age: number) {

    }
  }
  let p = new Person('hello', 10);
  console.log(p.name);
  // p.age = 12;
}

/**
 * 继承
 * 子类继承父类后子类的实例上就拥有了父类上的属性和方法
 * 访问修饰符 ：
 * public 自身和自身子类 和 其他类都可以访问 都是公开的
 * protected 受保护的 自己和自己的子类可以访问 其他类不可以访问
 * private 私有的 只能自身访问 子类和其他类不能访问
 * 
 * static 静态属性 静态方法
 */
namespace d {
  class Person {
    public name: string;
    protected age: number;
    private money: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
      this.money = 100;
    }
    getName() {
      return this.name;
    }
    setName(newVal: string) {
      this.name = `${newVal} world`;
    }
  }
  class Student extends Person {
    stuNo: number;
    static className = 'one';
    constructor(name: string, age: number, stuNo: number) {
      super(name, age);
      this.stuNo = stuNo;
    }
    getStuNo() {
      return this.stuNo;
    }
    setStuNo(newVal: number) {
      this.stuNo = newVal;
    }
    static getClassName() {
      return this.className;
    }
  }
  let s = new Student('hello', 20, 1);
  console.log(Student.className);
}