import Vue from 'vue'
import Router from 'vue-router'

import VueCommunicate from '@/components/vue-communicate/parent.vue'
<<<<<<< HEAD
=======
import VueForm from '@/components/vue-form'
import VueMenu from '@/components/vue-menu'
import VueLazyload from '@/components/vue-lazyload';
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384

Vue.use(Router)

export default new Router({
  mode: 'hash',
<<<<<<< HEAD
  routes: [{
    path: '/vue-communicate',
    name: 'vue组件通信方式',
    component: VueCommunicate
  }]
=======
  routes: [
    {
      path: '/vue-communicate',
      name: 'vue组件通信方式',
      component: VueCommunicate
    },
    {
      path: '/vue-form',
      name: '表单组件',
      component: VueForm
    },
    {
      path: '/vue-menu',
      name: '菜单组件',
      component: VueMenu
    },
    {
      path: '/vue-lazyload',
      name: '图片懒加载',
      component: VueLazyload
    },
  ]
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
})