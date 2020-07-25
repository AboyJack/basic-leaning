import Vue from 'vue'
import Router from 'vue-router'

import VueCommunicate from '@/components/vue-communicate/parent.vue'
import VueForm from '@/components/vue-form'
import VueMenu from '@/components/vue-menu'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
    }
  ]
})