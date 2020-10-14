<<<<<<< HEAD
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
    function __ () { this.constructor = d; } // 让 constructor 指向子类的构造函数
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
exports.__esModule = true;
/**
 * 继承
 */
var Father = /** @class */ (function () {
  function Father (name) {
    this.name = name;
    this.name = name;
  }
  Father.prototype.getName = function () {
    console.log(this.name);
  };
  Father.staticFatherName = 'FatherName';
  Father.staticGetFatherName = function () {
    console.log(Father.staticFatherName);
  };
  return Father;
}());
var Child = /** @class */ (function (_super) { // _super = Father
  __extends(Child, _super);
  function Child (name, age) {
    // this 其实是指向子类的实例 new Object {} 子类的实例
    // _super.call是在调用父类的构造函数，初始化父类的私有属性
    var _this = _super.call(this, name) || this;
    _this.name = name;
    _this.age = age;
    _this.age = age;
    return _this;
  }
  Child.prototype.getAge = function () {
    console.log(this.age);
  };
  Child.staticChildName = 'ChildName';
  Child.staticGetChildName = function () {
    console.log(Child.staticChildName);
  };
  return Child;
}(Father));
var child = new Child('zhangsan', 20);
child.getName();
child.getAge();
Child.staticGetChildName();
Child.staticGetFatherName();
=======
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
    function __ () { this.constructor = d; } // 让 constructor 指向子类的构造函数
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
exports.__esModule = true;
/**
 * 继承
 */
var Father = /** @class */ (function () {
  function Father (name) {
    this.name = name;
    this.name = name;
  }
  Father.prototype.getName = function () {
    console.log(this.name);
  };
  Father.staticFatherName = 'FatherName';
  Father.staticGetFatherName = function () {
    console.log(Father.staticFatherName);
  };
  return Father;
}());
var Child = /** @class */ (function (_super) { // _super = Father
  __extends(Child, _super);
  function Child (name, age) {
    // this 其实是指向子类的实例 new Object {} 子类的实例
    // _super.call是在调用父类的构造函数，初始化父类的私有属性
    var _this = _super.call(this, name) || this;
    _this.name = name;
    _this.age = age;
    _this.age = age;
    return _this;
  }
  Child.prototype.getAge = function () {
    console.log(this.age);
  };
  Child.staticChildName = 'ChildName';
  Child.staticGetChildName = function () {
    console.log(Child.staticChildName);
  };
  return Child;
}(Father));
var child = new Child('zhangsan', 20);
child.getName();
child.getAge();
Child.staticGetChildName();
Child.staticGetFatherName();
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
