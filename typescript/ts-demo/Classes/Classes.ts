/**
 * 类
 */
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
namespace extend {
  // 继承
  class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }

  class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake("Sammy the Python");
  let tom: Animal = new Horse("Tommy the Palomino");

  sam.move();
  tom.move(34);
}
namespace publicAndPrivate {
  // public 和 private
  class Animal1 {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Animal2 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  // new Animal2('cat').name // Property 'name' is private and only accessible within class 'Animal2'

  class Animal3 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  class Rhino extends Animal3 {
    constructor() { super("Rhino"); }
  }

  class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  let animal = new Animal3("Goat");
  let rhino = new Rhino();
  let employee = new Employee("Bob");
  console.log(animal);
  animal = rhino;
  console.log(animal);
  // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
}

// protected 修改的行为很像private与成员声明的除外修改protected，也可以通过派生类的实例访问
namespace protected1 {
  class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Jack", "HangZhou");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // error
}
// 注意虽然我们不能 name从外部使用Person，但是我们仍然可以从实例方法中使用它，Employee因为它Employee派生自Person。
// 构造函数也可能被标记 protected。这意味着该类不能在其包含的类之外实例化，但可以扩展。例如，
namespace protected2 {
  class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
  }

  // Employee can extend Person
  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Jack", "HangZhou");
  console.log(howard.getElevatorPitch());
  // let john = new Person("John"); // Error: The 'Person' constructor is protected
}

// 只读 readonly
namespace readonly1 {
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  console.log(dad);
  // dad.name = "Man with the 3-piece suit"; // error! name is readonly.
}

// 访问器
// 在这个版本中，我们检查以确保用户在我们允许他们修改员工之前有一个秘密密码。
// 我们通过用fullName一个set将检查密码的直接访问来替代。我们添加一个相应的get以允许前面的示例继续无缝工作。
namespace getSet {
  // 秘钥
  let passcode = "secret passcode";
  class Employee {
    private fname!: string;

    get fullName(): string {
      return this.fname;
    }

    set fullName(newName: string) {
      if (passcode && passcode == "secret passcode") {
        this.fname = newName;
      }
      else {
        console.log("Error: Unauthorized update of employee!");
      }
    }
  }

  let employee = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
    console.log(employee.fullName);
  }

  // 访问器要求您将编译器设置为输出ECMAScript 5或更高版本。向下转换为ECMAScript 3不受支持。
  // 其次，具有a get和no的访问器set被自动推断为是readonly。这在.d.ts从代码生成文件时很有用，因为您的属性的用户可以看到他们无法更改它。
}

// 静态属性
// 到目前为止，我们只讨论了类的实例成员，这些成员在实例化时显示在对象上。我们也可以创建一个类的静态成员，这些成员在类本身而不是实例上是可见的。
// 在这个例子中，我们使用static原点，因为它是所有网格的一般值。每个实例通过预先添加类的名称来访问此值。与this.在实例访问前面预先设置类似，这里我们Grid.在静态访问前加上前缀。
namespace static1 {
  class Grid {
    static origin = { x: 0, y: 0 };
    calculateDistanceFromOrigin(point: { x: number; y: number; }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale: number) { }
  }

  let grid1 = new Grid(1.0);  // 1x scale
  let grid2 = new Grid(5.0);  // 5x scale

  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
}

// 抽象类 抽象类是可以派生其他类的基类。它们可能不会被直接实例化。与接口不同，抽象类可能包含其成员的实现细节。
namespace abstractClass {
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
      console.log("roaming the earth...");
    }
  }
  // 抽象类中标记为抽象的方法不包含实现，并且必须在派生类中实现。抽象方法与接口方法有相似的语法。
  // 两者都定义了方法的签名而不包含方法体。但是，抽象方法必须包含abstract关键字，并可以选择包含访问修饰符。
  abstract class Department {
    constructor(public name: string) {

    }
    printName(): void {
      console.log("Department name: " + this.name);
    }
    abstract printMeeting(): void; // must be implemented in derived classes
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accounting and Auditing"); // constructors in derived classes must call super()
    }
    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  let department: Department; // ok to create a reference to an abstract type
  // department = new Department(); // error: cannot create an instance of an abstract class
  department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
  department.printName();
  department.printMeeting();
  // department.generateReports(); // error: method doesn't exist on declared abstract type
}

// 构造函数
namespace constructedFunction {

}