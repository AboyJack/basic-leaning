<template>
  <div>
    <input type="text"
           :value="value"
           @input="handleInput">
  </div>
</template>
<script>
  export default {
    name: 'vue-input',
    props: {
      value: String
    },
    methods: {
      handleInput (e) {
        this.$emit('input', e.target.value)

        let parent = this.$parent
        while (parent) {
          let name = parent.$options.name
          if (name === 'vue-form-item') {
            break
          } else {
            parent = parent.$parent
          }
        }
        if (parent) {
          parent.$emit('validate')
        }
      }
    },
  }
</script>
