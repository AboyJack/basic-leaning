- 父子组件通信
   - 父组件传给子组件：子组件通过 **`props`** 方法接受数据
   - 子组件传给父组件：**`$on`** **`$emit`** 方法传递参数
- 兄弟组件通信
   - 可以通过查找父组件中的子组件实现，也就是  ==`this.$parent.$children`== ，在 ==`$children`== 中可以通过组件 ==`name`== 查询到需要的组件实例，然后进行通信。
- 跨多层组件通信
   - 可以使用 Vue 2.2 新增的 API ==`provide / inject`== <br>假设有父组件 A，然后有一个跨多层级的子组件 B
   
```js
// 父组件 A
export default {
  provide: {
    data: 1
  }
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  }
}
```
   
- `Ref` 获取实例的方式调用组件的属性或者方法

- 任意组件通信
   - 可以通过 `Vuex` 状态管理实现通信 或者 `Event Bus` 跨组件通信 解决，另外如果你不怕麻烦的话，可以使用这种方式解决上述所有的通信情况
（vux）