<template>
  <vue-menu>
    <template v-for="i in datas">
      <resub :data="i"
             :key="i.id"></resub>
    </template>
  </vue-menu>
</template>
<script>
  import vueMenu from './vue-menu'
  import resub from './resub'
  export default {
    props: {
      data: {
        type: Array,
        default: () => ([])
      }
    },
    components: {
      'vue-menu': vueMenu,
      resub
    },
    data () {
      return {
        datas: [
          { title: 'node 1', id: 1 },
          {
            title: 'node 2',
            id: 2,
            children: [
              {
                title: 'node 2-1',
                id: 211,
                children: [
                  { title: 'node 2-1-1', id: 2111 },
                  { title: 'node 2-1-2', id: 2112 }
                ]
              }
            ]
          },
          {
            title: 'node 3',
            id: 3,
            children: [
              { title: 'node 3-1', id: 311 }
            ]
          },
        ]
      }
    },
  }
</script>
