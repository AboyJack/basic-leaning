let factories = {}
/*
* moduleName 模块名
* dependencies 依赖
* factory 工厂函数
*/
function define (moduleName, dependencies, factory) {
  factory.dependencies = dependencies; // 将依赖挂在factory上
  factories[moduleName] = factory;
}
function require (mods, callback) {
  let result = mods.map(function (mod) {
    let factory = factories[mod];
    let exports;
    let dependencies = factory.dependencies; // ['']
    // require('name', function (name, age) {})
    require(dependencies, function () {
      exports = factory.apply(null, arguments);
    });
    return exports;
    // exports = factory
  });
  callback.apply(null, result);
}
define('name', [], function () {
  return 'hello';
});
define('age', ['name'], function (name) {
  return `${name} is a 20`;
});
require(['age'], function (age) {
  console.log(age);
});