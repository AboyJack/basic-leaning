<template>
  <div>
    <form @submit.prevent>
      <slot></slot>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'vue-form',
    provide () {
      return { vueForm: this }
    },
    props: {
      model: {
        type: Object,
        default: () => ({})
      },
      rules: Object
    },
    methods: {
      async validate (cb) {
        // 校验所有的form-item 是否符合校验
        let children = this.$children
        let arr = []
        function findFormItem (children) {
          children.forEach(el => {
            if (el.$options.name === 'vue-form-item') {
              arr.push(el)
            }
            if (el.$children) {
              findFormItem(el.$children)
            }
          })
        }
        findFormItem(children)
        try {
          await Promise.all(arr.map(el => el.validate()))
          cb(true)
        } catch (e) {
          cb(false)
        }
      }
    },
  }
</script>
