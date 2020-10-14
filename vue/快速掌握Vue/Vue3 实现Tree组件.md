## 一.组件初始化操作

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E5%88%9B%E5%BB%BA%E6%A0%91%E7%BB%84%E4%BB%B6)1.创建树组件

```
export default {
    name: 'ZfTree',
    setup() {
        return () => <h1>hello tree</h1>
    }
}

```

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_2-%E6%B3%A8%E5%86%8C%E6%A0%91%E7%BB%84%E4%BB%B6)2.注册树组件

```
import Tree from './tree.jsx'
import '../../style/tree.scss'
Tree.install = (app) => {
    app.component(Tree.name, Tree)
}
export default Tree

```



> 此时树组件已经变为全局，可以直接被使用了

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E4%BA%8C-%E9%80%9A%E8%BF%87%E6%95%B0%E6%8D%AE%E6%B8%B2%E6%9F%93%E6%A0%91%E7%BB%84%E4%BB%B6)二.通过数据渲染树组件

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E7%BB%84%E4%BB%B6%E7%9A%84%E9%80%92%E5%BD%92%E6%B8%B2%E6%9F%93)1.组件的递归渲染

```
const state = reactive({
    treeData: [
    {
        id: "1",name: "菜单1", children: [
          {id: "1-1",name: "菜单1-1",children: [{ id: "1-1-1", name: "菜单1-1-1" }]}
        ]
    },
    {
        id: "2", name: "菜单2",children: [
          {id: "2-1",name: "菜单2-1",children: [{id: "2-1-1",name: "菜单2-1-1"}]},
          {id: "2-2",name: "菜单2-2",children: [{id: "2-2-1",name: "菜单2-2-1" }]},
        ]
    },
    ]
});

```


```
export default {
    name: 'ZfTree',
    props: {
        data: {
            type: Array,
            default: () => []
        },
    },
    setup(props) {
        const data = props.data;
        function renderNode(data) {
            if (data && data.length == 0) { // 无节点情况
                return <div>无任何节点</div>
            }
            function renderChild(item) {  // 渲染每一个节点
                return <div class="zf-tree-node">
                    <div class="zf-tree-label">{item.name}</div>
                    {item.children && item.children.map(child => renderChild(child))}
                </div>
            }
            return data.map(item => renderChild(item));
        }
        return () => <div class="zf-tree">
            {renderNode(data)}
        </div>
    }
}

```


> 递归渲染树组件，但是我们把逻辑都放在Tree组件中，显得过于臃肿。我们可以将子节点渲染单独拿到一个组件中进行!

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_2-%E7%BB%84%E4%BB%B6%E7%9A%84%E5%88%86%E5%89%B2)2.组件的分割

```
import TreeNode from './tree-node'
export default {
    components:{
        [TreeNode.name]:TreeNode
    },
    setup(props) {
        const data = props.data;
        function renderNode(data) {
            if (data && data.length == 0) { // 无节点情况
                return <div>无任何节点</div>
            }
            // 渲染子节点
            return data.map(item => <zf-tree-node data={item}></zf-tree-node>);
        }
        return () => <div class="zf-tree">
            {renderNode(data)}
        </div>
    }
}

```

```
export default {
    name: 'ZfTreeNode',
    props: {
        data: {
            type: Object
        }
    },
    setup(props) {
        const data = props.data;
        return () => {
            return <div class="zf-tree-node">
                <div class="zf-tree-label">{data.name}</div>
                <div class="zf-tree-list">
                    {data.children && data.children.map(child => <zf-tree-node data={child}></zf-tree-node>)}
                </div>
            </div>
        }
    }
}

```

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_3-%E7%BE%8E%E5%8C%96%E6%A0%91%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F)3.美化树组件样式

```
@import './common/_var.scss';
@import './mixins/mixins.scss';

@include blockquote(tree){
    position: relative;
    .zf-tree-label {
        padding-left: 24px;
    }
    .zf-tree-list {
        padding-left: 34px;
    }
}

```


## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E4%B8%89-%E7%BB%84%E4%BB%B6%E5%B1%95%E5%BC%80%E6%94%B6%E7%BC%A9%E5%8A%9F%E8%83%BD)三.组件展开收缩功能

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E6%98%BE%E7%A4%BA%E5%B1%95%E5%BC%80%E5%9B%BE%E6%A0%87)1.显示展开图标

```
const showArrow = computed(() => { // 是否显示箭头
    return data.children && data.children.length > 0
});
const classes = computed(() => [
    'zf-tree-node',
    !showArrow.value && 'zf-tree-no-expand'
]);
<div class={classes.value}></div>

```


> 通过计算属性的方式绑定样式

```
@include blockquote(tree){
    position: relative;
    .zf-tree-node{
        user-select: none;
        &.zf-tree-no-expand{
            .zf-icon{
                visibility: hidden;
            }
        }
    }
}

```



### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_2-%E5%A2%9E%E5%8A%A0%E6%A0%91%E7%9A%84%E6%8A%98%E5%8F%A0%E5%8A%9F%E8%83%BD)2.增加树的折叠功能

```
const methods = {
    handleExpand(){
   		data.expand = !data.expand;
    }
}
<div class="zf-tree-label" onClick={methods.handleExpand}>
    <zf-icon icon="right"></zf-icon>
    <span>{data.name}</span>
</div>

```



> 实现树的展开折叠功能

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E5%9B%9B-%E5%A2%9E%E5%8A%A0%E9%80%89%E6%8B%A9%E5%8A%9F%E8%83%BD)四.增加选择功能

增加`checkbox` 切换选择时动态给当前数据增加checked属性

```
const methods = {
    handleChange() {
        data.checked = !data.checked; // 切换选中功能
    }
}
<div class={classes.value}>
    <div class="zf-tree-label" onClick={methods.handleExpand}>
        <zf-icon icon="right"></zf-icon>
        <input type="checkbox" checked={data.checked} onClick={withModifiers(methods.handleChange, ['stop'])} />
        <span>{data.name}</span>
    </div>
    <div class="zf-tree-list" vShow={data.expand}>
        {data.children && data.children.map(child => <zf-tree-node data={child}></zf-tree-node>)}
    </div>
</div>

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E8%8E%B7%E5%8F%96%E9%80%89%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9)1.获取选中的节点

先将所有数据拍平获得checked值为true的节点,并标记父节点。给所有节点增加唯一标识

```
export const flattenTree = (data) => {
    let key = 0;
    function flat(data,parent){
        return data.reduce((obj,currentNode)=>{
            currentNode.key = key;
            obj[key] = {
                parent,
                node:currentNode
            }
            key++;
            if(currentNode.children){
                obj = {...obj,...flat(currentNode.children,currentNode)}
            }
            return obj;
        },{})
    }
    return flat(data);
}

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_2-%E5%B0%86%E6%96%B9%E6%B3%95%E6%9A%B4%E9%9C%B2%E5%88%B0%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%AD)2.将方法暴露到上下文中

```
const flatMap = flattenTree(data);
const methods = {
    getCheckNodes(){ // 获取所有选中的节点
        return Object.values(flatMap).filter(item=>item.node.checked) 
    }
}
const instance = getCurrentInstance();
// 将方法暴露在当前实例的上下文中
instance.ctx.getCheckNodes = getCheckNodes;

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_3-%E9%80%9A%E8%BF%87ref%E8%BF%9B%E8%A1%8C%E8%8E%B7%E5%8F%96)3.通过ref进行获取

```
<zf-tree :data="treeData" ref="tree"></zf-tree>
export default {
  setup() {

    let tree = ref(null); // 设置ref
    function getCheckedNodes() { 
      console.log(tree.value.getCheckNodes()); // 获取所有节点
    }
    return {
      ...toRefs(state),
      tree,
      getCheckedNodes,
    };
  },
};

```

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E4%BA%94-%E8%AE%BE%E7%BD%AE%E7%BA%A7%E8%81%94%E9%80%89%E4%B8%AD%E7%8A%B6%E6%80%81)五.设置级联选中状态

```
updateTreeDown(node,checked){
    if(node.children){
        node.children.forEach(child=>{
            child.checked = checked;
            methods.updateTreeDown(child,checked)
        })
    }
}
updateTreeUp(node,checked){
    let parentNode = flatMap[node.key].parent;
    if(!parentNode) return;
    let parentKey = parentNode.key;
    const parent = flatMap[parentKey].node; // 找到爸爸节点
    if(checked){ // 看爸爸里儿子是否有选中的项
        parent.checked = parent.children.every(node=>node.checked);
    }else{
        parent.checked = false;
    }
    methods.updateTreeUp(parent,checked);
}

```

```
provide('TREE_PROVIDER', {
    treeMethods: methods
});

```

> 在父组件中将方法暴露出去, 以便子组件调用这些方法

```
let {treeMethods} = inject('TREE_PROVIDER')
const methods = {
    handleExpand() {
        data.expand = !data.expand;
    },
    handleChange() {
        data.checked = !data.checked;
        treeMethods.updateTreeDown(data,data.checked); // 通知下层元素
        treeMethods.updateTreeUp(data,data.checked) // 通知上层元素
    }
}

```


## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E5%85%AD-%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD)六.异步加载

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E4%BC%A0%E9%80%92%E5%BC%82%E6%AD%A5%E6%96%B9%E6%B3%95)1.传递异步方法

```
<zf-tree :data="treeData" ref="tree" :load="loadFn"></zf-tree>
function loadFn(data, cb) {
    if (data.id == 1) {
    setTimeout(() => {
        cb([
        {
            id: "1-1",
            name: "菜单1-1",
            children: [],
        },
        ]);
    }, 1000);
    } else if (data.id == "1-1") {
    setTimeout(() => {
        cb([{ id: "1-1-1", name: "菜单1-1-1" }]);
    }, 1000);
    }
}

```


```
provide('TREE_PROVIDER', {
    treeMethods: methods,
    load:props.load
});

```


```
let { treeMethods,load } = inject('TREE_PROVIDER');
const methods = {
    handleExpand() {
        if(data.children && data.children.length == 0){// 如果没有儿子是空的
            if(load){ // 有加载方法就进行加载
                data.loading = true; // 正在加载
                load(data,(children)=>{
                    data.children = children;
                    data.loading = false;// 加载完毕
                })
            }
        }
        data.expand = !data.expand;
    },
    handleChange() {
        data.checked = !data.checked;
        treeMethods.updateTreeDown(data, data.checked);
        treeMethods.updateTreeUp(data, data.checked)
    }
}

```


```
const isLoaded = ref(false); // 用来标识加载完毕
const showArrow = computed(() => { // 是否显示箭头  没儿子 而且也加载完了
    return (data.children && data.children.length > 0) || (load && !isLoaded.value)
});

handleExpand() {
    if (data.children && data.children.length == 0) { // 如果没有儿子是空的
        if (load) { // 有加载方法就进行加载
            data.loading = true; // 正在加载
            load(data, (children) => {
                data.children = children;
                data.loading = false; // 加载完毕
                isLoaded.value = true;
            })
        }
    }else{
        isLoaded.value = true;
    }
    data.expand = !data.expand;
}

```


> 实现tree组件数据的异步加载。这里要注意数据新增后要重新构建父子关系

```
watch(data,()=>{
    flatMap = flattenTree(data);
});

```


> 监控数据变化重新格式化数据。

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E4%B8%83-%E5%AE%9A%E5%88%B6%E5%8C%96%E8%8A%82%E7%82%B9%E6%8F%92%E6%A7%BD%E5%AE%9E%E7%8E%B0)七.定制化节点插槽实现

```
<zf-tree :data="treeData" ref="tree" :load="loadFn">
        <template v-slot="{name}">
           <b>{{name}}</b>
        </template>
</zf-tree>

```


```
provide('TREE_PROVIDER', {
    treeMethods: methods,
    load: props.load,
    slot:context.slots.default
});

```


```
let { treeMethods, load, slot } = inject('TREE_PROVIDER')
{slot ? slot(data) : <span>{data.name}</span>}

```


> 通过作用域插槽将组件内的数据传递给父组件

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#%E5%85%AB-%E6%8B%96%E6%8B%BD%E5%AE%9E%E7%8E%B0)八.拖拽实现

```
const classes = computed(() => [
    'zf-tree-node',
    !showArrow.value && 'zf-tree-no-expand',
    draggable && 'zf-tree-draggable'
]);
const instance = getCurrentInstance()
const dragEvent = {
    ...(draggable ? {
        onDragstart(e) {
            e.stopPropagation();
            treeMethods.treeNodeDragStart(e,instance, data);
        },
        onDragover(e) {
            e.stopPropagation();
            treeMethods.treeNodeDragOver(e,instance, data);
        },
        onDragend(e) {
            e.stopPropagation();
            treeMethods.treeNodeDragEnd(e,instance, data);
        }
    } : {})
}
<div class={classes.value} {...dragEvent}>

```

> 根据`draggable`属性决定是否添加拖拽事件

```
.zf-tree-node {
        &.zf-tree-draggable {
            user-select: none;
            -webkit-user-drag: element;
        }
}

```


> 设置文字不能选择，元素可以拖动

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_1-%E6%8B%96%E5%8A%A8%E7%BA%BF%E8%AE%BE%E7%BD%AE)1.拖动线设置

```
<div class="zf-tree-indicator" ref="indicator" vShow={state.showDropIndicator}></div>

```


```
.zf-tree-indicator{
        position: absolute;
        height: 1px;
        right:0;
        left:0;
        background-color:#409eff;
}

```



### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-2.html#_2-%E6%8B%96%E5%8A%A8%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E9%80%BB%E8%BE%91)2.拖动事件处理逻辑

```
const state = reactive({
    dropPosition: '', // 拖拽的位置
    dragNode: null, // 拖的是谁数据
    showDropIndicator: false, // 推拽标尺
    draggingNode: null // 拖拽的节点
})
treeNodeDragStart(e,nodeInstance, data) {
    state.draggingNode = nodeInstance; // 拖拽的实例
    state.dragNode = data; // 拖拽的数据
},
treeNodeDragOver(e,nodeInstance, data) {
    // 在自己身上滑来滑去
    if(state.dragNode.key == data.key){
        return;
    }
    let overEl= nodeInstance.ctx.$el; // 经过的el，是当前拖住的儿子
    if(state.draggingNode.ctx.$el.contains(overEl)){
        return 
    }
    // 获取目标节点label的位置
    let targetPosition = overEl.firstElementChild.getBoundingClientRect();
    // 树的位置
    let treePosition = instance.ctx.$el.getBoundingClientRect(); 
    let distance = e.clientY - targetPosition.top; // 鼠标相对于 文本的位置 

    if(distance < targetPosition.height * 0.2){
        state.dropPosition = 1;
    }else if(distance > targetPosition.height* 0.8){
        state.dropPosition = -1; // 后面
    }else{
        state.dropPosition = 0;
    }
    let iconPosition = overEl.querySelector('.zf-icon').getBoundingClientRect();
    let indicatorTop = -9999;
    if(state.dropPosition == 1){
        indicatorTop = iconPosition.top - treePosition.top; // 获取线相对于树的位置
    }else if(state.dropPosition == -1){
        indicatorTop = iconPosition.bottom - treePosition.top; 
    }
    state.showDropIndicator = (state.dropPosition == 1) || (state.dropPosition == -1);
    const indicator = instance.ctx.$refs.indicator;
    indicator.style.top = indicatorTop + 'px';
    indicator.style.left = iconPosition.right - treePosition.left + 'px';
},
treeNodeDragEnd(e,nodeInstance, data) {
    state.showDropIndicator = false;
    state.dropPosition = '';
    state.dragNode = null;
    state.draggingNode = null;
}
```