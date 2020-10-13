<template>
  <div>
    {{$store.state.age}}
    {{$store.getters.getAge}}
    <br>
    <button @click="$store.commit('changeAge', 5)">同步更新状态</button>
    <button @click="$store.dispatch('changeAge', 5)">同步更新状态</button>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
</style>
