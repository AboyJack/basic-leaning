## 从零搭建`Vue`组件库

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%B8%80-%E7%BB%84%E4%BB%B6%E5%BA%93%E7%9A%84%E5%88%92%E5%88%86)一.组件库的划分

我们的划分以`elementUi`为基准分为

*   `Basic`:`Button`、`Icon图标`、`Layout布局`、`container布局容器`...

*   `Form`: `Input`、`Radio`、`checkbox`、`DatePicker`、`Upload`...

*   `Data`:`Table`、`Tree`、`Pagination`...

*   `Notice`:`Alert`、`Loading`、`Message`...

*   `Navigation`: `Tabs`、`Dropdown`、`NavMenu`...

*   `Others`:`Popover`,`Dialog`、`inifiniteScroll`、`Carousel`...

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%BA%8C-%E9%80%9A%E8%BF%87vue-cli%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)二.通过`Vue-Cli`初始化项目

```
vue create zh-ui

```



```
? Check the features needed for your project:
 (*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 (*) CSS Pre-processors
 ( ) Linter / Formatter
 (*) Unit Testing
 ( ) E2E Testing

```



```
  2.x
> 3.x (Preview)

```

```
> Sass/SCSS (with dart-sass)  
  Sass/SCSS (with node-sass)
  Less
  Stylus

```


> 为什么选择[dart-sass](https://www.dart-china.org/t/topic/146)?

```
? Pick a unit testing solution:
> Mocha + Chai # ui测试需要使用karma
  Jest

```



## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%B8%89-%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E9%85%8D%E7%BD%AE)三.目录结构配置

```
│  .browserslistrc # 兼容版本
│  .gitignore
│  babel.config.js # babel的配置文件
│  package-lock.json
│  package.json
│  README.md   
|  examples   # 组件使用案例
├─public
│      favicon.ico
│      index.html 
├─src
│  │  App.vue 
│  │  main.js
│  │  
│  ├─packages # 需要打包的组件
│  │      button
|  |      button-group
│  │      icon
│  │      index.js # 所有组件的入口
│  │       
│  └─styles # 公共样式
│         common
|         mixins
└─tests # 单元测试
    └─unit
          button.spec.js

```


## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%9B%9B-%E7%BC%96%E5%86%99%E6%8F%92%E4%BB%B6%E5%85%A5%E5%8F%A3)四.编写插件入口

```
import Icon from './icon';
import Button from './button'
import ButtonGroup from './button-group'
const plugins = [
    Icon,
    Button,
    ButtonGroup
];
const install = (app: any) => {
    plugins.forEach(plugin => app.use(plugin));
}
export default {
    install
}

```



```
import { createApp } from 'vue'
import App from './App.vue'
import ZfUI from './packages/index';
createApp(App).use(ZfUI).mount('#app')

```


> 我们可以通过插件的方式去引入我们的组件库

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%BA%94-%E7%BC%96%E5%86%99button%E7%BB%84%E4%BB%B6)五.编写Button组件

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%AE%9E%E7%8E%B0%E5%8A%9F%E8%83%BD%E8%A7%84%E5%88%92)实现功能规划

*   [ ] 按钮的基本用法
*   [ ] 图标按钮
*   [ ] 按钮加载中状态
*   [ ] 按钮组的实现

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%87%86%E5%A4%87%E5%A4%87%E7%94%A8%E6%A0%B7%E5%BC%8F)准备备用样式

```
├─common
│   |-- var.scss  # 基本样式
└─mixins
│   |-- mixins.scss # 混合的方法
│   button.scss
|   button-group.scss
|   icon.scss

```


```
// 样式变量
$primary: #409EFF;
$success: #67C23A;
$warning: #E6A23C;
$danger: #F56C6C;
$info: #909399;

$primary-active: #3a8ee6;
$success-active: #5daf34;
$warning-active: #cf9236;
$danger-active: #dd6161;
$info-active: #82848a;
$font-size:12px;
$border-radius:4px;

```



#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_1-%E6%8C%89%E9%92%AE%E7%9A%84%E5%AE%9E%E7%8E%B0)(1).按钮的实现

```
<template>
  <button :class="classs" :disabled="loading">
    <zf-icon :icon="icon" v-if="icon && !loading" class="icon"></zf-icon>
    <zf-icon icon="loading" v-if="loading"  class="icon loading"></zf-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
import { computed } from "vue";
export default {
  props: {
    type: {
      type: String,
      default: "primary",
      validator(type) {
        if (
          type &&
          !["warning", "success", "danger", "info", "primary"].includes(type)
        ) {
          console.log(
            "组件的type类型必须为:" +
              ["warning", "success", "danger", "info", "primary"].join("、")
          );
        }
        return true;
      },
    },
    icon: String,
    loading:{
      type:Boolean,
      default:false
    },
    position:{
       type:String,
       default:'left'
    }
  },
  name: "ZfButton",
  setup(props, context) {
    // 计算出所有样式
    const classs = computed(() => [
      `zf-button`, 
      `zf-button-${props.type}`,
      `zf-button-${props.position}`
    ]);
    return {
      classs,
    };
  },
};
</script>

```


> 使用`iconfont`[添加图标](http://at.alicdn.com/t/font_12421_615eijc41lx.js)

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_2-%E5%88%9B%E5%BB%BA%E5%9B%BE%E6%A0%87%E7%BB%84%E4%BB%B6)(2)创建图标组件

```
<template>
  <svg class="zf-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>
<script>
import "./font";
export default {
  props: {
    icon: String,
  },
  name: "ZfIcon",
};
</script>

```



```
@import "./common/var.scss";
@import "./mixins/mixins.scss";
@include blockquote(icon) {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}

```



#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_4-%E6%8C%89%E9%92%AE%E7%BB%84%E7%9A%84%E5%AE%9E%E7%8E%B0)(4).按钮组的实现

以按钮组的方式出现，常用于多项类似操作。

```
<template>
  <div class="zf-button-group">
    <slot></slot>
  </div>
</template>
<script>
import { onMounted, getCurrentInstance } from "vue";
export default {
  name: "ZfButtonGroup",
  setup(props) {
    onMounted(() => {
      let context = getCurrentInstance();
      let ele = context.ctx.$el;
      let children = ele.children;
      for (let i = 0; i < children.length; i++) {
        console.assert(children[i].tagName === "BUTTON", "必须子节点是button");
      }
    });
  },
};
</script>

```



```
@import "./common/var.scss"; // 公共样式
@import "./mixins/mixins.scss";
@include blockquote(button-group) {
    display: inline-flex;
    vertical-align: middle;
    button {
        border-radius: 0;
        position: relative;
        box-shadow: none;
        &:not(first-child) {
            margin-left: -1px;
        }
        &:first-child {
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
        }
        &:last-child {
            border-top-right-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
        }
    }
    button:hover {
        z-index: 1;
    }
    button:focus {
        z-index: 2;
    }
}

```



## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%85%AD-%E6%90%AD%E5%BB%BA%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83)六.搭建测试环境

我们需要测试`ui`渲染后的结果。需要在浏览器中测试,所有需要使用`Karma`

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#karma%E9%85%8D%E7%BD%AE)`Karma`配置

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_1-%E5%AE%89%E8%A3%85karma)(1)安装`karma`

```
npm install --save-dev  karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha karma-chai

```

1

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_2-%E9%85%8D%E7%BD%AEkarma%E6%96%87%E4%BB%B6)(2)配置karma文件

`karma.conf.js`

```
var webpackConfig = require('@vue/cli-service/webpack.config')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless']
  })
}

```


```
{
  "scripts": {
    "test": "karma start"
  }
}

```


### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)单元测试

```
import { expect } from 'chai'
import Button from '@/packages/button';
import Icon from '@/packages/icon';
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler.js';

describe('HelloWorld.vue', () => {
  it('测试插槽显示是否正常', () => {
    const container = document.createElement('div');
    const app = createApp({
      template: `<zfButton>hello</zfButton>`,
      components: {
        "zfButton": Button,
      }
    }, {
      icon: 'edit',
    }).mount(container);
    let html = app.$el.innerHTML
    expect(html).to.match(/hello/)
  });

  it('测试icon是否能够正常显示', () => {
    const container = document.createElement('div');
    const app = createApp({
      ...Button,
    }, {
      icon: 'edit',
    }).use(Icon).mount(container);
    let useEle = app.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    expect(href).to.eq('#icon-edit');
  });

  it('测试传入loading时 按钮为禁用态', () => {
    const container = document.createElement('div');
    const app = createApp({
      template: `<zfButton></zfButton>`,
      components: {
        "zfButton": Button,
      }
    }, {
      loading: true,
    }).use(Icon).mount(container);
    let useEle = app.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    let disabeld = app.$el.getAttribute('disabled')
    expect(href).to.eq('#icon-loading');
    expect(disabeld).not.to.eq(null);
  });
  // todo....
})

```



## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%B8%83-%E6%89%93%E5%8C%85%E7%BB%84%E4%BB%B6)七.打包组件

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_1-%E9%85%8D%E7%BD%AE%E6%89%93%E5%8C%85%E5%91%BD%E4%BB%A4)(1)配置打包命令

```
"build": "vue-cli-service build --target lib --name zf ./src/packages/index.ts --no-clean && vue-cli-service build  --all --no-clean",

```



```
const args = process.argv.slice(2);
if (process.env.NODE_ENV == 'production' && args.includes('--all')) {
    const fs = require('fs');
    const path = require('path');
    const getEntries = (dir) => {
        let absPath = path.resolve(dir);
        let files = fs.readdirSync(absPath);
        let entries = {}
        files.forEach(item => {
            let p = path.resolve(absPath, item);
            if (fs.statSync(p).isDirectory()) {
                p = path.resolve(p, 'index.ts')
                entries[item.split('.')[0]] = p
            }
        });
        return entries;
    }
    module.exports = {
        outputDir: 'dist', // 打包出口
        configureWebpack: {
            entry: { // 配置多入口
                ...getEntries('./src/packages')
            },
            output: {
                filename: `lib/[name]/index.js`,
                libraryTarget: 'umd',
                libraryExport: 'default',
                library: ['zf', '[name]']
            },
            externals:{
                vue: {
                    root: 'Vue',
                    commonjs: 'vue',
                    commonjs2: 'vue',
                    amd: 'vue'
                  }
            },
        },
        css: {
            sourceMap: true,
            extract: {
                filename: 'css/[name]/style.css'
            }
        },
        chainWebpack: config => {
            config.optimization.delete('splitChunks')
            config.plugins.delete('copy')
            config.plugins.delete('preload')
            config.plugins.delete('prefetch')
            config.plugins.delete('html')
            config.plugins.delete('hmr')
            config.entryPoints.delete('app')
        },
    }
}

```


#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_2-%E9%85%8D%E7%BD%AE%E8%BF%90%E8%A1%8C%E5%85%A5%E5%8F%A3)(2)配置运行入口

```
"main": "./dist/zf.umd.min.js"

```


#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_3-link%E5%88%B0%E5%85%A8%E5%B1%80%E4%B8%8B)(3)link到全局下

```
npm link

```



## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%85%AB-%E4%BD%BF%E7%94%A8vitepress%E6%90%AD%E5%BB%BA%E6%96%87%E6%A1%A3)八.使用`VitePress`搭建文档

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#vuepress%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)`VuePress`基本配置:

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_1-%E5%AE%89%E8%A3%85)(1).安装

```
npm install vitepress -D

```


#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_2-%E9%85%8D%E7%BD%AEscripts)(2).配置scripts

```
{
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs"
}

```


#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_3-%E5%88%9D%E5%A7%8B%E5%8C%96docs)(3).初始化docs

增加入口页面`index.md`

#### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#_4-%E9%85%8D%E7%BD%AE%E5%AF%BC%E8%88%AA)(4).配置导航

增加`config.js`

```
module.exports = {
    title: 'zf-ui', // 设置网站标题
    description: 'ui 库', //描述
    dest: './build', // 设置输出目录
    themeConfig: { //主题配置
        nav: [
            { text: '主页', link: '/' },
            { text: '联系我', link: '/contact/' },
            { text: '我的博客', link: 'https://' },
        ],
        // 为以下路由添加侧边栏
        sidebar: [
            {
                text: 'Button 按钮', // 必要的
                link: '/button/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
            },
            {
                text: 'Icon 图标', // 必要的
                link: '/icon/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
            },
        ]
    }
}

```


## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E4%B9%9D-%E5%8F%91%E5%B8%83%E5%88%B0npm)九.发布到`npm`

配置`.npmignore`配置文件

```
npm addUser
npm publish

```

## [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/vue-component-1.html#%E5%8D%81-%E6%8E%A8%E9%80%81%E5%88%B0git)十.推送到git

添加`npm`图标 https://badge.fury.io/for/js

```
git remote add origin 
git push origin master
```