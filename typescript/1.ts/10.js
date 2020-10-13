"use strict";
var a;
(function (a) {
    var p = {
        name: 'a',
        fly: function () { },
        play: function () { }
    };
})(a || (a = {}));
var b;
(function (b) {
    // typeof 可以获取一个变量的类型
    // type Person = {
    //   name: string,
    //   age: number
    // }
    var p = {
        name: 'a',
        age: 10
    };
    var p2 = {
        name: 'v',
        age: 20
    };
    var myName = 'fe';
    var myLever = 10;
    function getValueByKey(val, key) {
        return val[key];
    }
    var person3 = {
        name: 'a',
        age: 10,
        gender: 'male'
    };
    var name = getValueByKey(person3, 'name');
})(b || (b = {}));
