<template>
  <div class="box">
    <li v-for="img in imgs"
        :key="img">
      <img :src="img">
    </li>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        imgs: []
      }
    },
    created () {
      axios.get('').then(({ data }) => {
        this.imgs = data
      })
    },
  }
</script>
<style lang="scss" scoped>
  .box {
    height: 300px;
    overflow: scroll;
    width: 300px;
    img {
      width: 200px;
      height: 200px;
    }
  }
</style>
