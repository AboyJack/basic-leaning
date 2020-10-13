<template>
  <div>
    <h3>子组件1:</h3>
    父组件的数量: {{count}}
    <button @click="changeValue">改变父组件数量</button>
    <grandson-one></grandson-one>
  </div>
</template>
<script>
  import grandsonOne from './grandson-one';
  export default {
    props: {
      value: Number,
      count: {
        type: Number,
        default: 0
      }
    },
    components: { grandsonOne },
    mounted () {
      console.log(this.value, this.count)
    },
    methods: {
      changeValue () {
        this.$emit('change-count', 500)
      }
    }
  }
</script>
