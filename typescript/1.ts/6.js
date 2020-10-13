"use strict";
/**
 * 任意属性
 */
var a;
(function (a) {
    var obj = {
        x: 1,
        y: 2,
        c: 3
    };
})(a || (a = {}));
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        Person.prototype.speakChinese = function () { };
        return Person;
    }());
    var circle = {
        PI: 3.1415926,
        radius: 10
    };
    var cost = function (price) {
        return price * .8;
    };
    var arr = ['1', '2', '3'];
    console.log(arr); // [ '1', '2', '3' ]
    var obj2 = {
        1: '1',
        2: '2'
    };
})(b || (b = {}));
var c;
(function (c) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        Dog.prototype.speak = function () { };
        return Dog;
    }());
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    function createAnimal(clazz, name) {
        return new clazz(name);
    }
    var a = createAnimal(Animal, 'dog');
})(c || (c = {}));
