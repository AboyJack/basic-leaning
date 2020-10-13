<template>
  <div class="vue-communicate">
    <div><a @click="() => count = 100">重置</a></div>
    <h3>父组件: </h3>
    <div> 数量： {{count}}</div>
    <children-one :count="count"
                  @change-count="changeCount"></children-one>
    <!-- 什么时候用.sync v-model -->
    <children-one :count.sync="count"
                  @change-count="changeCount"></children-one>
    <!-- v-model => count + @change-count 的简写  局限性 只能传value -->
    <!-- <children-one v-model="count"></children-one> -->
  </div>
</template>
<script>
  import childrenOne from './children-one'
  export default {
    components: {
      childrenOne
    },
    data () {
      return {
        count: 100
      }
    },
    methods: {
      changeCount (val) {
        this.count = val
      }
    }
  }
</script>
<style lang="scss">
  .vue-communicate {
    h3,
    div {
      text-align: center;
    }
  }
</style>
