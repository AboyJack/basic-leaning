<template>
  <div id="app">
<<<<<<< HEAD
    <ul>
=======
    <ol>
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
      <li v-for="rl of routerList"
          :key="rl.router">
        <a @click="toRouter(rl.router)"
           class="list">{{rl.label}}</a>
      </li>
<<<<<<< HEAD
    </ul>
=======
    </ol>
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
    <router-view />
  </div>
</template>

<script>
<<<<<<< HEAD

=======
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
  export default {
    name: 'App',
    data () {
      return {
<<<<<<< HEAD
=======
        imgs: [],
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
        routerList: [
          {
            label: 'vue组件通信',
            router: '/vue-communicate'
          },
          {
            label: 'vue中jsx的语法',
            router: '/vue-jsx'
<<<<<<< HEAD
=======
          },
          {
            label: 'vue表单组件',
            router: '/vue-form'
          },
          {
            label: 'menu组件',
            router: '/vue-menu'
          },
          {
            label: '图片懒加载',
            router: '/vue-lazyload'
>>>>>>> 338665cc724177ca023dbcfee2c83d4ac5918384
          }
        ]
      }
    },
    methods: {
      toRouter (r) {
        // console.log(this.$router.currentRoute.path)
        if (this.$router.currentRoute.path === r) return
        this.$router.push(r)
      }
    }
  }
</script>

<style lang="scss">
  a {
    color: dodgerblue;
    cursor: pointer;
    &:active,
    &:hover {
      color: deepskyblue;
    }
  }
  button {
    min-width: 80px;
    height: 35px;
    line-height: 25px;
    background-color: #77b5f5;
    border: 1px solid #77b5f5;
    border-radius: 4px;
    color: #ffffff;
    outline: none;
    cursor: pointer;
    &:active {
      background-color: #94c1ef;
      border-color: #94c1ef;
    }
  }
</style>
