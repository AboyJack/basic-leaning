/**
 * var
 *   在if或者for循环中声明的变量会变成全局变量
 *   内层变量可能会覆盖外层变量
 * let
 *   允许块级作用域嵌套
 *   外层作用域无法读取内层作用域的变量
 *   内层作用域可以定义外层作用域的同名变量
 *   函数本身的作用域在其所在的块级作用域之内
 * 区别：
 * var 定义的变量没有块的概念，可以跨块访问，不能跨函数访问，有变量提升，可以重复声明
 * let 定义的变量只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明
 * let 声明的变量只在块级作用域内有效，不存在变量提升，而是绑定在暂时性死区
 * 或者说let变量提升了，但是let声明变量前不能使用该变量，这特性叫暂时性死区(temporal dead zone)
 * 如果有重复声明，let在编译阶段就报错
 */
for (var i = 0; i < 5; i++) {
  console.log('object');
}
console.log(i); // 5

var a = 1;
function fn () {
  console.log(a);
  if (false) {
    var a = 2;
  }
}
fn(); // undefined

{
  let i = 1;
  // console.log(j); // 外层作用域无法访问内层作用域变量 会报错
  {
    let j = 2;
    let i = 2; // 内层作用域可以定义外层作用域的同名变量
    console.log(i);
  }
}

// 函数本身的作用域在其所在的块级作用域之内
'use strict'
function fn () {
  console.log('out');
}
(function () {
  if (false) {
    function fn () {
      console.log('in');
    }
  }
  fn();
}());

// 暂时性死区
{
  let a = 10;
  {
    console.log(a); // 报错
    let a = 20;
  }
}

'use strict'
function func () {
  console.log(i);
  let i;
}
func(); // 报错

'use strict'
var a = 1;
console.log(a); // 1
{
  console.log(a); // [Function: a]
  function a () {
    console.log(1);
  }
}
console.log(a); // 1

// es6 VO和GO进行了分离 会放在VO里不会放在GO里 所以let const 声明的变量window访问不到
let a = 1;
console.log(window.a); // undefined