import applyMixin from "./mixin"
import {
  getEachObjFnKey
} from './utils'

let Vue
// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    // console.log(options)
    this.state = options.state // 用户传递过来的状态
    // 如果直接将state定义在实例上 稍后这个状态发生变化 视图是不会更新的

    // defineReactive -> vue-router 之定义了一个属性
    // vue中定义数据 属性名是有特点的 如果属性名是通过 $xxx 来命名的 它不会被代理到vue实例上
    this._vm = new Vue({
      data: { // 内部的状态
        $$state: state
      }
    })

    // getters 其实写的是方法 但是取值的时候是属性 
    getEachObjFnKey(options.getters, (fn, key) => {
      Object.defineProperty(this.getters, key, {
        get: () => fn(this.state)
      })
    })
    // defineProperty 去定义这个属性
    this.getters = options.getters
  }
  // 类的属性访问器 当用户去这个实例上去state属性时 会执行此方法
  get state() {
    return this._vm._data.$$state
  }
}
const install = (_Vue) => {
  Vue = _Vue
  console.log(install) // vue-router 调用install目的 注册了全局组件、全局方法 mixin -> router 实例绑定了所有的组件
  applyMixin(Vue)
}

export {
  Store,
  install
}