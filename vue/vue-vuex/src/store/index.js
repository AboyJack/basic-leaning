import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex'

Vue.use(Vuex)
// 跨组件通信
export default new Vuex.Store({
  state: { // 组件的状态 new Vue(data)
    age: 20
  },
  getters: { // 获取 计算属性 相当于new Vue(computed) 依赖 当依赖的值变化后会重新执行
    getAge(state) { // 如果返回结果相同 不会重复执行这个函数
      // 如果age属性不发生变化 就不会重新执行
      return state.age + 10
    }
  },
  mutations: { // vue中的方法唯一可以改状态的方法
    changeAge(state, payload) { // 同步的
      state.age += payload
    }
  },
  actions: { // 通过action发起请求
    changeAge({
      commit
    }, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      }, 1000)
    }
  },
  modules: {

  }
})