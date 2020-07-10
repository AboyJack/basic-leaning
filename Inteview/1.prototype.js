function Foo () {
  getName = function () {
    console.log(1);
  }
  return this;
}

Foo.getName = function () {
  console.log(2);
}

Foo.prototype.getName = function () {
  console.log(3);
}

var getName = function () {
  console.log(4);
}

function getName () {
  console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();



/**
 * 1. 编译阶段和执行阶段
 * 2. 编译阶段：
 *  2.1 扫描所有的 function 函数声明
 *  2.2 扫描所有的 var 关键字 (如果已有相同函数声明 则忽略该 var 声明)
 * 3. 执行函数
 *  3.1
 */