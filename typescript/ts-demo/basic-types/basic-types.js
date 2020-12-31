"use strict";
/**
 * 基本类型
 */
// 布尔
var isTrue = true;
// 数值
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
// 字符串
var color = "blue";
color = 'red';
// 模板字符串
var fullName = "Bob Bobbington";
var age = 37;
var sentence = "Hello, my name is " + fullName + "\n\n.I'll be " + (age + 1) + " years old next month.";
// 排列
var list = [1, 2, 3];
var list2 = [1, 2, 3];
// 元组 允许表达一个数组，其中固定数量的元素的类型是已知的，但不一定是相同的。例如，您可能想要将值表示为一对a string和a number
// Declare a tuple type
var x;
// Initialize it
x = ["hello", 10.555]; // 正常写法
// Initialize it incorrectly
// x = [10, "hello"]; // 错误写法
console.log(x[0].substr(1), x[1].toFixed(1));
// Any
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
// Void 有点像是相反的any：没有任何类型。您通常可以将此视为不返回值的函数的返回类型：
function warnUser() {
    alert("This is my warning message");
}
var unusable = undefined;
// 空和未定义
// 在TypeScript，undefined和null实际有自己类型的命名 undefined和null分别 很像void，他们对自己并不是非常有用：
var u = undefined;
var n = null;
// 默认情况下，null并undefined在所有其它类型的亚型。这意味着你可以分配null和undefined类似的东西number。
// 然而，在使用时--strictNullChecks标志，null并undefined仅分配给void他们各自的类型。这有助于避免许多常见错误。
// 如果您想要传入string或null或者undefined，您可以使用联合类型string | null | undefined。再一次，更多的关于工会类型。
// 决不 
// never类型表示永远不会发生的值的类型。
// 例如，never函数表达式或箭头函数表达式的返回类型总是抛出一个异常或永远不会返回的异常; 
// 变量也never通过任何类型的守卫缩小类型，永远不会是真实的。
// 该never类型是每种类型的一种子类型，并可分配给它; 然而，没有类型是它的子类型或可赋值的类型never（除了never它本身）。即使any不能分配给never。
// Function returning never must have unreachable end point
function error(message) {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop() {
    while (true) {
    }
}
// 输入断言 有时你最终会发现你会比TypeScript更了解一个值。通常这会发生在你知道某个实体的类型可能比其当前类型更具体时。
// 类型断言是一种告诉编译器“相信我，我知道我在做什么”的方式。类型断言就像其他语言中的类型转换，但不执行特殊的检查或重构数据。
// 它没有运行时影响，纯粹由编译器使用。TypeScript假定您，程序员已经执行了您需要的任何特殊检查。
// 类型断言有两种形式。一个是“角括号”语法：
var someValue = "this is a string";
var strLength = someValue.length;
// 另一个是 - as语法：
var strLength2 = someValue.length;
// 这两个样本是相同的。使用其中之一大多是一种偏好选择; 但是，当通过JSX使用TypeScript时，只允许使用as样式断言。
