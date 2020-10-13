"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 如果代码里有 export import 之类的代码 name这个文件就会变成一个模块
var name = 'hello';
var age = 20;
var married = true;
var hobbies = ['1', '2', '3'];
var interests = ['4', '5', '6'];
/**
 * 元组 类似一个数组 他是一个长度和类型都固定的数组 特点有：
 * 1. 长度固定
 * 2. 类型可以不一样
 */
var point = [100, 100];
point[0], point[1];
var person = ['hello', 20, false];
/**
 * 枚举
 * 普通枚举可以改 常量枚举不能更改
 */
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log("T is " + Gender.GIRL);
var Week;
(function (Week) {
    Week["DAY"] = "d";
    Week["MON"] = "m";
})(Week || (Week = {}));
console.log(Week.DAY);
console.log(0 /* Red */, 1 /* Yellow */, 2 /* Blue */);
/**
 * 任意类型 anyscript
 * 一般什么时候用到？第三方库没有类型 类型转换的时候 数据结构太复杂太灵活 尽量少用
 */
var aaaa = {};
// ts 为 dom 提供了一整套的类型声明
// let root = document.getElementById('root');
// root!.style.color = 'red'; // ! 断言不为空
// null 空 undefined 未定义 它们都有其他类型的子类型 你可以把它们赋给其他类型的变量 配置"strictNullChecks": false,
var n1 = null;
var n2 = undefined;
var x;
x = 1;
x = undefined;
x = null;
/**
 * void 类型
 * 空  没有
 */
function greeting(name) {
    console.log("hello " + name);
}
greeting('word');
/**
 * never 永不
 * never 是其它类型的子类型，代表不会出现的值
 * 在函数内部会永远抛出错误，导致函数无法正常结束
 * 例如场景需求：
 * 1. 如果启动一个后台任务，就是一个死循环 事件环函数 计划任务
 * 2. 写一些单元测试
 */
function createError(message) {
    throw new Error('error');
    console.log('end point');
}
function sum() {
    while (true) {
        console.log('hello');
    }
    console.log('end point');
}
// 类型推论
var x1 = 2;
x1 = 4;
var x2;
x2 = 4;
x2 = 'ddd';
/**
 * 包装对象
 *  比如 Java中的装箱和拆箱
 *  自动的在基本类型和对象类型之间切换
 *  1. 基本类型上没有方法
 *  2. 在内部迅速的完成一个装箱操作，把基本类型包装成对象类型，然后用对象来调用方法
 */
var d1 = 'h';
// d2 = new String(d1)
d1.toLocaleLowerCase();
/**
 * 联合类型
 */
var n5;
n5 = 'j';
n5.toLocaleLowerCase();
n5 = 22;
n5.toFixed(2);
var n6;
var n7 = n6;
n6.toLocaleLowerCase();
n7.toFixed(2);
/**
 * 字面量类型
 */
var Gender2;
Gender2 = 'Boy';
Gender2 = 'Girl';
