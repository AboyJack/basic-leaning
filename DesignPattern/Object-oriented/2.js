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
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, money, num) {
        var _this = _super.call(this, name, age, money) || this;
        _this.num = num;
        return _this;
    }
    Student.prototype.getName = function () {
        console.log("\u540D\u5B57\uFF1A" + this.name);
    };
    Student.prototype.getAge = function () {
        console.log("\u5E74\u9F84\uFF1A" + this.age);
    };
    return Student;
}(Person));
var s1 = new Student('Jack', 20, 100, 1);
s1.getName();
s1.getAge();
