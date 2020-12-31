"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 类
 */
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
console.log(greeter.greet());
var extend;
(function (extend) {
    // 继承
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        Animal.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 0; }
            console.log(this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            return _super.call(this, name) || this;
        }
        Snake.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 5; }
            console.log("Slithering...");
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Snake;
    }(Animal));
    var Horse = /** @class */ (function (_super) {
        __extends(Horse, _super);
        function Horse(name) {
            return _super.call(this, name) || this;
        }
        Horse.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 45; }
            console.log("Galloping...");
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Horse;
    }(Animal));
    var sam = new Snake("Sammy the Python");
    var tom = new Horse("Tommy the Palomino");
    sam.move();
    tom.move(34);
})(extend || (extend = {}));
var publicAndPrivate;
(function (publicAndPrivate) {
    // public 和 private
    var Animal1 = /** @class */ (function () {
        function Animal1(theName) {
            this.name = theName;
        }
        Animal1.prototype.move = function (distanceInMeters) {
            console.log(this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal1;
    }());
    var Animal2 = /** @class */ (function () {
        function Animal2(theName) {
            this.name = theName;
        }
        return Animal2;
    }());
    // new Animal2('cat').name // Property 'name' is private and only accessible within class 'Animal2'
    var Animal3 = /** @class */ (function () {
        function Animal3(theName) {
            this.name = theName;
        }
        return Animal3;
    }());
    var Rhino = /** @class */ (function (_super) {
        __extends(Rhino, _super);
        function Rhino() {
            return _super.call(this, "Rhino") || this;
        }
        return Rhino;
    }(Animal3));
    var Employee = /** @class */ (function () {
        function Employee(theName) {
            this.name = theName;
        }
        return Employee;
    }());
    var animal = new Animal3("Goat");
    var rhino = new Rhino();
    var employee = new Employee("Bob");
    console.log(animal);
    animal = rhino;
    console.log(animal);
    // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
})(publicAndPrivate || (publicAndPrivate = {}));
// protected 修改的行为很像private与成员声明的除外修改protected，也可以通过派生类的实例访问
var protected1;
(function (protected1) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(name, department) {
            var _this = _super.call(this, name) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.getElevatorPitch = function () {
            return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
        };
        return Employee;
    }(Person));
    var howard = new Employee("Jack", "HangZhou");
    console.log(howard.getElevatorPitch());
    // console.log(howard.name); // error
})(protected1 || (protected1 = {}));
// 注意虽然我们不能 name从外部使用Person，但是我们仍然可以从实例方法中使用它，Employee因为它Employee派生自Person。
// 构造函数也可能被标记 protected。这意味着该类不能在其包含的类之外实例化，但可以扩展。例如，
var protected2;
(function (protected2) {
    var Person = /** @class */ (function () {
        function Person(theName) {
            this.name = theName;
        }
        return Person;
    }());
    // Employee can extend Person
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(name, department) {
            var _this = _super.call(this, name) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.getElevatorPitch = function () {
            return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
        };
        return Employee;
    }(Person));
    var howard = new Employee("Jack", "HangZhou");
    console.log(howard.getElevatorPitch());
    // let john = new Person("John"); // Error: The 'Person' constructor is protected
})(protected2 || (protected2 = {}));
// 只读 readonly
var readonly1;
(function (readonly1) {
    var Octopus = /** @class */ (function () {
        function Octopus(theName) {
            this.numberOfLegs = 8;
            this.name = theName;
        }
        return Octopus;
    }());
    var dad = new Octopus("Man with the 8 strong legs");
    console.log(dad);
    // dad.name = "Man with the 3-piece suit"; // error! name is readonly.
})(readonly1 || (readonly1 = {}));
// 访问器
// 在这个版本中，我们检查以确保用户在我们允许他们修改员工之前有一个秘密密码。
// 我们通过用fullName一个set将检查密码的直接访问来替代。我们添加一个相应的get以允许前面的示例继续无缝工作。
var getSet;
(function (getSet) {
    // 秘钥
    var passcode = "secret passcode";
    var Employee = /** @class */ (function () {
        function Employee() {
        }
        Object.defineProperty(Employee.prototype, "fullName", {
            get: function () {
                return this.fname;
            },
            set: function (newName) {
                if (passcode && passcode == "secret passcode") {
                    this.fname = newName;
                }
                else {
                    console.log("Error: Unauthorized update of employee!");
                }
            },
            enumerable: false,
            configurable: true
        });
        return Employee;
    }());
    var employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        console.log(employee.fullName);
    }
    // 访问器要求您将编译器设置为输出ECMAScript 5或更高版本。向下转换为ECMAScript 3不受支持。
    // 其次，具有a get和no的访问器set被自动推断为是readonly。这在.d.ts从代码生成文件时很有用，因为您的属性的用户可以看到他们无法更改它。
})(getSet || (getSet = {}));
// 静态属性
// 到目前为止，我们只讨论了类的实例成员，这些成员在实例化时显示在对象上。我们也可以创建一个类的静态成员，这些成员在类本身而不是实例上是可见的。
// 在这个例子中，我们使用static原点，因为它是所有网格的一般值。每个实例通过预先添加类的名称来访问此值。与this.在实例访问前面预先设置类似，这里我们Grid.在静态访问前加上前缀。
var static1;
(function (static1) {
    var Grid = /** @class */ (function () {
        function Grid(scale) {
            this.scale = scale;
        }
        Grid.prototype.calculateDistanceFromOrigin = function (point) {
            var xDist = (point.x - Grid.origin.x);
            var yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        };
        Grid.origin = { x: 0, y: 0 };
        return Grid;
    }());
    var grid1 = new Grid(1.0); // 1x scale
    var grid2 = new Grid(5.0); // 5x scale
    console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
})(static1 || (static1 = {}));
// 抽象类 抽象类是可以派生其他类的基类。它们可能不会被直接实例化。与接口不同，抽象类可能包含其成员的实现细节。
var abstractClass;
(function (abstractClass) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.move = function () {
            console.log("roaming the earth...");
        };
        return Animal;
    }());
    // 抽象类中标记为抽象的方法不包含实现，并且必须在派生类中实现。抽象方法与接口方法有相似的语法。
    // 两者都定义了方法的签名而不包含方法体。但是，抽象方法必须包含abstract关键字，并可以选择包含访问修饰符。
    var Department = /** @class */ (function () {
        function Department(name) {
            this.name = name;
        }
        Department.prototype.printName = function () {
            console.log("Department name: " + this.name);
        };
        return Department;
    }());
    var AccountingDepartment = /** @class */ (function (_super) {
        __extends(AccountingDepartment, _super);
        function AccountingDepartment() {
            return _super.call(this, "Accounting and Auditing") || this;
        }
        AccountingDepartment.prototype.printMeeting = function () {
            console.log("The Accounting Department meets each Monday at 10am.");
        };
        AccountingDepartment.prototype.generateReports = function () {
            console.log("Generating accounting reports...");
        };
        return AccountingDepartment;
    }(Department));
    var department; // ok to create a reference to an abstract type
    // department = new Department(); // error: cannot create an instance of an abstract class
    department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
    department.printName();
    department.printMeeting();
    // department.generateReports(); // error: method doesn't exist on declared abstract type
})(abstractClass || (abstractClass = {}));
