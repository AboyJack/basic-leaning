"use strict";
// 函数定义
function hello(name) {
    console.log("hello " + name);
}
// 函数表达式
var getUserName = function (firstName, lastName) {
    return {
        name: firstName + lastName
    };
};
var getUserName2 = function (firstName, lastName) { };
// 可选参数
function print(name, age, home) {
}
print();
print('hello');
print('hello', 20, 'sz');
// 默认参数
function ajax(url, method) {
    if (method === void 0) { method = 'POST'; }
    console.log(url, method);
}
ajax('/login');
ajax('/login', 'GET');
// 剩余函数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (accu, item) { return accu + item; }, 0);
}
/**
 * 函数重载
 * 重载的定义和函数声明要依次在一起
 */
var obj = {};
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('jj');
attr(20);
// attr(true);
console.log(obj);
function sum2(a, b) {
    return a + b;
}
sum2('a', 'b');
sum2(1, 1);
