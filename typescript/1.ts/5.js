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
var a;
(function (a) {
    /**
     * 抽象类
     */
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.name = 'Cat';
    console.log(cat.getName());
    var point = { x: 0, y: 0 };
    // 类可以实现多个接口 但只能继承一个父类
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        Person.prototype.eat = function () { };
        return Person;
    }());
    /**
     * 抽象类和接口
     * - 不同类之间共有的属性和方法 可以抽象成一个接口
     * - 而抽象类是提供其他类继承的基类 抽象类不允许被实例化 抽象类中的抽象方法必须在子类中被实现
     * - 抽象类本质是一个无法被实例化的类 其中能够实现方法和初始化属性 而接口仅能用于描述 既不提供实现方法的继承 也不为属性进行初始化
     * - 一个类可以继承一个类或抽象类 但可以实现多个接口
     * - 抽象类也可以实现接口
     */
})(a || (a = {}));
var b;
(function (b) {
    /**
     * 重写(override)和重载(overload)
     * - 重写是指子类重写继承自父类中的方法
     * - 重载时指为同一个函数提供多个类型定义
     *
     * 继承和多态
     * - 继承(Inheritance) 子类继承父类 子类除了拥有父类的所有特性外 还有一些更具体的特性
     * - 多态(Polymorphism) 由继承而产生了相关的不同的类 对同一个方法可以有不同的行为
     */
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.speak = function () {
            console.log('动物叫');
            // throw new Error('此方法不能被调用')
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.speak = function () { console.log('miao miao ~'); };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.speak();
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.speak = function () {
            console.log('wang wang~');
            _super.prototype.speak.call(this); // 通过super 来调用到父类上的方法
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.speak();
})(b || (b = {}));
