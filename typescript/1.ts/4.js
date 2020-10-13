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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * 装饰器
 * 装饰器是一种特殊类型声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
 * 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
 * 装饰器的写法分为普通装饰器和装饰器工厂
 */
var a;
(function (a) {
    /**
     * 类装饰器
     */
    function enhancer(target) {
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.xx);
    console.log(p.yy);
})(a || (a = {}));
// 把类整个替换
var b;
(function (b) {
    function enhancer(name) {
        return function enhancer(target) {
            return /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = name;
                    _this.age = 10;
                    return _this;
                }
                return class_1;
            }(target));
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'person';
        }
        Person = __decorate([
            enhancer('jj')
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
})(b || (b = {}));
var c;
(function (c) {
    /**
     * 属性装饰器
     */
    // target 如果装饰的是个普通属性的话 那么这个target指向类的原型 Person.prototype
    // target 如果装饰的是类的属性static 那么这个target指向类的定义
    function upperCase(target, propertyName) {
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    /**
     * 只修饰属性
     * @param flag
     */
    function propertyEnumerable(flag) {
        return function (target, propertyName) {
        };
    }
    /**
     * 修饰方法
     * @param flag
     */
    function fnEnumerable(flag) {
        return function (target, fnName, pd) {
            pd.enumerable = flag;
        };
    }
    function setAge(age) {
        return function (target, fnName, pd) {
            target.age = age;
        };
    }
    function toNumber(target, fnName, pd) {
        var oldFn = pd.value;
        pd.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldFn.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () { };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            upperCase,
            propertyEnumerable(false)
        ], Person.prototype, "name", void 0);
        __decorate([
            fnEnumerable(true)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(10)
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    p.name = 'abc';
    console.log(p.name);
    for (var attr_1 in p) {
        console.log('attr---' + attr_1);
    }
    console.log(Person.age);
    console.log(p.sum('1', '2', '3'));
})(c || (c = {}));
var d;
(function (d) {
    /**
     * 参数装饰器 装饰方法参数
     */
    function addPwd(target, fnName, paramIndex) {
        // console.log(target, fnName, paramIndex) // Person { login: [Function (anonymous)] } login 1
        target.num = 789;
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (uname, pwd) {
            console.log(uname, pwd + this.num);
        };
        __decorate([
            __param(1, addPwd)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('admin', '123456');
})(d || (d = {}));
// 装饰器优先级 
// 属性方法先执行 谁先写执行谁
// 方法的时候 先参数再方法 而且它们一定会在一起
// 最后是类
// 如果是同类型的 先执行后写的
