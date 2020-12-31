# vue-cli4 全面配置(持续更新)

&emsp;&emsp;细致全面的 vue-cli4 配置信息。涵盖了使用 vue-cli 开发过程中大部分配置需求。

&emsp;&emsp;不建议直接拉取此项目作为模板，希望能按照此教程按需配置，或者复制 vue.config.js 增删配置,并自行安装所需依赖。

&emsp;&emsp;vue-cli3 配置见 [vue-cli3 分支](https://github.com/staven630/vue-cli4-config/tree/vue-cli3)。

### 其他系列

★ [Blog](https://github.com/staven630/blog)

★ [Nuxt.js 全面配置](https://github.com/staven630/nuxt-config)

<span id="top">目录</span>

- [√ 配置多环境变量](#env)
- [√ 配置基础 vue.config.js](#base)
- [√ 配置 proxy 跨域](#proxy)
- [√ 修复 HMR(热更新)失效](#hmr)
- [√ 修复 Lazy loading routes Error： Cyclic dependency](#lazyloading)
- [√ 添加别名 alias](#alias)
- [√ 压缩图片](#compressimage)
- [√ 自动生成雪碧图](#spritesmith)
- [√ SVG 转 font 字体](#font)
- [√ 使用 SVG 组件](#svg)
- [√ 去除多余无效的 css](#removecss)
- [√ 添加打包分析](#analyze)
- [√ 配置 externals 引入 cdn 资源](#externals)
- [√ 多页面打包 multi-page](#multiple-pages)
- [√ 删除 moment 语言包](#moment)
- [√ 去掉 console.log](#log)
- [√ 利用 splitChunks 单独打包第三方模块](#splitchunks)
- [√ 开启 gzip 压缩](#gzip)
- [√ 开启 stylelint 检测scss, css语法](#stylelint)
- [√ 为 sass 提供全局样式，以及全局变量](#globalscss)
- [√ 为 stylus 提供全局变量](#globalstylus)
- [√ 预渲染 prerender-spa-plugin](#prerender)
- [√ 添加 IE 兼容](#ie)
- [√ 静态资源自动打包上传阿里 oss、华为 obs](#alioss)
- [√ 完整依赖](#allconfig)

### <span id="env">✅ 配置多环境变量</span>

&emsp;&emsp;通过在 package.json 里的 scripts 配置项中添加--mode xxx 来选择不同环境

&emsp;&emsp;只有以 VUE_APP 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过 process.env.VUE_APP_BASE_API 访问

&emsp;&emsp;NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用

##### 配置

&emsp;&emsp;在项目根目录中新建.env, .env.production, .env.analyz 等文件

- .env

&emsp;&emsp;serve 默认的本地开发环境配置

```javascript
NODE_ENV = "development"
BASE_URL = "./"
VUE_APP_PUBLIC_PATH = "./"
VUE_APP_API = "https://test.staven630.com/api"
```

- .env.production

&emsp;&emsp;build 默认的环境配置（正式服务器）

```javascript
NODE_ENV = "production"
BASE_URL = "https://prod.staven630.com/"
VUE_APP_PUBLIC_PATH = "https://prod.oss.com/staven-blog"
VUE_APP_API = "https://prod.staven630.com/api"

ACCESS_KEY_ID = "xxxxxxxxxxxxx"
ACCESS_KEY_SECRET = "xxxxxxxxxxxxx"
REGION = "oss-cn-hangzhou"
BUCKET = "staven-prod"
PREFIX = "staven-blog"
```

- .env.crm

&emsp;&emsp;自定义 build 环境配置（预发服务器）

```javascript
NODE_ENV = "production"
BASE_URL = "https://crm.staven630.com/"
VUE_APP_PUBLIC_PATH = "https://crm.oss.com/staven-blog"
VUE_APP_API = "https://crm.staven630.com/api"

ACCESS_KEY_ID = "xxxxxxxxxxxxx"
ACCESS_KEY_SECRET = "xxxxxxxxxxxxx"
REGION = "oss-cn-hangzhou"
BUCKET = "staven-crm"
PREFIX = "staven-blog"

IS_ANALYZE = true;
```

&emsp;&emsp;修改 package.json

```javascript
"scripts": {
  "build": "vue-cli-service build",
  "crm": "vue-cli-service build --mode crm"
}
```

##### 使用环境变量

```javascript
<template>
  <div class="home">
    <!-- template中使用环境变量 -->
     API: {{ api }}
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      api: process.env.VUE_APP_API
    };
  },
  mounted() {
    // js代码中使用环境变量
    console.log("BASE_URL: ", process.env.BASE_URL);
    console.log("VUE_APP_API: ", process.env.VUE_APP_API);
  }
};
</script>
```

[▲ 回顶部](#top)

### <span id="base">✅ 配置基础 vue.config.js</span>

```javascript
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {}
};
```

[▲ 回顶部](#top)

### <span id="proxy">✅ 配置 proxy 代理解决跨域问题</span>

&emsp;&emsp;假设 mock 接口为https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets/1

```javascript
module.exports = {
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
```

&emsp;&emsp;访问

```javascript
<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("/api/1").then(res => {
      console.log('proxy:', res);
    });
  }
};
</script>
```

[▲ 回顶部](#top)

### <span id="hmr">✅ 修复 HMR(热更新)失效</span>

&emsp;&emsp;如果热更新失效，如下操作：

```javascript
module.exports = {
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
};
```

[▲ 回顶部](#top)

### <span id="lazyloading">✅ 修复 Lazy loading routes Error： Cyclic dependency</span> [https://github.com/vuejs/vue-cli/issues/1669](https://github.com/vuejs/vue-cli/issues/1669)

```javascript
module.exports = {
  chainWebpack: config => {
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
  }
};
```

[▲ 回顶部](#top)

### <span id="alias">✅ 添加别名 alias</span>

```javascript
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"));
  }
};
```

[▲ 回顶部](#top)

### <span id="compressimage">✅ 压缩图片</span>

```javascript
npm i -D image-webpack-loader
```

&emsp;&emsp;在某