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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food + " ");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.eat = function (food) {
        console.log("\u72D7\u72D7\u5403" + food);
    };
    return Dog;
}(Animal));
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Person.prototype.eat = function (food) {
        console.log("\u4EBA\u5403" + food);
    };
    return Person;
}(Animal));
var dog = new Dog('狗狗');
dog.eat('肉');
var person = new Person('人');
person.eat('饭');
