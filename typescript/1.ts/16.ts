// 如何定义一个复杂对象
// 声明一个叫JQuery的命名空间
declare namespace JQuery {
  function ajax(url: string, config: any): void
  let name: string
  namespace fn {
    function extend(object: any): void
  }
}
JQuery.ajax('/api/user', {})
JQuery.name = '$'
JQuery.fn.extend({})