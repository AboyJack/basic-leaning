## 1. 模块化
模块化是指把一个复杂的系统分解到多个模块来方便编码和维护

### 1.1 命名空间
开发网页要通过命名空间的方式来组织代码
- 命名空间冲突 两个库可能会使用同一个名称
- 无法合理的管理项目的依赖和版本
- 无法方便的控制依赖的加载顺序

### 1.2 `CommonJS`
CommonJS 是一种使用广泛的 `JavaScript` 模块化规范，核心思想是通过 `require` 方法来同步的加载依赖的其他模块，通过`module.exports` 导出需要暴露的接口
#### 1.2.1 用法
采用 `CommonJS` 导入及导出时的代码如下：

moduleB.js
```js 
// 导入
// const moduleA = require('./moduleA');
// console.log(moduleA); // hello

const fs = require('fs');
// common.js
function req (moduleName) {
  // content 表示读到的文件内容
  let content = fs.readFileSync(moduleName, 'utf8');
  // 最后一个参数是函数的内容体
  let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
  let module = {
    exports: {}
  }
  return fn(module.exports, module, req, __dirname, __filename);
}
const moduleA = req('./moduleA');
console.log(moduleA); // hello
```
moduleA.js
```js
// 导出
module.exports = 'hello';
```

### 1.3 `AMD`
`AMD` 也是一种 JavaScript 模块化规范，与 `CommonJS` 最大的不通车在于它采用异步的方式去加载依赖模块。`AMD` 规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是  `require.js`

`AMD`的优点
- 可在不转换代码的情况下直接在浏览器中运行
- 可加载多个依赖
- 代码可运行在浏览器环境和 `Node.js` 环境中

缺点：
- JavaScript运行环境没有原生支持`AMD`，需要先导入实现了`AMD`的库后才能正常使用。

require.js
```js
let factories = {}
/*
* moduleName 模块名
* dependencies 依赖
* factory 工厂函数
*/
function define (moduleName, dependencies, factory) {
  factory.dependencies = dependencies; // 将依赖挂在factory上
  factories[moduleName] = factory;
}
function require (mods, callback) {
  let result = mods.map(function (mod) {
    let factory = factories[mod];
    let exports;
    let dependencies = factory.dependencies; // ['']
    // require('name', function (name, age) {})
    require(dependencies, function () {
      exports = factory.apply(null, arguments);
    });
    return exports;
    // exports = factory
  });
  callback.apply(null, result);
}
define('name', [], function () {
  return 'hello';
});
define('age', ['name'], function (name) {
  return `${name} is a 20`;
});
require(['age'], function (age) {
  console.log(age);
});
```

## 2. 自动化构建工具

构建就是做把源代码转换成发布到线上的可执行 HTML、JavaScript、CSS 代码，包括：
- 代码转换：ECMAScript6 编译成 ECMAScript5、less/sass 编译成 CSS 等
- 文件优化：压缩 HTML、JavaScript、CSS 代码，压缩合并图片等
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统

## 3. Webpack
 Webpack是一个打包模块化 JavaScript 的工具，在 Webpack 里的一切文件皆模块，通过 `Loader` 转换文件，通过 `Plugin` 注入钩子，最后输出由多个模块组合成的文件。 Webpack 专注于构建模块化项目。

 一切文件：HTML、JavaScript、CSS、图片、模块，在 Webpack 中都是一个模块，这样的好处是能清晰的描述各个模块之间的依赖关系，方便 Webpack 对模块进行组合和打包， 经过 Webpack 处理，最终会会输出浏览器能使用的静态资源。


### 3.1 webpack 安装
- 安装本地的webpack
```bash
npm init -y
npm i webpack webpack-cli -D
```
```bash 
webpack webpack-cli -D
```
- 运行打包 (设置模式 development/production)
```bash
npx webpack --mode development
```

### 3.2 webpack可以进行0配置
- 打包工具 - 输出的结果（js模块）
- 打包 （默认支持js模块化）

### 3.3 手动配置webpack
- 默认配置文件名字 webpack.config.js
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  // entry: './src/index.js', // 入口
  // entry: ['./src/index.js', './src/a.js'], // 可以写一个数组 打包多个文件成一个文件

  // 单页 index.html 引用了多个 js
  // 多页 a.html index.js / b.html a.js
  entry: { // 多入口
    index: './src/index.js',
    a: './src/index.js'
  },
  output: { // 出口
    // filename: 'build.js',
    // filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    filename: '[name].[hash:8].js', // 打包出多个html文件
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置

  },
  plugins: [ // 插件的配置
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      },
      chunks: ['index'] // 对应引入相对的js
    }),
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      },
      chunks: ['a'] // 对应引入相对的js
    })
  ],  
  mode: 'development', // 更改模式
  resolve: { // 配置解析

  }
}
```
插件配置html标题
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```


webpack.config.js
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [ // 插件的配置
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      }
    })
  ],  
  mode: 'development', // 更改模式
  resolve: { // 配置解析

  }
}
```
./src/index.js

```js

// 配置热更新
if (module.hot) {
  module.hot.accept(); // 只要代码更新 就会更新
}
```

### 3.4 配置开发服务器
```bash
npm i webpack-dev-server -D
```
### 3.4 Webpack插件 plugin

```js
// html插件
npm i html-webpack-plugin -D
// 清除Webpack插件
npm i clean-webpack-plugin -D
// 拷贝插件
npm i copy-webpack-plugin -D
```

### 3.5 Webpack loader
- css处理
```js
// css解析完变成style标签插入到html 
npm i style-loader css-loader less less-loader -D
// 安装sass
npm i node-sass sass-loader -D
// 安装stylus
npm i stylus stylus-loader -D

// 抽离css样式 插件 抽离到一个css文件 通过css文件的方式引用
npm i extract-text-webpack-plugin@next -D
// 或者 （该插件会有bug，推荐用上面）
npm i mini-css-extract-plugin -D

// 去除没用样式插件
npm i purifycss-webpack purify-css glob -D

// css增加前缀功能
npm i postcss-loader autoprefixer -D
```

webpack.config.js

使用`extract-text-webpack-plugin`
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// less 和 css 分离出来不同文件
let LessExtract = new ExtractTextWebpackPlugin('css/less.css');
let cssExtract = new ExtractTextWebpackPlugin('css/css.css');
module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        // use: ExtractTextWebpackPlugin.extract(
        use: cssExtract.extract({
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        // use: ExtractTextWebpackPlugin.extract({
        use: lessExtract.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
      }
    ]
  },
  plugins: [ // 插件的配置
    // new ExtractTextWebpackPlugin({
    //   filename: 'css/index.css'
    // }),
    LessExtract,
    cssExtract,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      }
    })
  ],  
  mode: 'development', // 更改模式
  resolve: { // 配置解析 }
}
```

```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// less 和 css 分离出来不同文件
let LessExtract = new ExtractTextWebpackPlugin({
  filename: 'css/less.css',
  disable: true // 先禁用
});
let cssExtract = new ExtractTextWebpackPlugin({
  filename: 'css/css.css',
  disable: true
});
module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        use: lessExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
      }
    ]
  },
  plugins: [ // 插件的配置
    // new ExtractTextWebpackPlugin({
    //   filename: 'css/index.css'
    // }),
    LessExtract,
    cssExtract,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      }
    })
  ],  
  mode: 'development', // 更改模式
  resolve: { // 配置解析 }
}
```

使用`mini-css-extract-plugin`
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssTractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        use: [
          MiniCssTractPlugin.loader,
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssTractPlugin.loader,
          { loader: 'css-loader' }
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [ // 插件的配置
    new MiniCssTractPlugin({
      filename: 'css/index.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      }
    })
  ],  
  mode: 'development', // 更改模式
  resolve: { // 配置解析}
}
```

打包去除没用样式
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let PurifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'build.[hash:8].js', // 可以配置打包出来的hash名
    // 这个路径必须是绝对路径
    path: path.resolve('./build')
  },
  devServer: { // 开发服务器
    contentBase: './build',
    prot: 3000,
    compress: true, // 启动服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: { // 模块配置
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [ // 插件的配置
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    // 打包html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack自定义配置',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 打包成一行
      }
    }),
    new PurifycssWebpack({ // 没用的css会被删除 一定要放在 HtmlWebpackPlugin 后面用
      paths: glob.sync(path.resolve('src/*.html'))
    })
  ],  
  mode: 'development' // 更改模式
}
```
css 自动加前缀

配置`post.config.js`

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

webpack.config.js

```js
// ... 省略
module.exports = {
  // ... 省略
  module: { // 模块配置
    // ... 省略
    rules: [ // 从右往左写
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      // ... 省略
    ]
  },
  // ... 省略
}
```

拷贝到对应目录 `copy-webpack-plugin`

```js
// ... 省略
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  // ... 省略
  plugins: [ // 插件的配置
    // ... 省略
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'public'
      }
    ])
  ], 
  // ... 省略
}
```
