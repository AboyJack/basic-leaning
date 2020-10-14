# 进阶Vue篇（三）

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E4%B8%80-render%E5%87%BD%E6%95%B0%E7%9A%84%E5%BA%94%E7%94%A8)一.`render`函数的应用

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_1-%E6%A8%A1%E6%9D%BF%E7%BC%BA%E9%99%B7)1.模板缺陷

模板的最大特点是扩展难度大，不易扩展。可能会造成逻辑冗余

```
<Level :type="1">哈哈</Level>
<Level :type="2">哈哈</Level>
<Level :type="3">哈哈</Level>

```


Level组件需要对不同的type产生不同的标签

```
<template>
 <h1 v-if="type==1">
  <slot></slot>
 </h1>
 <h2 v-else-if="type==2">
  <slot></slot>
 </h2>
 <h3 v-else-if="type==3">
  <slot></slot>
 </h3>
</template>
<script>
export default {
 props: {
  type: {
   type: Number
  }
 }
};
</script>

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_2-%E4%BD%BF%E7%94%A8render%E5%87%BD%E6%95%B0)2.使用Render函数

```
export default {
 render(h) {
  return h("h" + this.type, {}, this.$slots.default);
 },
 props: {
  type: {
   type: Number
  }
 }
};

```


> 复杂的逻辑变得非常简单

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_3-%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)3.函数式组件

如果只是接受一些 prop 的话可以标记为`functional`

```
Vue.component('my-component', {
  functional: true,
  props: {},
  render: function (createElement, context) {
    // ...
  }
})

```



> 函数式组件只是函数，所以渲染开销也低很多。 （没有this、没有状态、没有生命周期）

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E4%BA%8C-%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)二.作用域插槽

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_1-render%E5%87%BD%E6%95%B0%E7%9A%84%E5%BA%94%E7%94%A8)1.render函数的应用

如果我们想定制化一个列表的展现结构，我们可以使用render函数来实现

```
<List :data="data"></List>
<script>
import List from "./components/List";
export default {
 data() {
  return { data: ["苹果", "香蕉", "橘子"] };
 },
 components: {
  List
 }
};
</script>

<!-- List组件渲染列表 -->
<template>
 <div class="list">
  <div v-for="(item,index) in data" :key="index">
   <li>{{item}}</li>
  </div>
 </div>
</template>
<script>
export default {
 props: {
  data: Array,
  default: () => []
 }
};
</script>

```



通过render方法来订制组件,在父组件中传入render方法

```
<List :data="data" :render="render"></List>
render(h, name) {
   return <span>{name}</span>;
}

```



> 我们需要createElement方法，就会想到可以编写个render函数，将createElement方法传递出来

```
<template>
 <div class="list">
  <div v-for="(item,index) in data" :key="index">
   <li v-if="!render">{{item}}</li>
   <!-- 将render方法传到函数组件中，将渲染项传入到组件中，在内部回调这个render方法 -->
   <ListItem v-else :item="item" :render="render"></ListItem>
  </div>
 </div>
</template>
<script>
import ListItem from "./ListItem";
export default {
 components: {
  ListItem
 },
 props: {
  render: {
   type: Function
  },
  data: Array,
  default: () => []
 }
};
</script>

```



ListItem.vue调用最外层的render方法，将createElement和当前项传递出来

```
<script>
export default {
 props: {
  render: {
   type: Function
  },
  item: {}
 },
 render(h) {
  return this.render(h, this.item);
 }
};
</script>

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_2-%E4%BD%BF%E7%94%A8scope-slot)2.使用scope-slot

我们不难发现使用render函数确实可以大大提高灵活度，但是代码量偏多，这样我们可以使用作用域插槽来简化逻辑

```
<List :arr="arr">
    <template v-slot="{item}">
        {{item}}
    </template>
</List>

<div v-for="(item,key) in arr" :key="key">
    <slot :item="item"></slot>
</div>

```


> 目前像`iview`已经支持render函数和作用域插槽两种写法

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E4%B8%89-%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BA%94%E7%94%A8)三.递归组件的应用

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#_1-%E6%A1%88%E4%BE%8B-%E5%AE%9E%E7%8E%B0%E6%97%A0%E9%99%90%E6%9E%81%E8%8F%9C%E5%8D%95%E7%BB%84%E4%BB%B6)1.案例:实现无限极菜单组件

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E4%BD%BF%E7%94%A8%E6%A8%A1%E6%9D%BF%E6%9D%A5%E5%AE%9E%E7%8E%B0)使用模板来实现

```
<el-menu>
    <template v-for="d in data">
        <resub :data="d" :key="d.id"></resub>
    </template>
</el-menu>

<el-submenu :key="data.id" v-if="data.children">
    <template slot="title">{{data.title}}</template>
    <template v-for="d in data.children">
        <resub :key="d.id" :data="d"></resub>
    </template>
  </el-submenu>
<el-menu-item :key="data.id" v-else>{{data.title}}</el-menu-item>

```


#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E4%BD%BF%E7%94%A8render%E5%87%BD%E6%95%B0%E6%9D%A5%E5%AE%9E%E7%8E%B0)使用render函数来实现

```
import elMenu from "./components/el-menu.vue";
import elMenuItem from "./components/el-menu-item.vue";
import elSubmenu from "./components/el-submenu.vue";
export  default {
    props:{
        data:{
            type:Array,
            default:()=>[]
        }
    },
    render(){ // react语法 
        let renderChildren  = (data) =>{
            return data.map(child=>{
                return child.children? 
                <elSubmenu>
                    <div slot="title">{child.title}</div>
                    {renderChildren(child.children)}
                </elSubmenu>:
                <elMenuItem nativeOnClick={()=>{
                    alert(1)
                }}>{child.title}</elMenuItem>
            })
        }
        return <elMenu>
            {renderChildren(this.data)}
        </elMenu>
    }
}

```



## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/note-3.html#%E5%9B%9B-%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)四.异步组件