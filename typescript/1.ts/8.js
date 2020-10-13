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
 * 结构类型系统
 */
var a;
(function (a) {
    function getName(animal) {
        return animal.name;
    }
    var p = {
        name: 'jj',
        age: 10
    };
    console.log(getName(p));
    /**
     * 基本类型的兼容性
     */
    var num;
    var str = 'hello';
    num = str;
    str = num;
    var num2;
    var str2 = 'hi';
    num2 = str2;
    // str2.toString()
})(a || (a = {}));
var b;
(function (b_1) {
    /**
     * 类的兼容性
     * 与类型无关
     * 不管这个对象的具体类型 只要属性有就可以
     */
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bird;
    }(Animal));
    var a;
    a = new Bird(); // 父类的变量能
    var b;
    b = new Animal();
    b = { name: 'aaa' };
})(b || (b = {}));
var c;
(function (c_1) {
    var sum;
    function f1(a, b) {
        return a;
    }
    sum = f1;
    function f2(a) {
        return a;
    }
    sum = f2;
    function f3() {
        return 1;
    }
    sum = f3;
    function f4(a, b, c) {
        return a;
    }
    var getPerson;
    function g1() {
        return { name: 'string', age: 11 };
    }
    getPerson = g1;
    function g2() {
        return { name: 'string' };
    }
    // getPerson = g2 // 少了参数不行
    function g3() {
        return { name: 'string', age: 11, home: 'sz' };
    }
    getPerson = g3;
    var log;
    function log1(a) {
        console.log(a);
    }
    log = log1;
})(c || (c = {}));
var d;
(function (d_1) {
    var x;
    var y;
    // 枚举的兼容性
    var Colors;
    (function (Colors) {
        Colors[Colors["Red"] = 0] = "Red";
        Colors[Colors["Yellow"] = 1] = "Yellow";
    })(Colors || (Colors = {}));
    var c;
    c = Colors.Red; // = 0
    c = 1;
    var d;
    d = Colors.Yellow; // = 1
})(d || (d = {}));
