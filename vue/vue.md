### 1. vue概念

vue是响应式、渐进式的框架，
核心是 vue组件化开发 -> vue-router -> vuex -> vue-cli

### 2. 什么是库？什么是框架？

库以`JQuery`为例， `JQuery`拥有很多方法， 组成了一个完整的功能， 通过这些功能实现我们自己的功能 特点是主动、手动调用库中的方法

框架是我们只需要将特定的代码放到特定的位置上，框架会帮我去调用， 是被动的

### 4. `mvc` 和 `mvvm` 的区别

mvc 一般用于后端开发框架， model（数据库中的数据），view（前端页面），controller（后端的控制器）。
例如 用户操作界面 发送到后端的路由 -> 路由调用后端的控制器 -> 将数据获取返回给页面

mvvm 特点双向数据绑定 model（js中的数据），view（前端页面），viewModel（视图模型）。
mvvm模式 不需要手动去操作dom的

### 5. 安装vue
`npm install vue`

#### 1. vue中响应式特点
  **1. 响应式规则**<br>
  会递归去循环vue中的属性（浪费性能的地方），会给每个属性都增加`getter`和`setter`，当属性变化时会更新视图。<br>
  数组的特定是重写了数组的方法，当调用数组方法时会触发更新，也会对数组中的每一项进行了监控。<br>

  ```js
  let vm = new Vue({
    data() {
      return {
        msg: { a: 1 },
        arr: [1, 2, { a: 1 }]
      }
    }
  })
  ```
  当直接改变 `vm.msg.b = 2` 或者 `vm.arr[0] = 100` 时，会有以下问题：<br>
  对象只监控了默认自带的属性，新增属性是不生效的；<br>
  数组的索引发生变化或者数组的长度发生变化，是不会触发视图更新的。<br>
  数组中的引用类型是会被监控的 `vm.arr[2],a = 100`<br>
  所以可以使用`vm.$set(vm.arr, 0, 100)` 来触发视图更新，`$set`内部采用的就是`splice`方法
  当要删除数组的第一项时，可以使用`vm.$delete(vm.arr, 0)` 删除第一项，对于一些不响应式的数据我们可以采用这种api的方式去更新视图。vue2.x 中的缺陷。vue.3.0 中通过proxy进行了解决


#### 2. 如何用proxy 来实现响应式原理

缺点：兼容性差

```js
let obj = {
  name: {
    a: 'hello'
  },
  arr: ['a', 'b', 'c']
}
// 可以代理13种方法 get set
// defineProperty 它只能对特定的属性进行拦截
let handler = {
  get (target, key) { // target是原对象 key为当前取的那个值
    console.log('收集依赖');
    // proxy 因为懒代理原因 调用proxy.name.name 触发一次 所以设置深层对象递归代理
    if (typeof target[key] === 'object' && target[key] !== null) {
      // 递归代理 只有取到对应值的时候 才会进行代理
      return new Proxy(target[key], handler);
    }
    // Reflect 反射，这个方法包含了很多的api
    return Reflect.get(target, key);
    // return target[key];
  },
  set (target, key, value) {
    console.log('触发更新');
    // 数组 判断是新增操作还是修改操作
    let oldVal = target[key]; // [1, 2, 3]
    if (!oldVal) {
      console.log('新增属性');
    } else if (oldVal !== value) {
      console.log('修改属性');
    }
    // target[key] = value; // 设置时 如果设置不成功不会报错（对象不可配置的时候）
    Reflect.set(target, key, value);
  }
}
let proxy = new Proxy(obj, handler)

// proxy.name = 123;
// console.log(proxy.name);
proxy.arr[0] = 100;
proxy.age = 20;
```

#### 3. Vue中实例常见属性
  1. `$mount` 挂载 如果不传递参数，表示要手动挂载，可以挂载到页面的任何地方，以前的写法只能放在app中
  2. `$options` 用户传入组件实例的参数所有的选项和Vue中的内置属性
  3. `$watch` 监听更新 多次修改只会更新一次
  4. `$data`
  5. `$nextTick`
  6. `$set`
  7. `$delete`

  ```js
  let vm = new Vue({
    data() {
      // el: '#app',
      template: '<div>{{msg}}</div>',
      return {
        msg: 'hello'
      }
    }
  })
  vm.$mount('#app');
  console.log(vm.$options);
  vm.$watch('msg', function (newVal, oldVal) {
    console.log(newVal);
  });
  vm.msg = 'world';
  vm.msg = 123;
  ```

  #### 4. Vue中指令
  Vue 中的指令都是以 `v-` 开头，指令一般都是用来操作`dom`的，封装的作用

  1. `v-once`
  2. `v-html` 可能会导致 xss攻击（获取用户的cookie） 尽量采用可信任的内容 不要将用户的输入回显，还会覆盖子元素
  3. `v-text` 等价于 `{{}}`
  4. `v-if` `v-else-if` `v-else` 控制dom是否存在，如果控制dom是否产生就用`v-if`（可以阻止后续逻辑的发生）
  5. `v-show` 控制dom的样式 是否显示，它不能使用在`<template>`标签上，如果用户频繁切换显示隐藏就使用`v-show`
  6. `v-for`循环 循环字符串、对象、数组、数字， 切记：不要使用数组的索引作为`key`（如果只是单纯渲染可以使用索引作为`key`）。`v-for`和`v-if`不要同用在一个元素上，因为优先级的问题，默认会先执行`v-for`，可能会导致性能浪费。解决这个问题可以使用`<template>`包起来（注意 `v-for` 放在 `template`上必须将`key`放在真是dom元素上）。
  7. `v-model` 双向绑定 语法糖
  8. `v-bind:class` 简写成 `:class`
  9. `v-on:click` 简写成 `@click` 事件是绑定给元素的，而且内部是原生事件

  ```html
  <div id="app">
    <!-- 只渲染一次 -->
    <div v-once>{{msg}}</div>
    <!-- innerHTML -->
    <div v-html="text"></div>
    <template v-if="true">
      <div>xxx</div>
    </template>
    <!-- 当索引作为key 值与索引一样的时候 渲染冲突 会抛错误 所以可以对index作一些处理 -->
    <!-- 这种添加前缀方式 给索引增加唯一标识 只是为了渲染不冲突 尽量不要使用索引  -->
    <div v-for="(a, index) in 3"
        :key="`a_${index}`">
      {{a}} {{index}}
    </div>
    <div v-for="(b, index) in 3"
        :key="`b_${index}`">
      {{a}} {{index}}
    </div>
    <!-- 切记：不要使用数组的索引作为`key`（如果只是单纯渲染可以使用索引作为`key`） -->
    <template v-if="true">
      <div v-for="f of arr" :key="f">
        {{f}}
      </div>
    </template>
    <!-- `v-for` 放在 `template`上必须将`key`放在真是dom元素上 -->
    <template v-for="f of fruit">
      <template v-if="f === 'apple'">
        <div :key="f">
        red {{f}} 
        </div>
      </template>
      <template v-else>
        <div :key="f">
          {{f}}
        </div>
      </template>
    </template>

    <!-- 动态绑定样式和绑定style属性 都是可以放对象或数组两种格式-->
    <div class="s1" :class="['s2', 's3']">xxx</div>
    <div class="s4" :class="{s5: true, s6: false}">xxx</div>
    <div :style="{color: 'red'}">xxx</div>
    <div :style="[{color: 'red'}, fc]">xxx</div>

    <!-- 其他的指令 事件绑定也是通过指令的方式 -->
    <!-- vue中的事件绑定是直接绑定给当前元素 div.addEventListener -->
    <div @click="fn">click</div>
    
    <!-- 指令的修饰符 .stop(阻止冒泡)、 .prevent (阻止默认行为)、 .self、.once、.passive（提高滚动事件效率） -->
    <a href="http://www.baidu.com">
      <span @click.prevent="() => {}">点击</span>
    </a>

    <!-- <input type="text" :value="msg" @input="(e) => msg = e.target.value"> -->
    <input type="text" v-model="msg">

    <!-- input textarea select radio checkbox -->
    <select>
      <option value="" disabled>请选择</option>
      <option v-for="o in opts" 
              :key="o.value"
              :value="o.value">{{o.label}}</option>
    </select>
    <input type="checkbox" v-model="checked" value="1">
    <input type="checkbox" v-model="checked" value="2">
    <input type="checkbox" v-model="checked" value="3">
    <!-- .lazy 懒更新 .trim 去空格 .number 只能输入数字-->
    <input type="text" v-model.lazy="msg">
  </div>
  <script>
    let vm = new Vue({
      data() {
        el: '#app',
        return {
          msg: 'hello',
          text: '<div>text</div>',
          arr: ['apple', 'banana', 'orange', 'apple'],
          fruit: ['apple', 'banana', 'orange', 'apple'],
          fc: { fontSize: '20px' },
          opts: [
            {
              label: 'a',
              value: 1
            },
            {
              label: 'b',
              value: 2
            }
          ],
          checked: []
        }
      },
      methods: {
        fn (e) {
          console.log(e.target, e.currentTarget, this)
        }
      }
    })
  </script>
  ```

#### 5. 计算属性和`watch`

1. `watch` 监听属性
2. `computed` 计算属性

```html
<template>
  <div>
    全选反选 <input type="checkbox" v-model="checkAll">
    <br>
    <input type="checkbox" 
           v-for="(i, index) in checks" 
           :key="`c_${index}`"
           v-model="i.check">
  </div>
<template>
<script>
export default {
  data() {
    return {
      msg: {
        a: 1
      },
      checks: [
        {
          check: true
        }
      ]
    }
  },
  // watch的三种写法 函数、对象、字符串
  watch: {
    msg: [{
      handler(newVal, oldVal) {
        console.log(newVal, oldVal); // 如果是对象类型无法获取旧值
      },
      deep: true // 如果当前属性增加了deep: true 就会在内部对这个对象取值
    }, {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      immediate: true // 立即执行
    }, 'fn']
  },
  computed: {
    checkAll: {
      get () { // 当取值时会执行get方法
        // 有一项是false 就停止查找并返回false
        return this.checks.every(el => el.check)
      },
      set (newVal) { // 计算属性很少用set方法，一般只有使用v-model计算属性才会添加set方法
        this.checks.forEach(el => {
          el.check = newVal
        })
      }
    }
  },
  methods: {
    fn () {
      console.log('fn method');
    }
  }
}
</script>
```

计算属性和watch的区别（都是一个watcher）：<br>
- 计算属性内部不会立即获取值，只有取值的时候才执行（它有缓存，如果有依赖的数据不会发生变化，则不会更新结果）
- watch 默认在内部先执行，它要计算出一个旧值，如果数据发生变化会执行回调函数。（没有缓存，立即执行）
- 计算一个结果一般不会使用`methods`，因为`methods`不具备缓存

#### 6. 过滤器的使用
过滤器就是将原数据进行格式化显示，而不改变原数据，一般可以用一些时间格式化、金额转换等

- 全局过滤器
```html
<template>
  <div>
   {{date | date('YYYY-MM-DD')}}
  </div>
<template>
```
```js
Vue.filter('date', function (time, formatter) {
  return moment(time).format(formatter)
})
```
- 局部过滤器

```js
import moment from 'moment'
export default {
  filters: {
    date (time, formatter) {
      return moment(time).format(formatter)
    }
  }
}
```

#### 7. 自定义指令
- 全局自定义指令

```js
Vue.directives()
```
- 局部自定义指令

```html
<template>
  <div v-click-outside="hide">
   <!-- 日历组件 点击输入框 可以显示下面面板 -->
   <input type="text" @focus="show" @blur="hide">
   <div v-if="isShow">显示面板</div>
  </div>
  <!-- 初始化时输入框获取焦点 -->
  <input type="text" v-focus> 
<template>
<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  directives: {
    // clickOutSide (el, bindings, vnode) {
    //   // 指令有声明周期 钩子函数
    //   // bind 当指令绑定上的时候 会执行一次
    //   // inserted 插入的时候
    //   // update 当引用的数据变化时会执行一个钩子
    //   // componentUpdate 组件更新完之后
    //   // unbind

    //   // 默认写成一个函数的时候 默认 bind + update
    //   document.addEventListener('click', function (e) {
    //     if (!el.contains(e.target)) {
    //       let method = bindings.expression;
    //       // this.hide() =>
    //       vnode.content[method]();
    //     }
    //   })
    // }
    focus: {
      // bind (el, bindings, vnode) {
      //   this.$nextTick(() => {
      //     el.focus();
      //   })
      // },
      inserted (el, bindings, vnode) {
        el.focus()
      }
    },
    clickOutSide: {
      bind (el, bindings, vnode) {
        el.handler = function (e) {
          let method = bindings.expression;
          vnode.content[method]();
        }
        // 添加操作
        document.addEventListener('click', el.handler);
      },
      unbind (el) {
        document.removeEventListener('click', el.handler);
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>
```

#### 8. 生命周期

vue 的初始化过程中， 会让用户传入很多函数，这些函数在不同的时间点调用

声明周期中都会有`this` 指向的是当前实例

声明周期是同步执行的

```js
// Vue.mixin({
//   beforeCreate () {
//     console.log('初始化前的公共逻辑')
//   }
// })
// mixin 会导致方法来源不知道怎么来，也是个问题，所以在vue3.0 用compositionApi来解决这个问题
// 它是全局方法 在globalApi里有 主要应用抽离公共组件 + 编写插件
export default {
  // mixin: [beforeCreate],
  beforeCreate () { // 创建前
    // 初始化之前 还没有进行数据观测 只是调用了初始化父子关系及内部的事件 
    // 一般情况下会混入公共逻辑 Vue.mixin
    console.log('beforeCreate', this)
  },
  created () { // 已创建
    // 没有真实的挂载元素 只是初始化数据 无法获取到dom元素的 
    console.log('created', this)
  },
  // template: '<div>hello</div>',
  beforeMount () { // 挂载前
    // 在第一次调用render之前执行 
    console.log('beforeMount')
  },
  render (h) { // 如果调用的是render函数 创建的是虚拟dom
    console.log('render')
    return h('div', this.msg)
  },
  mounted () { // 挂载完成
    // 创建出真是的dom，替换掉老的节点（vm.$el 替换掉 el），vm.$el 渲染真实的 dom
    console.log('mounted')
  },
  beforeUpdate () { // 更新前
    // 可以做一些合并更新操作 
    console.log('beforeUpdate')
  },
  updated () { // 更新后
    // 不要再更新数据了
    console.log('updated')
  },
  beforeDestroy () { // 销毁前
    // 可以做一些自定义事件解绑操作， $off 可以去取消dom的事件绑定 ，定时器的清理
    console.log('beforeDestroy')
  },
  destroy () { // 销毁完成
    console.log('destroy')
  },
  data () {
    return {
      msg: 'hello'
    }
  }
}
```

- ajax 应该在哪里发请求？

> 可以在`beforeCreate()`、`created`、`beforeMount`、异步请求一定是在 `mounted` 之后才会执行，开发的是前端项目在`mounted`中发请求。服务器渲染的vue 不支持 `mounted` 在服务器中没有 `dom` 概念。

- 父子组件生命周期执行

> 父组件会先进行 `beforeCreate` -> `created` -> `beforeMount` -> `render`
<br> 
渲染子组件 `beforeCreate` -> `created` -> `beforeMount` -> `mounted`
<br>
渲染完成之后 父组件`mounted`

#### 8. 动画
Vue中的动画  （当`dom`显示或隐藏时，vue可以管理动画）<br>

`v-for` / `v-if` / `v-show` 可以导致动画生效

```html
<template>
  <div>
    <transition name="fade"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
                <!-- @before-leave="beforeLeave"
                     @leave="leave"
                     @after-leave="afterLeave"  -->
      <div class="box" v-show="isShow">
      </div>
      <button @click="change">Click Me</button>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShow: true
      }
    },
    methods: {
      change () {
        this.isShow = !this.isShow
      },
      beforeEnter (el) { // 可以用 Velocity 动画库
        el.style.background = 'yellow'
      },
      enter (el, done) {
        el.style.background = 'blue'
        setTimeout(() => {
          done()
        }, 1000)
      },
      afterEnter (el) {
        el.style.background = 'pink'
      },
    }
  }
</script>
<style scoped>
  .box {
    background: red;
    width: 100px;
    height: 100px;
  }
  /* 定义颜色初始化时的状态，进入的一瞬间 */
  .fade-enter {
    background: blue;
  }
  .fade-enter-active {
    transition: all 2s linear;
  }
  .fade-enter-to {
    background: yellow;
  }
  /* 当动画结束后 会去掉所有的样式
  *  只是为了美感而生 没有实际意义
  */
  .fade-leave {
    background: purple;
  }
  .fade-leave-active {
    transition: all 2s linear;
  }
  .fade-leave-to {
    background: blue;
  }
</style>
```

实现一个添加购物车动画效果：

```html
<template>
  <div>
    <div v-for="(p, index) in products" 
         :key="index" 
         ref="lists">
      <img :src="p" alt="">
      <button @click="addCart(index)"></button>
    </div>
    <transition @enter="enter"
                @after-enter="afterEnter">
      <div class="animate" v-if="isShow"></div>
    </transition>
    <div class="cart" ref="cart"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShow: false, // 默认控制动画的属性
        currentIndex: -1, // 当前点击的图片
        products: [
          'https://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1596025531&t=5caa00af9a77596a96673ab4299a8ce5',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595430811163&di=a6642e3d11ff512fa19a91cb8eae5054&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3363001160%2C1163944807%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D830'
        ]
      }
    },
    methods: {
      addCart (index) {
        this.isShow = true // 切换显示效果
        this.currentIndex = index
      },
      enter (el, done) {
        // 让当前div获取到点击的是哪个
        let dom = this.$refs.lists[this.currentIndex]
        // console.log(dom)
        // 将刚才需要创建动画的元素 给他定位过去
        let {x, y} = dom.getBoundingClientRect()
        dom.style.left = `${x}px`
        dom.style.top = `${y}px`
        dom.style.background = `url(${this.products[this.currentIndex]})`
        dom.style.backgroundSize = '100% 100%'

        let {x: cartX, y: cartY} = this.$refs.cart.getBoundingClientRect()
        dom.style.transform = `translate3d(${carX - x}px, ${cartY - y}px, 0) scale(0, 0)`
        dom.addEventListener('transitionend', done)
        // done()
      },
      afterEnter (el) {
        this.isShow = false
      }
    }
  }
</script>
<style scoped>
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    display: inline-block;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .cart {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    background: red;
  }
  .animate {
    position: absolute;
    width: 100px;
    height: 100px;
    transition: 1s linear;
  }
</style>
```