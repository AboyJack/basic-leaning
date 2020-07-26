import Vue from 'vue'
import router from './router'
import App from './App.vue'

import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.gif'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3, // 可见区域的1.3倍
  loading
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')