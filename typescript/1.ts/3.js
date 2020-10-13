"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'jj';
            this.age = 10;
        }
        return Person;
    }());
    var p1 = new Person();
    console.log(p1.name, p1.age);
})(a || (a = {}));
var b;
(function (b) {
    // 存取器 getter setter
    var Person = /** @class */ (function () {
        function Person(name) {
            this.n = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.n;
            },
            set: function (newVal) {
                this.n = newVal.toUpperCase();
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('jj');
    console.log(p.name);
    p.name = 'tt';
    console.log(p.name);
})(b || (b = {}));
var c;
(function (c) {
    var Person = /** @class */ (function () {
        // 参数属性
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    var p = new Person('hello', 10);
    console.log(p.name);
    // p.age = 12;
})(c || (c = {}));
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
var d;
(function (d) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.money = 100;
        }
        Person.prototype.getName = function () {
            return this.name;
        };
        Person.prototype.setName = function (newVal) {
            this.name = newVal + " world";
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.prototype.getStuNo = function () {
            return this.stuNo;
        };
        Student.prototype.setStuNo = function (newVal) {
            this.stuNo = newVal;
        };
        Student.getClassName = function () {
            return this.className;
        };
        Student.className = 'one';
        return Student;
    }(Person));
    var s = new Student('hello', 20, 1);
    console.log(Student.className);
})(d || (d = {}));
