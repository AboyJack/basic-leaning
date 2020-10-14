import Vue from 'vue'
import router from './router'
import App from './App.vue'

<<<<<<< HEAD
Vue.config.productionTip = false
=======
import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.gif'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3, // 可见区域的1.3倍
  loading
})
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')