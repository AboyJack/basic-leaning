### 1\. Vite

> Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，在生产环境下基于 Rollup 打包。

##### [](#主要特点)主要特点

*   快速的冷启动
*   即时的模块热更新
*   真正的按需编译

### [](#2-vue-cli-版本在-vuecli-45-以及以上)2\. Vue-cli 版本在 `@vue/cli 4.5` 以及以上

```
# upgrade vue/cli
npm install –g @vue/cli

```

### [](#3-创建项目)3\. 创建项目

```
npm init vite-app <project-name>
#or
yarn create vite-app <project-name>

cd <project-name>

npm install
#or
yarn

npm run dev
#or
yarn dev 

```

### [](#4-目录结构)4\. 目录结构

`vite` 尝试尽可能多地镜像 `vue-cli` 中的默认配置, 所以我们会发现看上去和 `vue-cli` 生成的代码没有太大区别。

```
├── index.html
├── package.json
├── public
│   └── favicon.ico
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    ├── index.css
    └── main.js
```