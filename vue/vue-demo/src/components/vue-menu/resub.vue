<template>
  <vue-submenu :key="data.id"
               v-if="data.children">
    <template slot="title">{{data.title}}</template>
    <template v-for="d in data.children">
      <resub :key="d.id"
             :data="d"></resub>
    </template>
  </vue-submenu>
  <vue-menu-item :key="data.id"
                 v-else>{{data.title}}</vue-menu-item>
</template>
<script>
  import vueSubmenu from './vue-submenu'
  import vueMenuItem from './vue-menu-item'
  export default {
    name: 'resub',
    props: {
      data: {}
    },
    components: {
      'vue-submenu': vueSubmenu,
      'vue-menu-item': vueMenuItem
    },
  }
</script>
