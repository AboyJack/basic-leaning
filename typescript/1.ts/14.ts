/**
 * namespace 
 * 作用：
 * 1. 封装类似的代码
 * 2. 防止命名冲突
 * 
 */
namespace zoo {
  export class Dog { }
}
namespace home {
  export class Dog { }
}
let dog = new home.Dog()
let dog2 = new zoo.Dog()