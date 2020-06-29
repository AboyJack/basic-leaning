"use strict";
/**
 * 泛型(Generics)
 * 指在定义函数、接口或类的时候 不预先指定具体的类型 而在使用的时候再指定类型的一种特性
 * 泛型 T 作用域只限于函数内部使用
 *
 * 什么时候用泛型
 */
var a;
(function (a_1) {
    // 泛型函数
    function createArray(length, value) {
        var res = [];
        for (var i = 0; i < length; i++) {
            res[i] = value;
        }
        return res;
    }
    var r1 = createArray(3, 6);
    var r2 = createArray(3, 'a');
    console.log(r1, r2);
    // 类数组
    function sum() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var arg = arguments;
        for (var i = 0; i < arg.length; i++) {
            console.log(arg[i]);
        }
    }
    sum(1, 2, 3, '4');
    // 
    // let root: HTMLElement | null = document.getElementById('root')
    // let children: HTMLCollection = root.children
    // let childNodes: NodeListOf<ChildNode> = root.childNodes
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (val) {
            this.list.push(val);
        };
        MyArray.prototype.getMax = function () {
            var result = this.list[0];
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i];
                }
            }
            return result;
        };
        return MyArray;
    }());
    var arr = new MyArray();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    var r3 = arr.getMax();
    console.log(r3);
    var add = function (a, b) {
        return a;
    };
    var r4 = add(5, 5);
    console.log(r4);
    // 多个类型参数 如何在不增加中间变量的情况下 交换两个变量的值
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
    var r5 = swap(['abc', 123]);
    console.log(r5);
    // let a = 1, b = 2;
    // [b, a] = [a, b]
})(a || (a = {}));
var b;
(function (b) {
    // 默认泛型类型
    function defaultType(length) {
        var t = null;
        return t;
    }
    var r1 = defaultType(3);
    console.log(r1);
    function logger(val) {
        console.log(val.length);
    }
    logger('aaa');
    var cart = {
        list: [1, 2, 3,]
    };
    var c1 = { list: ['1'] };
    var c2 = ['1'];
    /**
     * 泛型接口(interface)和泛型类型别名(type)的区别？
     * interface是定义了一个实实在在的接口 他是个真正的类型
     * type 一般用来定义别名 并不是一个真正的类型
     *
     * 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
     * 类型别名不能被extends和implements， 这时我们应该尽量使用接口代替类型别名
     * 当我们需要使用联合类型或者元组类型的时候 类型别名更合适
     */
})(b || (b = {}));
