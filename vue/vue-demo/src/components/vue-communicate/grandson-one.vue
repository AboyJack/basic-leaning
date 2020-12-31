<template>
  <div>
    <h4>孙子组件1</h4>
    <button @click="$parent.$emit('count', 123)">改变父组件数量</button>
  </div>
</template>
<script>
  export default {
    props: {
      value: Number
    }
  }
</script>
