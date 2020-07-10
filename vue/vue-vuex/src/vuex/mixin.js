const applyMixin = (Vue) => {
  Vue.mixin({
    beforeCreate: vuexInit
  })
}
/**
 * vue-router 是把属性定义到根实例上 所有组件都能拿到这个根 通过实例获取这个属性
 * vuex 给每个组件都定义了一个$store属性 指向的是同一个属性
 */
function vuexInit() {
  const options = this.$options
  if (options.store) {
    // 根实例
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    // 子组件
    this.$store = options.parent.$store
  }
}
// 组件的创建过程 是先父后子
export default applyMixin